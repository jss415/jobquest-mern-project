function CardBilling({ price }) {
  return (
    <div className="card-billing">
      <p>
        <strong className="price">$ {price}</strong>
      </p>
    </div>
  );
}

export default CardBilling;
