//START IMPORTS
import store from "../../config/store";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { productApiSlice } from "../product/productApiSlice";
import { categoryApiSlice } from "../category/categoryApiSlice";
import { brandApiSlice } from "../brand/brandApiSlice";
//STOP IMPORTS

const PrefetchProducts = () => {
  useEffect(() => {
    store.dispatch(productApiSlice.endpoints["getProducts"].initiate());
    store.dispatch(categoryApiSlice.endpoints["getCategories"].initiate());
    store.dispatch(brandApiSlice.endpoints["getBrands"].initiate());
  }, []);

  return <Outlet />;
};
export default PrefetchProducts;
