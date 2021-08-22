const { whenProd } = require('@craco/craco')

module.exports = {
  babel: {
    plugins: [
      ...whenProd(() => [['react-remove-properties', { properties: ['data-testid'] }]], [])
    ]
  }
}
