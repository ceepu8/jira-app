import axios from "axios";
import { useEffect, useState } from "react";

const useRequest = (apiFunction) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const fetchData = async () => {
    try {
      setIsLoading(false);
      const { data } = await apiFunction();
      setData(data);
      setIsLoading(true);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, isLoading, error };
};

export default useRequest;
