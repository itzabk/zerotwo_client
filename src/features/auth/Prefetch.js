import store from "../../config/store";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { accountsApiSlice } from "../accounts/accountsApiSlice";

const Prefetch = () => {
  useEffect(() => {
    store.dispatch(accountsApiSlice.endpoints["getAccounts"].initiate());
  }, []);
  return <Outlet />;
};
export default Prefetch;
