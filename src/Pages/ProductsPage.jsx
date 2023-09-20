//START IMPORTS
import { useState, useEffect } from "react";
import { Container, Typography } from "@mui/material";
import ProductFilterSidebar from "../components/Product/ProductFilterSidebar/ProductFilterSidebar";

import DefaultMenuBar from "../components/AppMenuBar/DefaultMenuBar";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import useAuth from "../hooks/useAuth";
import { useLazyCreateCartQuery } from "../features/cart/cartApiSlice";
//STOP IMPORTS

const pages = null;
const settings = null;

export default function ProductsPage() {
  const [openFilter, setOpenFilter] = useState(false);
  const [createCart] = useLazyCreateCartQuery();
  const { status } = useAuth();
  const userId = localStorage.getItem("userId");

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  //create cart
  async function setCart() {
    try {
      const { cartId } = await createCart({
        userId: userId,
      }).unwrap();
      localStorage.setItem("cartId", cartId);
    } catch (err) {
      console.log(err?.data?.message);
    }
  }
  //cart creation based on condition
  useEffect(() => {
    const cartIdLocal = localStorage.getItem("cartId");
    if (!cartIdLocal && userId.length > 0) {
      setCart();
    }
    //eslint-disable-next-line
  }, []);

  return (
    <>
      <Container>
        {status || userId?.length ? (
          <DefaultMenuBar
            pages={pages}
            settings={settings}
            icon={<AddShoppingCartIcon size="xl" color="warning" />}
          />
        ) : (
          <DefaultMenuBar pages={pages} settings={settings} />
        )}

        <Container
          sx={{
            backgroundImage: "url(/dddepth-256.jpg)",
            backgroundSize: "cover",
            minHeight: "100vh",
          }}
        >
          <Typography
            variant="h4"
            sx={{ color: "whitesmoke", textAlign: "center" }}
          >
            Products
          </Typography>

          <ProductFilterSidebar
            openFilter={openFilter}
            onOpenFilter={handleOpenFilter}
            onCloseFilter={handleCloseFilter}
          />
        </Container>
      </Container>
    </>
  );
}
