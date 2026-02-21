import "./BankLoader.css";

const BankLoader = () => {
  return (
    <div className="bank-loader">
      <div className="loader-card">
        <div className="currency">₹</div>

        <div className="progress">
          <span></span>
        </div>

        <p>Securing your transaction...</p>
      </div>
    </div>
  );
};

export default BankLoader;
