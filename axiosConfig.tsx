import NetInfo from "@react-native-community/netinfo";
import axios from "axios";
import { router } from "expo-router";
import { Alert } from "react-native";
import Endpoints from "../constants/endpoints";
import Routes from "../constants/routes";
import { getTextList } from "../language-config/TextList";
import {
  devLog,
  getFromSecureStorage,
  removeKeysFromSecureStorage,
  saveToSecureStorage,
  showError
} from "../shared/utils/helper";

const { authEndpoints } = Endpoints();
const publicRoutes = Object.values(authEndpoints).map((fn) => fn()); // ["register", "login", "refresh"]

const UseAccessToken = async () => {
  const token = await getFromSecureStorage("@access_token");
  return token || null;
};

const UseRefreshToken = async () => {
  const token = await getFromSecureStorage("@refresh_token");
  return token || null;
};

const dataServer = axios.create({
  baseURL: process.env.EXPO_PUBLIC_PROD_URL,
  timeout: 100000,
  maxBodyLength: Infinity,
  maxContentLength: Infinity,
  headers: {
    "Content-Type": "application/json",
  },
});

// REQUEST INTERCEPTOR
dataServer.interceptors.request.use((config: any) => {
  return new Promise((resolve, reject) => {
    NetInfo.addEventListener(async (state) => {
      const isPublicRoute = publicRoutes.some((route) =>
        config.url?.endsWith(route)
      );

      const accessToken = await UseAccessToken();

      if (!state.isConnected) {
        return reject({ message: "No internet connection" });
      }

      // Set content-type
      if (config.data && config.data instanceof FormData) {
        config.headers["Content-Type"] = "multipart/form-data";
      } else {
        config.headers["Content-Type"] = "application/json";
      }

      // Add token if it's not a public route
      if (!isPublicRoute && accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return resolve(config);
    });
  });
});

// REFRESH TOKEN FUNCTION
const refreshToken = async () => {
  try {
    const token = await UseRefreshToken();
    if (!token) throw new Error("No refresh token found");

    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_PROD_URL}${authEndpoints.refresh()}`,
      {
        refresh_token: token,
        grant_type: process.env.EXPO_PUBLIC_AUTH_GRANT_TYPE_REFRESH,
        client_id: process.env.EXPO_PUBLIC_AUTH_CLIENT_ID,
        client_secret: process.env.EXPO_PUBLIC_AUTH_CLIENT_SECRET,
      }
    );

    const newAccessToken = response.data.data.access_token;
    const newRefreshToken = response.data.data.refresh_token;

    await saveToSecureStorage("@access_token", newAccessToken);
    await saveToSecureStorage("@refresh_token", newRefreshToken);

    return newAccessToken;
  } catch (err) {
    devLog("Token refresh failed:", err);
    return null;
  }
};

// RESPONSE INTERCEPTOR
dataServer.interceptors.response.use(
  (response: any) => response.data,
  async (error: any) => {
    const originalRequest = error.config;
    const isPublicRoute = publicRoutes.some((route) =>
      originalRequest.url?.endsWith(route)
    );

    const errorMessage = error?.message;

    if (
      errorMessage === "Network Error" ||
      errorMessage === "No internet connection" ||
      error?.response?.status ===  522 ||
      !error?.response
    ) {
      return new Promise((resolve, reject) => {
        Alert.alert(
          getTextList().no_internet_connection,
          getTextList().it_looks_like_you_are_offline,
          [
            {
              text: getTextList().retry,
              onPress: () => {
                resolve(dataServer(originalRequest)); // Retry the original request
              },
            },
            {
              text: getTextList().ok,
              onPress: () => {
                reject(error); // Reject the request
              },
              style: "cancel",
            },
          ],
          { cancelable: false }
        );
      });
    }
    if (
      error?.response?.status ===  500
    ) {
      return new Promise((resolve, reject) => {
        Alert.alert(
          getTextList().somethingWentWrong,
          getTextList().server_error_message,
          [
            {
              text: getTextList().retry,
              onPress: () => {
                resolve(dataServer(originalRequest)); // Retry the original request
              },
            },
          ],
          { cancelable: false }
        );
      });
    }
    

    if (
      error?.response?.status === 401 &&
      !originalRequest._retry &&
      !isPublicRoute
    ) {
      originalRequest._retry = true;
      const newAccessToken = await refreshToken();
      if (newAccessToken) {
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return dataServer(originalRequest);
      } else {
        await removeKeysFromSecureStorage(["@access_token", "@refresh_token"]);
        showError(getTextList().session_expired);
        router.push(`/${Routes.LOGIN}`);

      }
    }else{
      return Promise.reject(error);
    }

  }
);

export { dataServer };
