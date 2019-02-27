'use strict'

const archy = require('archy')

function noop () { return true }

function ChooseIt (fn = noop, resource) {
  if (typeof fn !== 'function') {
    throw new Error('fn parameter must be a function')
  }

  this.parent = undefined
  this.children = []
  this.resource = resource
  this.criteria = fn
}

ChooseIt.prototype.addCriteria = function (fn, resource) {
  if (typeof fn !== 'function') {
    throw new Error('fn parameter must be a function')
  }

  const node = new ChooseIt(fn, resource)
  node.parent = this
  this.children.push(node)
  return node
}

ChooseIt.prototype.addSiblingCriteria = function (fn, resource) {
  if (this.parent === undefined) {
    throw new Error('Cannot add sibling on root node')
  }
  return this.addCriteria.call(this.parent, fn, resource)
}

ChooseIt.prototype.clear = function () {
  this.children.forEach(c => { c.parent = undefined })
  this.children = []
}

// don't need to remember visited nodes (you can only add node not connect ones)
ChooseIt.prototype.depthFirstSearchPreOrder = function (item, opts = {}) {
  const resourceStack = []
  preOrder(this)
  return resourceStack

  function preOrder (node) {
    const res = node.criteria(item) // TODO manage a promise

    if (res === true && node.resource) {
      resourceStack.push(node.resource)
    }

    if (res === true || opts.traverseAll === true) {
      if (opts.maxResults > 0 && resourceStack.length === opts.maxResults) {
        return
      }
      node.children.forEach(_ => {
        if (opts.maxResults > 0 && resourceStack.length === opts.maxResults) {
          return
        }
        preOrder(_)
      })
    }
  }
}

ChooseIt.prototype.depthFirstSearchPostOrder = function (item, opts = {}) {
  const resourceStack = []
  postOrder(this)
  return resourceStack

  function postOrder (node) {
    node.children.forEach(_ => {
      if (opts.maxResults > 0 && resourceStack.length === opts.maxResults) {
        return
      }
      postOrder(_)
    })

    const res = node.criteria(item) // TODO manage a promise

    if (res === true &&
      node.resource &&
      (opts.maxResults === 0 || resourceStack.length < opts.maxResults)) {
      resourceStack.push(node.resource)
    }
  }
}

ChooseIt.prototype.depthFirstSearch = function (item, opts = {}) {
  switch (opts.order) {
    case 'NLR':
      return this.depthFirstSearchPreOrder(item, opts)
    case 'LRN':
      return this.depthFirstSearchPostOrder(item, opts)
    // case 'LNR': // ? In-order => cant implement unless to transform general tree in binary tree
    // case 'RNL': // ? Out-order => same of in-order but the sort is reverted
    default:
      throw new Error('Unknown DFS algorithm', opts.order)
  }
}

ChooseIt.prototype.breadthFirstSearch = function (item, opts = {}) {
  const resourceStack = []
  const queue = []
  queue.push(this)

  while (queue.length > 0) {
    const node = queue.shift() // ! this is not performant
    const res = node.criteria(item) // TODO manage a promise

    if (res === true && node.resource) {
      resourceStack.push(node.resource)

      if (opts.maxResults > 0 && resourceStack.length === opts.maxResults) {
        break
      }
    }

    if (res === true || opts.traverseAll === true) {
      node.children.forEach(_ => queue.push(_))
    }
  }

  return resourceStack
}

ChooseIt.prototype.evaluate = function (item, options) {
  const opts = cleanOpts(options)
  switch (opts.algorithm) {
    case 'BFS':
      return this.breadthFirstSearch(item, opts)
    case 'DFS':
      return this.depthFirstSearch(item, opts)
    default:
      throw new Error('Unknown algorithm', opts.algorithm)
  }
}

ChooseIt.prototype.toJSON = function () {
  const toJSON = (target, node) => {
    target.criteria = node.criteria
    target.resource = node.resource
    target.nodes = node.children.map(_ => toJSON({}, _))
    return target
  }
  return toJSON({}, this)
}

ChooseIt.prototype.prettyPrint = function (pretty) {
  const getLabel = pretty || ((criteria, resource = '') => `${criteria.toString()} ${resource}`)

  const decorateText = (node) => {
    node.label = getLabel(node.criteria, node.resource)
    node.nodes = node.children.map(_ => decorateText(_))
    return node
  }
  console.log(archy(decorateText(Object.assign({}, this))))
}

function cleanOpts (opts) {
  return Object.assign({
    traverseAll: false,
    maxResults: 0,
    algorithm: 'BFS',
    order: 'NLR'
  }, opts)
}

module.exports = ChooseIt
