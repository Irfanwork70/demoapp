/** InAppPurchases/useInAppPurchase.ts
 Library: https://github.com/react-native-iap/react-native-iap/blob/main/docs/IAP.md
 Docs: https://docs.google.com/document/d/1l-3NVQzTDdt2zDuegNOIrbONBtHXy2e0o46rQd6lOmQ/edit?tab=t.0
 */

import { useCallback, useState } from "react";
import { Platform } from "react-native";
import {
  clearTransactionIOS,
  getAvailablePurchases,
  getProducts,
  getSubscriptions,
  initConnection,
  Purchase,
  requestSubscription,
} from "react-native-iap";
import { getTextList } from "../language-config/TextList";
import usePostApi from "../services/ApiHooks/postApis";
import { devLog, showError, showSuccess } from "../shared/utils/helper";
import useCallApiWhenRequired from "./useCallApiWhenRequired";

export const useInAppPurchase = (onSuccess?: (data: any) => void) => {
  const [loading, setLoading] = useState(false);
  const {
    subscribeAppleApi,
    checksubscriptionAppleApi,
    subscribeGoogleApi,
    checksubscriptionAndroidApi,
  } = usePostApi();

  const { loading: userSubscriptionLoading, callApi: callSubscriptionApi } =
    useCallApiWhenRequired(
      Platform.OS === "ios" ? subscribeAppleApi : subscribeGoogleApi,
      async (data) => {
        showSuccess({
          text1: getTextList().congratulations,
          text2: `🎉 ${getTextList().subscriptionSuccessMessage}`,
        });
        onSuccess?.(data);
      }
    );
  const {
    loading: checkUserSubscriptionLoading,
    callApi: callCheckUserSubscriptionApi,
  } = useCallApiWhenRequired(
    Platform.OS === "ios"
      ? checksubscriptionAppleApi
      : checksubscriptionAndroidApi
  );

  const makeConnectionAndCheckAvailablePurcahses = useCallback(
    async (productId: string) => {
      await initConnection();
      await getProducts({ skus: [productId] });
      const availablePurchases = await getAvailablePurchases();
      const sorted = availablePurchases.sort(
        (a: any, b: any) =>
          parseInt(b.transactionDate, 10) - parseInt(a.transactionDate, 10)
      );
      const latest = sorted[0];
      if (availablePurchases.length > 0) {
        const checkUser = await callCheckUserSubscriptionApi(
          Platform.OS === "ios"
            ? {
                original_transaction_id:
                  latest?.originalTransactionIdentifierIOS,
              }
            : {
                purchase_token: latest?.purchaseToken,
              }
        );
        if (checkUser?.data?.is_restricted) {
          return false;
        } else {
          if (Platform.OS === "ios") {
            await clearTransactionIOS();
          }
          return true;
        }
      } else {
        return true;
      }
    },
    []
  );

  const handlePurchase = useCallback(
    async (productId: string): Promise<void> => {
      try {
        setLoading(true);
        const checkConnectionAndRecentPurchases =
          await makeConnectionAndCheckAvailablePurcahses(productId);

        if (!checkConnectionAndRecentPurchases) {
          showError(
            Platform.OS === "ios"
              ? getTextList().subcriptionAlreadyRunningOnIOS
              : getTextList().subscriptionAlreadyRunningOnAndroid
          );
          return;
        }

        const subscriptions = await getSubscriptions({ skus: [productId] });
        const offerToken =
          Platform.OS === "android" //@ts-ignore
            ? subscriptions?.[0]?.subscriptionOfferDetails?.[0]?.offerToken
            : "offerToken";

        const subscriptionPayload: any = {
          sku: productId,
        };

        if (Platform.OS === "android" && offerToken) {
          subscriptionPayload.subscriptionOffers = [
            {
              sku: productId,
              offerToken: offerToken,
            },
          ];
        }
        const result: Purchase | any = await requestSubscription(
          subscriptionPayload
        );
        devLog("result", result);
        if (Platform.OS === "ios") {
          callSubscriptionApi({
            product_id: result?.productId,
            transaction_id: result?.transactionId,
            original_transaction_id: result?.originalTransactionIdentifierIOS
              ? result?.originalTransactionIdentifierIOS
              : result.transactionId,
            transaction_date: result?.transactionDate,
            transaction_receipt: result?.transactionReceipt,
            platform: "ios",
          });
        } else if (Platform.OS == "android") {
          callSubscriptionApi({
            product_id: result[0]?.productId,
            transaction_id: result[0]?.transactionId,
            purchase_token: result[0]?.purchaseToken,
            package_name: result[0]?.packageNameAndroid,
            platform: "android",
          });
        }
        // await finishTransaction({
        //   purchase: result,
        //   isConsumable: false, // For subscriptions
        // });
      } catch (error: any) {
        const errorMessage = error?.message ?? error?.toString();
        devLog("error", errorMessage);
        showError({
          text1: getTextList().subscriptionErrorMessage,
          text2: errorMessage,
        });
      } finally {
        setLoading(false);
      }
    },
    [makeConnectionAndCheckAvailablePurcahses]
  );

  return {
    loading: loading || userSubscriptionLoading || checkUserSubscriptionLoading,
    handlePurchase,
  };
};
