'use strict'

const archy = require('archy')

function noop () { return true }

function UseIt (fn, resource) {
  this.parent = undefined
  this.children = []
  this.resource = resource
  this.criteria = fn || noop
}

UseIt.prototype.addCriteria = function (fn, resource) {
  const node = new UseIt(fn, resource)
  node.parent = this
  this.children.push(node)
  return node
}

UseIt.prototype.addSiblingCriteria = function (fn, resource) {
  return this.addCriteria.call(this.parent, fn, resource)
}

UseIt.prototype.depthFirstSearch = function (item) {
  // TODO
}

UseIt.prototype.breadthFirstSearch = function (item, opts) {
  // TODO manage:
  /*
    opts.traverseAll: not ignore sub-tree when criteria is false
  */
  const resourceStack = []
  const queue = []
  queue.push(this)

  while (queue.length > 0) {
    const node = queue.shift() // ! this is not performant
    const res = node.criteria(item)
    if (res === true) { // TODO manage a promise
      if (node.resource) {
        resourceStack.push(node.resource)
      }
      node.children.forEach(_ => queue.push(_))
    }
  }

  return resourceStack
}

UseIt.prototype.evaluate = function (item, opts) {
  // TODO traverse the tree
  return this
}

UseIt.prototype.prettyPrint = function (pritty) {
  const getLabel = pritty || ((criteria, resource = '') => `${criteria.toString()} ${resource}`)

  const decorateText = (node) => {
    node.label = getLabel(node.criteria, node.resource)
    if (node.children.length > 0) {
      node.nodes = node.children.map(_ => decorateText(_))
    }
    return node
  }
  console.log(archy(decorateText(Object.assign({}, this))))
}

module.exports = UseIt
