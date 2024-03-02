import useAxiosPrivate from "./useAxiosPrivate";

const useChangeUserInfo = () => {
  const axios = useAxiosPrivate();

  const saveChanges = async (name, country, phoneNum) => {
    const res = await axios.put('/user/change-user-info', { name, country, phoneNum });
    
    return res;
  }

  return saveChanges;
}

export default useChangeUserInfo
