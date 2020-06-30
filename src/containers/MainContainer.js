import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {
  state = {
    stonks: [],
    portfolio: [],
    sortBy: "",
    filter: ""
  }

  componentDidMount() {
    fetch('http://localhost:3000/stocks')
    .then(res => res.json())
    .then(stonks => this.setState({ stonks }))
  }

  buyStock = (stock) => {
    this.setState({ portfolio: [...this.state.portfolio, stock]})
  }

  sellStock = (stock) => {
    const filteredCompleted = this.state.portfolio.filter(s => s.id !== stock.id);

    this.setState({ portfolio: filteredCompleted });
  }

  filterStocks = () => {
    let filteredStocks = this.state.stonks
    if (this.state.filter !== ''){
      filteredStocks = this.state.stonks.filter(stock => stock.type === this.state.filter)
    } else {
      filteredStocks = this.state.stonks
    }
    return filteredStocks
  }

  handleFilterStocks = (event) => {
    console.log(event.target.value)
    this.setState({filter: event.target.value})
  }

  handleSortStocks = (event) => {
    console.log(event.target.value)
    this.setState({sortBy: event.target.value})
  }

  sortStocksBy = () => {
    let stocks = this.filterStocks()
    let sortedStocks = [];
    if (this.state.sortBy === 'Alphabetically') {
      sortedStocks = stocks.sort((a,b) => a.name.localeCompare(b.name))
    } else if (this.state.sortBy === "Price") {
      sortedStocks = stocks.sort((a,b) => a.price - b.price)
    } else {
      return this.state.stonks
    }
    return sortedStocks
  }

  render() {
    return (
      <div>
        <SearchBar handleFilterStocks={this.handleFilterStocks} handleSortStocks={this.handleSortStocks} sortBy={this.state.sortBy} sortStocksBy={this.sortStocksBy()}/>

          <div className="row">
            <div className="col-8">

              <StockContainer stocks={this.sortStocksBy()} handleClick={this.buyStock}/>

            </div>
            <div className="col-4">

              <PortfolioContainer stocks={this.state.portfolio} handleClick={this.sellStock}/>

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
