'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
//BASE_API: '"http://salesv2-ccw-local.colourlife.com"',
//STATIC_URL: '"http://salesv2-ccw-local.colourlife.com"'
	BASE_API: '"https://salesv2-ccw-test.colourlife.com"',
  STATIC_URL: '"https://salesv2-ccw-test.colourlife.com"'
})
