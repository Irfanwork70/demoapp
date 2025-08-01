import Endpoints from "@/src/constants/endpoints";
import { devLog, showError } from "@/src/shared/utils/helper";
import { dataServer } from "../axiosConfig";

const useGetApi = () => {
  const { userEndpoints, giftEndpoints, subscriptionsEnpoint } = Endpoints();
  const getUserApi = async () => {
    try {
      const response = await dataServer.get(userEndpoints.get_user());
      return response;
    } catch (err: any) {
      devLog("getUserApi", err?.response);
      if (err?.response) {
        showError(err?.response?.data?.details || err?.response?.data?.message);
      }
    }
  };
  const getAllGiftsApi = async (data: any) => {
    try {
      const response = await dataServer.get(giftEndpoints.get_all_gifts(), {
        params: data, // ✅ correct way to send data in GET
      });
      return response;
    } catch (err: any) {
      devLog("getAllGiftsApi", err?.response);
      if (err?.response) {
        showError(err?.response?.data?.details || err?.response?.data?.message);
      }
    }
  };
  const getMyWinningsApi = async () => {
    try {
      const response = await dataServer.get(giftEndpoints.get_my_winnings());
      return response;
    } catch (err: any) {
      devLog("getMyWinningsApi", err?.response);
      if (err?.response) {
        showError(err?.response?.data?.details || err?.response?.data?.message);
      }
    }
  };
  const getSubscriptionPackagesApi = async () => {
    try {
      const response = await dataServer.get(subscriptionsEnpoint.getPackages());
      return response;
    } catch (err: any) {
      devLog("getSubscriptionPackagesApi", err?.response);
      if (err?.response) {
        showError(err?.response?.data?.details || err?.response?.data?.message);
      }
    }
  };
  const getGiftsTypesApi = async () => {
    try {
      const response = await dataServer.get(giftEndpoints.get_gifts_Types());
      return response;
    } catch (err: any) {
      devLog("getGiftsTypesApi", err?.response);
      if (err?.response) {
        showError(err?.response?.data?.details || err?.response?.data?.message);
      }
    }
  };
  const getCurrentSubscriptionApi = async () => {
    try {
      const response = await dataServer.get(
        subscriptionsEnpoint.current_subscriptions()
      );
      return response;
    } catch (err: any) {
      devLog("getCurrentSubscriptionApi", err?.response);
      if (err?.response) {
        showError(err?.response?.data?.details || err?.response?.data?.message);
      }
    }
  };
  const getCurrentVehicleSubmissionApi = async () => {
    try {
      const response = await dataServer.get(
        userEndpoints.check_user_vehicle_registration()
      );
      return response;
    } catch (err: any) {
      devLog("getCurrentVehicleSubmissionApi", err?.response);
      if (err?.response) {
        showError(err?.response?.data?.details || err?.response?.data?.message);
      }
    }
  };

  return {
    getUserApi,
    getAllGiftsApi,
    getMyWinningsApi,
    getSubscriptionPackagesApi,
    getGiftsTypesApi,
    getCurrentSubscriptionApi,
    getCurrentVehicleSubmissionApi
  };
};

export default useGetApi;
