import { useDispatch } from "react-redux";
import useAxiosPrivate from './useAxiosPrivate';
import { removeAuth } from '../features/auth/auth';

const useLogout = () => {
  const dispatch = useDispatch();
  const axios = useAxiosPrivate();

  const logout = async () => {
    try {
      await axios.get('/logout', { withCredentials: true });
      dispatch(removeAuth());
    } catch (err) {
      console.log(err);
    }
  };

  return logout;
};

export default useLogout;