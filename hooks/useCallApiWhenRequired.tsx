import { useState } from "react";
import { devLog } from "../shared/utils/helper";

const useCallApiWhenRequired = (
  apiFunction: (data?: any) => Promise<any>,
  onSuccess?: (data: any) => void
) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const callApi = async (params: {} = {}) => {
    // Default to an empty object
    setLoading(true);
    setError(null);
    try {
      const results: any = await apiFunction(params);
      if (__DEV__) {
        devLog(`Result ${JSON.stringify(params)}`, results);
      }
      setData(results);
      if (results && onSuccess) {
        onSuccess(results);
      }
      setLoading(false);
      return results; // ✅ Return result to caller
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
      setLoading(false);
    }
  };

  return { data, loading, error, callApi };
};

export default useCallApiWhenRequired;
