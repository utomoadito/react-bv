import React from 'react'
import { routes } from './router'
import { Route, Redirect } from 'react-router-dom'
import Login from './views/Login'
import './App.css'

function App() {
  const token = localStorage.getItem('user-token')
  return (
    <div>
      <Route
        path="/login"
        render={() => !token ? (
          <Login /> 
        ) : (
          <Redirect to="/" />
        )
      }
      />
      {routes.map((route, i) => {
        return (
          <Route
            key={i}
            exact={route.exact}
            path={route.path}
            render={props => token ? (
              <route.component {...props} />
            ) : (
              <Redirect to="/login" />
            )}
          />
        )
      })}
    </div>
  )
}

export default App
