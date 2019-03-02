'use strict'

const t = require('tap')
const ChooseIt = require('../')
const h = require('./helper')
const test = t.test

test('call directly depthFirstSearch method without options', t => {
  t.plan(1)
  t.throws(() => {
    const tree = h.buildTestTree(new ChooseIt())
    tree.depthFirstSearch(1)
  }, 'depthFirstSearch require a options.order parameter')
})

test('call directly depthFirstSearch method with options', t => {
  t.plan(1)
  const tree = h.buildTestTree(new ChooseIt())
  const result = tree.depthFirstSearch(11, { order: 'NLR' })
  t.deepEqual(result, [1, 10, 7])
})

test('call directly depthFirstSearch method with more options', t => {
  t.plan(1)
  const tree = h.buildTestTree(new ChooseIt())
  const result = tree.depthFirstSearch(11, { order: 'NLR', maxResults: 1 })
  t.deepEqual(result, [1])
})

test('call directly depthFirstSearchPreOrder method without options', t => {
  t.plan(1)
  const tree = h.buildTestTree(new ChooseIt())
  const result = tree.depthFirstSearchPreOrder(11)
  t.deepEqual(result, [1, 10, 7])
})

test('call directly depthFirstSearchPostOrder method with options', t => {
  t.plan(1)
  const tree = h.buildTestTree(new ChooseIt())
  const result = tree.depthFirstSearchPostOrder(1)
  t.deepEqual(result, [-4, 9, 1])
})

test('evalutation with wrong order parameter - preorder', t => {
  t.plan(1)
  t.throws(() => {
    const tree = h.buildTestTree(new ChooseIt())
    tree.evaluate(1, { algorithm: 'DFS', order: 'NONE' })
  })
})

test('evalutation with default parameters - preorder', t => {
  t.plan(1)
  const tree = h.buildTestTree(new ChooseIt())
  const result = tree.evaluate(11, { algorithm: 'DFS' })
  t.deepEqual(result, [1, 10, 7])
})

test('evalutation with maxResults - preorder', t => {
  t.plan(1)
  const tree = h.buildTestTree(new ChooseIt())
  const result = tree.evaluate(1, { algorithm: 'DFS', maxResults: 1 })
  t.deepEqual(result, [1])
})

test('evalutation with traverseAll true - preorder', t => {
  t.plan(1)
  const tree = h.buildTestTree(new ChooseIt())
  const result = tree.evaluate(1, { algorithm: 'DFS', traverseAll: true })
  t.deepEqual(result, [-4, 1, 9])
})

test('evalutation with traverseAll true and maxResults - preorder', t => {
  t.plan(1)
  const tree = h.buildTestTree(new ChooseIt())
  const result = tree.evaluate(1, { algorithm: 'DFS', traverseAll: true, maxResults: 2 })
  t.deepEqual(result, [-4, 1])
})

test('evalutation with maxResults - preorder', t => {
  t.plan(1)
  const tree = h.buildTestTree(new ChooseIt())
  const result = tree.evaluate(11, { algorithm: 'DFS', traverseAll: false, maxResults: 2 })
  t.deepEqual(result, [1, 10])
})

test('evalutation with default parameters - postorder', t => {
  t.plan(1)
  const tree = h.buildTestTree(new ChooseIt())
  const result = tree.evaluate(1, { algorithm: 'DFS', order: 'LRN' })
  t.deepEqual(result, [-4, 9, 1])
})

test('evalutation with maxResults - postorder', t => {
  t.plan(1)
  const tree = h.buildTestTree(new ChooseIt())
  const result = tree.evaluate(1, { algorithm: 'DFS', order: 'LRN', maxResults: 1 })
  t.deepEqual(result, [-4])
})

test('evalutation with traverseAll true - postorder', t => {
  t.plan(1)
  const tree = h.buildTestTree(new ChooseIt())
  const result = tree.evaluate(1, { algorithm: 'DFS', order: 'LRN', traverseAll: true })
  t.deepEqual(result, [-4, 9, 1])
})

test('evalutation with traverseAll true and maxResults - postorder', t => {
  t.plan(1)
  const tree = h.buildTestTree(new ChooseIt())
  const result = tree.evaluate(1, { algorithm: 'DFS', order: 'LRN', traverseAll: true, maxResults: 2 })
  t.deepEqual(result, [-4, 9])
})
