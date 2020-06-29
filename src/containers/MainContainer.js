import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {

  state = {
    stocks: [],
    myPortfolio: [],
    filter: 'All',
    sort: ''
  }

  addToPortfolio = (clickedStock) => {
    if (!this.state.myPortfolio.includes(clickedStock)) {
      this.setState({myPortfolio: [...this.state.myPortfolio, clickedStock]})
    }
  }

  setSortType = (choice) => {
    this.setState({sort: choice.target.value})
  }

  setFilterType = (choice) => {
    this.setState({filter: choice.target.value})
  }

  deleteFromPortfolio = (clickedStock) => {
    const james = this.state.myPortfolio.filter(obj=>obj !== clickedStock)
    this.setState({myPortfolio: james})
  }

  componentDidMount(){
    fetch('http://localhost:3000/stocks')
    .then(response => response.json())
    .then(stocks => this.updateState(stocks));

  }

  updateState = (stocks) => {
    this.setState({stocks: stocks})
  }

  getStocks = () => {
    let stocksToDisplay;
    if (this.state.filter === "All") {
      stocksToDisplay = this.state.stocks
    } else {
      stocksToDisplay = this.state.stocks.filter(stock=>stock.type === this.state.filter)
    }

    switch (this.state.sort) {
      case 'ABC':
        stocksToDisplay = stocksToDisplay.sort((stock1, stock2)=>stock1.name > stock2.name ? 100 : -100)
        break
      case '$':
        stocksToDisplay = stocksToDisplay.sort((stock1, stock2)=>stock2.price - stock1.price)
        break
    }
    return stocksToDisplay
  }


  render() {
    return (
      <div>
        <SearchBar changeSort={this.setSortType} changeFilter={this.setFilterType}/>

          <div className="row">
            <div className="col-8">

              <StockContainer stocks={this.getStocks()} modify={this.addToPortfolio} />

            </div>
            <div className="col-4">

              <PortfolioContainer stocks={this.state.myPortfolio} modify={this.deleteFromPortfolio} />

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
