import { Outlet, Navigate } from "react-router-dom";

import { useSelector } from "react-redux";
function Privateadmin() {
  const { userinfo } = useSelector((state) => state.auth);

  return userinfo && userinfo.admin ? (
    <Outlet></Outlet>
  ) : (
    <Navigate to="/login" replace></Navigate>
  );
}

export default Privateadmin;
