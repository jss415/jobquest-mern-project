import axios from "axios";
import { toast } from "react-toastify";

function CardAction({ price, credits }) {
  const handlePurchase = async () => {
    try {
      const response = await axios.post("/api/v1/payments/checkout-session", {
        credits,
        price,
      });

      const { data } = response;

      if (data.session.url) {
        window.location.href = data.session.url;
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
      toast.error(error?.response?.data?.msg);
    }
  };

  return (
    <div className="card-action">
      <button onClick={handlePurchase}>Purchase NOW</button>
    </div>
  );
}

export default CardAction;
