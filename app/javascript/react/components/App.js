import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import TripsIndexComponent from './TripsIndexComponent'
import TripShowContainer from './TripShowContainer'

export const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={TripsIndexComponent}></Route>
        <Route exact path='/trips' component={TripsIndexComponent}></Route>
        <Route exact path='/trips/:id' component={TripShowContainer}></Route>

      </Switch>
    </BrowserRouter>
  )
}

export default App
