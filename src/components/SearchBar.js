import React from 'react';

const SearchBar = ({ handleSortStocks, sortBy, filterStocks, handleFilterStocks }) => {
  return (
    <div>

      <strong>Sort by:</strong>
      <label>
        <input type="radio" value="Alphabetically" checked={sortBy === 'Alphabetically'} onChange={handleSortStocks}/>
        Alphabetically
      </label>
      <label>
        <input type="radio" value="Price" checked={sortBy === 'Price'} onChange={handleSortStocks}/>
        Price
      </label>
      <br/>

      <label>
        <strong>Filter:</strong>
        <select onChange={(event) => handleFilterStocks(event)}>
          <option value="Tech">Tech</option>
          <option value="Sportswear">Sportswear</option>
          <option value="Finance">Finance</option>
        </select>
      </label>


    </div>
  );
}


export default SearchBar;
