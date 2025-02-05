import api from "@/lib/apiService";
import { getErrorMessage } from "@/lib/utils";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";

const useFetch = <T>(
  url: string,
  options?: {
    onSuccess?: (data: T) => void;
  }
) => {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api(url);
      setData(response.data);
      if (options?.onSuccess) {
        options.onSuccess(response.data);
      }
    } catch (err) {
      getErrorMessage(err);
      const error = err as AxiosError;
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  const refetch = () => {
    fetchData();
  };

  return {
    data,
    loading,
    error,
    refetch,
  };
};

export default useFetch;
