import { useLocation, Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const RequestAuth = (props) => {
  const auth = useSelector(state => state.auth.value);
  const location = useLocation();

  
  return (
    auth.isAuth
      ? <Outlet />
      : <Navigate to='/login' state={{ from: location }} replace />
  );
};

export default RequestAuth;
