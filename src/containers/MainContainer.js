import React, { Component } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "../components/SearchBar";

class MainContainer extends Component {
  constructor() {
    super();
    this.state = {
      filter: null,
      sort: "None",
      stocks: [],
      portfolio: [],
    };
  }

  handleClick = (stock) => {
    this.setState({
      portfolio: [...this.state.portfolio, stock],
    });
  };

  componentDidMount() {
    fetch("http://localhost:3000/stocks")
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          stocks: result,
        });
      });
  }

  filterStocks = () => {
    let filteredStocks = this.state.stocks;
    if (this.state.filter) {
      filteredStocks = this.state.stocks.filter(
        (stock) => stock.type == this.state.filter
      );
    }
    switch (this.state.sort) {
      case "Alphabetically":
        return filteredStocks.sort((a, b) => (a.name > b.name ? 1 : -1));
      case "Price":
        return filteredStocks.sort((a, b) => (a.price > b.price ? 1 : -1));
      default:
        return filteredStocks;
    }
  };

  updateFilter = (event) => {
    this.setState({
      filter: event.target.value,
    });
  };

  updateSort = (event) => {
    this.setState({
      sort: event.target.value,
    });
  };

  render() {
    return (
      <div>
        <SearchBar
          updateFilter={this.updateFilter}
          updateSort={this.updateSort}
          sort={this.state.sort}
        />

        <div className="row">
          <div className="col-8">
            <StockContainer
              stocks={this.filterStocks()}
              handleClick={this.handleClick}
            />
          </div>
          <div className="col-4">
            <PortfolioContainer portfolio={this.state.portfolio} />
          </div>
        </div>
      </div>
    );
  }
}

export default MainContainer;
