import api from "@/lib/apiService";
import { getErrorMessage } from "@/lib/utils";
import { AxiosError } from "axios";
import { useEffect, useState, useRef } from "react";

const useFetch = <T>(
  url: string,
  options?: {
    onSuccess?: (data: T) => void;
    onError?: (status: number) => void;
  }
) => {
  const [data, setData] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const activeRequest = useRef(false);

  const fetchData = async () => {
    try {
      activeRequest.current = true;
      setLoading(true);

      const response = await api(url);
      setData(response.data);
      if (options?.onSuccess) {
        options.onSuccess(response.data);
      }

      activeRequest.current = false;
      setLoading(false);
    } catch (err) {
      getErrorMessage(err);
      const error = err as AxiosError;
      setError(error.message);

      if (options?.onError) {
        options.onError(error.response?.status || 500);
      }

      activeRequest.current = false;
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
    setData,
  };
};

export default useFetch;
