import { useIsFocused } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { devLog, showError } from '../shared/utils/helper';

const useCallApiOnLoad = (
  apiFunction: (data?: any) => Promise<any>,
  params?: any, // Parameters for the API function
  shouldCallApi: boolean = true, // Parameter to control API call
  onSuccess?: (data: any) => void, // Optional onSuccess callback
) => {
  const [data, setData] = useState<any[] | any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isFocused = useIsFocused(); 


  const callApi = async () => {
    setError(null);
    try {
      const results: any = await apiFunction(params); // Pass params to the api function
      if (__DEV__) {
        devLog('results', JSON.stringify(results));
      }
      setData(results);

      // If onSuccess is provided, call it with the results
      if (results && onSuccess) {
        onSuccess(results);
      }
      if (results) {
        setLoading(false);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      showError(err.message);
    }
  };

  // Call the API on mount or when params change if shouldCallApi is true
  useEffect(() => {
    setLoading(true);
    if (shouldCallApi && isFocused) {
      callApi();
    }
  }, [JSON.stringify(params)]); // Re-run when shouldCallApi or isFocus change

  return {data, loading, error, callApi, setLoading};
};

export default useCallApiOnLoad;
