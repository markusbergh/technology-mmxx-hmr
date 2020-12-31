import express from 'express'
import path from 'path'

import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'

import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

import App from '../client/app.js'

const webpackConfig = require('../../webpack.client.js')

const isDev = process.env.NODE_ENV === 'development'
const SERVER_PORT = process.env.PORT || 3000

const app = express()

app.use(express.static('public'))
app.use(express.static(path.join(__dirname, 'dist')))

app.disable('x-powered-by')

if (isDev) {
  const compiler = webpack(webpackConfig)

  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
  }))

  app.use(webpackHotMiddleware(compiler, {
    log: false,
    heartbeat: 10 * 1000,
  }))
}

app.get('/*', (req, res) => {
  const context = {}

  const app = renderToString(
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>,
  )

  const html = `
    <!doctype html>
    <html>
      <head>
        <title>Technology MMXX</title>
      </head>
      <body>
        <div id="root">${app}</div>
        <script src="./client.js"></script>
      </body>
    </html>
  `

  if (context.url) {
    res.writeHead(301, {
      Location: context.url,
    })
    res.end()
  } else {
    res.send(html)
  }
})

app.listen(SERVER_PORT, () => {
  console.log(`😎 Listening on port ${SERVER_PORT}`)
})
