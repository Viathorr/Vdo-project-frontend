import useAxiosPrivate from './useAxiosPrivate';

const useChangePassword = () => {
  const axios = useAxiosPrivate();

  const changePwd = async (currPassword, newPassword) => {
    const res = await axios.put(`/user/change-password`, { currPassword, newPassword });

    return res;
  };

  return changePwd;
};

export default useChangePassword;