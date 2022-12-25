import { useCallback, useState } from "react";
const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest =useCallback( async (requestQuery,responseData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(requestQuery.url, {
        method: requestQuery.method ? requestQuery.method : "GET",
        headers: requestQuery.headers ? requestQuery.headers : {},
        body: requestQuery.body ? JSON.stringify(requestQuery.body) : null,
      });

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();
      responseData(data);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  },[]);

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;
