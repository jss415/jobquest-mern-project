import CardBilling from "./CardBilling";
import CardDescription from "./CardDescription";
import CardAction from "./CardAction";
import CardFeatures from "./CardFeatures";

export default function PricingCard(props) {
  const { type, title, description, price, mostPopular, data } = props;
  return (
    <div className={`card pricing-card ${type}`}>
      {mostPopular ? <span className="most-popular">Most Popular</span> : null}
      <CardDescription title={title} description={description} />
      <CardBilling price={price} />
      <CardFeatures data={data} />
      <CardAction price={price} credits={title} />
    </div>
  );
}
