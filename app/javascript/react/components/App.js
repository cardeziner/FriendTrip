import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'


import TripsIndexComponent from './TripsIndexComponent'
import TripShowContainer from './TripShowContainer'
import EventShowContainer from './EventShowContainer'
import NewTripContainer from './NewTripContainer'



export const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={TripsIndexComponent}></Route>
        <Route exact path='/trips' component={TripsIndexComponent}></Route>
        <Route exact path='/trips/new' component={NewTripContainer}></Route>
        <Route exact path='/trips/:id' component={TripShowContainer}></Route>
        <Route exact path='/trips/:id/events' component={EventShowContainer}></Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
