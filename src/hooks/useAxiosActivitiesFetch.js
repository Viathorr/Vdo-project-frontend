import { useState, useEffect } from "react";
import useAxiosPrivate from "./useAxiosPrivate";

const useAxiosActivitiesFetch = (dataUrl) => {
  const [data, setData] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const axiosJWT = useAxiosPrivate();
  
  return [];
}

export default useAxiosActivitiesFetch
