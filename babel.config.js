module.exports = api => {
  // Will be either `node` or `web`
  const isWeb = api.caller(caller => caller && caller.target === 'web')

  // To determine when to include certain plugin(s)
  const isDev = process.env.NODE_ENV === 'development'

  return {
    presets: [
      '@babel/env',
      '@babel/react',
    ],
    plugins: [
      isDev && isWeb && 'react-refresh/babel',
    ].filter(Boolean),
  }
}
