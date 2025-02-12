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
  const [showLoading, setShowLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const activeRequest = useRef(false);

  const fetchData = async () => {
    try {
      activeRequest.current = true;
      setIsInitialLoading(true);

      setTimeout(() => {
        if (activeRequest.current) {
          setShowLoading(true);
        }
      }, 300);

      setError(null);
      const response = await api(url);
      setData(response.data);
      if (options?.onSuccess) {
        options.onSuccess(response.data);
      }

      activeRequest.current = false;
      setShowLoading(false);
      setIsInitialLoading(false);
    } catch (err) {
      getErrorMessage(err);
      const error = err as AxiosError;
      setError(error.message);

      if (options?.onError) {
        options.onError(error.response?.status || 500);
      }

      activeRequest.current = false;
      setShowLoading(false);
      setIsInitialLoading(false);
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
    loading: showLoading,
    isInitialLoading,
    error,
    refetch,
    setData,
  };
};

export default useFetch;
