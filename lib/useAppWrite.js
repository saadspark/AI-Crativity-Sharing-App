import { useEffect, useState } from "react";

const useAppWrite = (fn) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fn();
        setData(response);
      } catch (error) {
        Alert.alert("Error", error.message); // Fixed the error message reference
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [fn]); // Added dependency array to avoid infinite loop

  const refetch = () => fetchData();

  return { data, isLoading, refetch };
};

export default useAppWrite;
