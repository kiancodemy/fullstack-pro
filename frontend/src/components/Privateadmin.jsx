import { Outlet, Navigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useSelector } from "react-redux";
import { useEffect } from "react";
function Privateadmin() {
  const { userinfo } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!userinfo || !userinfo?.admin) {
      toast.error("You are not Admin", {
        position: "bottom-right",
      });
    }
  }, []);

  return userinfo && userinfo.admin ? (
    <Outlet></Outlet>
  ) : (
    <Navigate to="/login" replace></Navigate>
  );
}

export default Privateadmin;
