import React from "react";

const Stock = ({ stock, handleClick }) => {
  return (
    <div>
      <div className="card" key={stock.id} onClick={() => handleClick(stock)}>
        <div className="card-body">
          <h5 className="card-title">
            {
              stock.name
              //Company Name
            }
          </h5>
          <p className="card-text">
            {
              `${stock.ticker}: ${stock.price}`
              //ticker: stock price
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default Stock;
