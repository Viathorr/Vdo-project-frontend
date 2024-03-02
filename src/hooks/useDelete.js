import useAxiosPrivate from "./useAxiosPrivate";
import { removeAuth } from '../features/auth/auth';
import { removeUser } from '../features/auth/user';
import { useDispatch } from "react-redux";

const useDelete = () => {
  const axios = useAxiosPrivate();
  const dispatch = useDispatch();

  const deleteAcc = async () => {
    const res = await axios.delete('/user/delete-account', { withCredentials: true });
    console.log(res.data.message);
    if (res.status === 200) {
      dispatch(removeAuth());
      dispatch(removeUser());
    }

    return res.data.message;
  };

  return deleteAcc;
}

export default useDelete;
