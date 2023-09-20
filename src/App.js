//START IMPORTS
import { Routes, Route } from "react-router-dom";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import ResetPassword from "./Pages/ResetPassword";
import AdminLayout from "./Pages/AdminLayout";
import HomepageLayout from "./Pages/HomepageLayout";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import Page404 from "./Pages/404.jsx";
import BrandLayout from "./components/Brand/BrandLayout";
import CategoryLayout from "./components/Category/CategoryLayout.jsx";
import GlobalOutlet from "./Pages/GlobalOutlet";
import RequireAuth from "./features/auth/RequireAuth";
import PersistLogin from "./features/auth/PersistLogin";
import Prefetch from "./features/auth/Prefetch";
import ProductLayout from "./components/Product/ProductLayout";
import ProductsPage from "./Pages/ProductsPage";
import PrefetchProducts from "./features/auth/PrefetchProducts";
import CustomerLayout from "./components/Customer/CustomerLayout";
import { AccountProfileDetails } from "./components/Customer/account/account-profile-details";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import CartPage from "./Pages/CartPage";
import CheckoutSuccess from "./Pages/CheckoutSuccess";
import SingleProduct from "./Pages/SingleProduct";
import { Container } from "@mui/material";
import Wishlist from "./Pages/Wishlist";
import AllOrderList from "./components/Order/AllOrderList";
import AllCustomerOrder from "./components/Order/AllCustomerOrder";
//STOP IMPORTS

function App() {
  return (
    <Container>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Routes>
          <Route element={<PersistLogin />}>
            <Route element={<PrefetchProducts />}>
              <Route path="/" element={<GlobalOutlet />}>
                <Route index element={<HomepageLayout />} />

                <Route path="accounts/*">
                  <Route path="signin" element={<Signin />} />
                  <Route path="signup" element={<Signup />} />
                  <Route path="reset-password" element={<ResetPassword />} />
                  <Route path=":uid" element={<AccountProfileDetails />} />
                  <Route path="wishlist/:userId" element={<Wishlist />} />
                  <Route path="orders/:userId" element={<AllCustomerOrder />} />
                </Route>

                <Route path="products/" element={<ProductsPage />} />
                <Route path="products/:productId" element={<SingleProduct />} />

                <Route
                  element={
                    <RequireAuth
                      allowedRoles={[
                        process.env.REACT_APP_ADMIN_ROLE,
                        process.env.REACT_APP_CUSTOMER_ROLE,
                      ]}
                    />
                  }
                >
                  <Route path="products/cart/*" element={<CartPage />} />
                  <Route
                    path="products/cart/payment-success"
                    element={<CheckoutSuccess />}
                  />
                </Route>

                <Route
                  element={
                    <RequireAuth
                      allowedRoles={[process.env.REACT_APP_ADMIN_ROLE]}
                    />
                  }
                >
                  <Route element={<Prefetch />}>
                    <Route path={"/admin/*"} element={<AdminLayout />}>
                      <Route path="dashboard" element={<AdminDashboard />} />
                      <Route path="brands" element={<BrandLayout />} />
                      <Route path="categories" element={<CategoryLayout />} />
                      <Route path="products" element={<ProductLayout />} />
                      <Route path="accounts" element={<CustomerLayout />} />
                      <Route path="orders" element={<AllOrderList />} />
                      <Route
                        path="accounts/:uid"
                        element={<AccountProfileDetails />}
                      />
                    </Route>
                  </Route>
                </Route>
              </Route>
            </Route>
            <Route path="*" element={<Page404 />} />
          </Route>
        </Routes>
      </LocalizationProvider>
    </Container>
  );
}

export default App;
