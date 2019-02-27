'use strict'

function buildNamedFunction (operator, limit) {
  const fn = new Function('i', `return i ${operator} ${limit}`) // eslint-disable-line
  fn.toString = function () { return `i ${operator} ${limit}` }
  return fn
}

function buildTestTree (rootNode) {
  rootNode.addCriteria(buildNamedFunction('<', 0), -1)
    .addCriteria(buildNamedFunction('<', -5), -5)
    .addSiblingCriteria(buildNamedFunction('>', -5), -4)

  rootNode.addCriteria(buildNamedFunction('==', 0), 0)
    .addCriteria(buildNamedFunction('<=', -0), -10)

  const node = rootNode.addCriteria(buildNamedFunction('>', 0), 1)
    .addCriteria(buildNamedFunction('>', 10), 10)

  node.addCriteria(buildNamedFunction('>', 6), 7)
  node.addSiblingCriteria(buildNamedFunction('<', 10), 9)
    .addSiblingCriteria(buildNamedFunction('>', 99), 100)

  return rootNode
}

module.exports = {
  buildNamedFunction,
  buildTestTree
}
