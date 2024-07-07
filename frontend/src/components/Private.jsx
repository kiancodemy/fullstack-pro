import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function Private() {
  const location = useLocation();
  const path = location.pathname;

  const { userinfo } = useSelector((state) => state.auth);

  return userinfo ? (
    <Outlet></Outlet>
  ) : (
    <Navigate to={`/login/?redirect=${path}`} replace></Navigate>
  );
}

export default Private;
