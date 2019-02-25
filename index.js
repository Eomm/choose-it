'use strict'

const { BSTree } = require('buckets-js')

function compare () {
  // TODO
}

class useIt {
  constructor () {
    this.tree = new BSTree(compare)
  }

  addResouce (resource, criteria) {
    this.tree.add(criteria)
  }
  addCriteria (criteria) {
    this.tree.add(criteria)
  }
}

module.exports = useIt
