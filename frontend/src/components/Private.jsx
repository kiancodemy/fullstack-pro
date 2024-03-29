import { Outlet, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
function Private() {
  const { userinfo } = useSelector((state) => state.auth);

  return userinfo ? (
    <Outlet></Outlet>
  ) : (
    <Navigate to="/login" replace></Navigate>
  );
}

export default Private;
