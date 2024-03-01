import { useState, useEffect } from "react";
import useAxiosPrivate from "./useAxiosPrivate";

const useAxiosFetch = (dataUrl) => {
  const [data, setData] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const axiosJWT = useAxiosPrivate();
 
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchData = async (url) => {
      setIsLoading(true);
      try {
        const response = await axiosJWT.get(url, { signal: controller.signal, withCredentials: true });
        if (isMounted) {
          setData(response.data ? response.data: []);
          setFetchError(null);
        }
      } catch (err) {
        if (isMounted) {
          console.log(err.message); 
          setFetchError(err.message);
          setData([]);
        }
      } finally {
        isMounted && setIsLoading(false);
      }
    }

    fetchData(dataUrl);

    const cleanUp = () => {
      isMounted = false;
      controller.abort();
    }

    return cleanUp;
  }, [dataUrl]);

  return { data, fetchError, isLoading };
}

export default useAxiosFetch;