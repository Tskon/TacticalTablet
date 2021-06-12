import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from 'react-router-dom'

import DefaultTemplate from '~/templates/DefaultTemplate'
import Main from '~/pages/Main'
import Tablet from '~/pages/Tablet'

function TabletChild() {
  const {slug} = useParams()
  return <Tablet slug={slug}/>
}

export default function AppRouter() {
  return (
    <Router>
      <DefaultTemplate>
        <Switch>
          <Route path="/tablet/:slug">
            <TabletChild/>
          </Route>
          <Route path="/">
            <Main/>
          </Route>
        </Switch>
      </DefaultTemplate>
    </Router>
  )
}
