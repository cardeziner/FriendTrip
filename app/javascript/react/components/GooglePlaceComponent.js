import React, { useState, useEffect } from 'react'
import SearchBar from 'material-ui-search-bar'
import Script from 'react-load-script'

const GooglePlaceComponent = (props) =>{
  const [parameters, setParameters] = useState({
    city: 'Denver',
    query: 'Crawford Hotel'
  })



  return(
    <div>
      <Script url="https://maps.googleapis.com/maps/api/js?key=AIzaSyDfko-fZFYDu55aKlWlZUVAAL0sXsbrbqo&libraries=places"
        onLoad={this.handleScriptLoad}
      />   
      <SearchBar
      id="autocomplete"
      placeholder=""
      hinttext={parameters.city}
      value=""
      className="search"
      />
    </div>
  )
}

export default GooglePlaceComponent
