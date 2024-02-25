import { useSelector } from "react-redux";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import axios from "../api/axios";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const auth = useSelector(state => state.auth.value);

  useEffect(() => {
    const responseIntercept = axios.interceptors.response.use(
      response => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return axios(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    const requestIntercept = axios.interceptors.request.use(
      config => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      }, (error) => Promise.reject(error)
    );

    return () => {
      axios.interceptors.request.eject(requestIntercept);
      axios.interceptors.response.eject(responseIntercept);
    };
  }, [refresh]);

  return axios;
};

export default useAxiosPrivate;