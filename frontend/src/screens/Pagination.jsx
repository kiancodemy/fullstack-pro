import { Box, Pagination } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Link as routerr } from "react-router-dom";
import { useState, useEffect } from "react";
function Paginations({ count, admin = false, keys = "" }) {
  const navigate = useNavigate();
  const [number, setnumber] = useState(1);
  const [initial, setinitial] = useState(false);
  const handler = (e, value) => {
    setnumber(value);
    setinitial(true);
  };
  console.log(keys);
  useEffect(() => {
    if (initial) {
      !admin && keys
        ? navigate(`/search/${keys}/${number}`)
        : !admin
        ? navigate(`/page/${number}`)
        : navigate(`/admin/product/${number}`);
    }
  }, [number]);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        marginTop: "10px",
        padding: "15px",
      }}
    >
      <Pagination page={number} onChange={handler} count={count}></Pagination>
    </Box>
  );
}

export default Paginations;
