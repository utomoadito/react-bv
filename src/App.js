import React from 'react'
import { routes } from './router'
import { Route } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <div>
      {routes.map((route, i) => {
        if (route.path === '/') {
          return (
            <Route
              key={i}
              exact
              path={route.path}
              render={props => (
                <route.component {...props} />
              )}
            />
          )
        } else {
          return (
            <Route
              key={i}
              path={route.path}
              render={props => (
                <route.component {...props} />
              )}
            />
          )
        }
      })}
    </div>
  )
}

export default App
