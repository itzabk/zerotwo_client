import { Button } from "@mui/material";
import { useLazyCreatePaymentQuery } from "../../features/cart/cartApiSlice";
const PayButton = ({ cartItems }) => {
  const [createCart] = useLazyCreatePaymentQuery();
  const userId = localStorage.getItem("userId");
  const cartId = localStorage.getItem("cartId");

  const handleCheckout = async () => {
    try {
      const item = { userId: userId, ...cartItems, cartId: cartId };
      const response = await createCart(item).unwrap();
      window.location.href = response.url;
    } catch (error) {
      console.log(error?.data?.message);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        color="success"
        size="large"
        onClick={() => handleCheckout()}
      >
        Check out
      </Button>
    </>
  );
};

export default PayButton;
