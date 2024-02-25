import { initAxios } from '../api/axios';
import { useSelector, useDispatch } from 'react-redux';
import { setAuth } from '../features/auth/auth';

const useRefreshToken = () => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth.value);

  const refresh = async () => {
    const res = await initAxios.get('/refresh', {
      withCredentials: true
    });
    // console.log('New Access token in useRefreshToken hook:', res.data.accessToken);
    dispatch(setAuth({ isAuth: true, accessToken: res.data.accessToken }));
    return res.data?.accessToken;
  }

  return refresh;
}

export default useRefreshToken;
