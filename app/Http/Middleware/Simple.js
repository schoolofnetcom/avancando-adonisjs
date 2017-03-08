'use strict'

class Simple {

  * handle (request, response, next) {
    console.log(`${request.url()} - ${request.hostname()}`)
    yield next
  }

}

module.exports = Simple
