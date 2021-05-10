import React, { useState, useEffect } from 'react'
import SearchBar from 'material-ui-search-bar'
import Script from 'react-load-script'

const GooglePlaceComponent = (props) =>{
  const [parameters, setParameters] = {
    city: 'Denver',
    query: 'Crawford Hotel'
  }



  return(
    <div>
      <SearchBar
      id="autocomplete"
      placeholder=""
      hintText={parameters.city}
      value={parameters.query}
      className="search"
      />
    </div>
  )
}

export default GooglePlaceComponent
