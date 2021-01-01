import React from 'react'
import { Route, Switch } from 'react-router'
import { NavLink } from 'react-router-dom'
import { CSSTransition, SwitchTransition } from 'react-transition-group'

// Entry-point for routes shared between client and server
import routes from './routes/routes'

import styles from './app.css'
import './transition.css'

const App = () => (
  <div>
    <nav className={styles.navigation}>
      <ul className={styles.navigation__list}>
        <li className={styles.navigation__list_item}>
          <NavLink to="/">Home</NavLink>
        </li>
        <li className={styles.navigation__list_item}>
          <NavLink to="/about">About</NavLink>
        </li>
      </ul>
    </nav>

    <main className={styles.main}>
      <Route render={({ location }) => (
        <SwitchTransition>
          <CSSTransition
            timeout={300}
            classNames="fade"
            key={location.key}
          >
            <Switch location={location}>
              {routes.map(route => (
                <Route key={route.name} {...route} />
              ))}
            </Switch>
          </CSSTransition>
        </SwitchTransition>
      )} />
    </main>
  </div>
)

export default App
