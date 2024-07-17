import Wrapper from "../assets/wrappers/PurchaseContainer";
import CardsData from "../utils/CardsData";
import PricingCard from "../components/PricingCard";

const Purchase = () => {
  return (
    <Wrapper>
      {CardsData.map((props) => {
        return <PricingCard {...props} key={props.id} />;
      })}
    </Wrapper>
  );
};
export default Purchase;
