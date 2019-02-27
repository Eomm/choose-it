'use strict'

const t = require('tap')
const ChooseIt = require('../')
const h = require('./helper')
const test = t.test

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

test('evalutation with traverseAll true and maxResults - preorder', t => {
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
