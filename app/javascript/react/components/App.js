import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import BackdropFilter from 'react-backdrop-filter'

import TripsIndexComponent from './TripsIndexComponent'
import TripShowContainer from './TripShowContainer'
import EventShowContainer from './EventShowContainer'
import NewTripContainer from './NewTripContainer'
import AboutUsPage from './AboutUsPage'
import NewTripmemberForm from './NewTripmemberForm'
import FlightTile from './FlightTile'
import EventEditContainer from './EventEditContainer'
import NewFlightForm from './NewFlightForm'
import ReviewListComponent from './ReviewListComponent'
import ChatRoomComponent from './ChatRoomComponent'
import DirectionsComponent from './DirectionsComponent'

export const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={TripsIndexComponent}></Route>
        <Route exact path='/trips' component={TripsIndexComponent}></Route>
        <Route exact path='/trips/new' component={NewTripContainer}></Route>
        <Route exact path='/trips/:id' component={TripShowContainer}></Route>
        <Route exact path='/trips/:id/events' component={EventShowContainer}></Route>
        <Route exact path='/trips/:id/events/edit' component={EventEditContainer}></Route>
        <Route exact path='/aboutus' component={AboutUsPage}></Route>
        <Route exact path='/trips/:id/flights' component={FlightTile}></Route>
        <Route exact path='/invites/new' component={NewTripmemberForm}></Route>
        <Route exact path='/reviews' component={ReviewListComponent}></Route>
        <Route exact path='/directions' component ={DirectionsComponent}></Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
