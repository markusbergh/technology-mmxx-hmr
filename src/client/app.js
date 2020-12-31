import React from 'react'
import { Route, Switch } from 'react-router'
import { NavLink } from 'react-router-dom'

// Entry-point for routes shared between client and server
import routes from './routes/routes'

/**
 * Due to performance issues using large CSS files and
 * bundling with webpack, splitting up the Tailwind CSS
 * styles speeds up hot module replacement significantly.
 */
import './app-base.css'
import './app-components.css'
import './app-utilities.css'

const App = () => (
  <div className="container mx-auto">
    <nav className="mt-5 mb-5">
      <ul className="inline-flex space-x-5">
        <li>
          <NavLink
            className="underline"
            to="/"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            className="underline"
            to="/about"
          >
              About
          </NavLink>
        </li>
      </ul>
    </nav>

    <main>
      <Switch>
        {routes.map(route => (
          <Route key={route.name} {...route} />
        ))}
      </Switch>
    </main>
  </div>
)

export default App
