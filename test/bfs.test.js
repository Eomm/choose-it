'use strict'

const t = require('tap')
const ChooseIt = require('../')
const h = require('./helper')
const test = t.test

test('call directly breadthFirstSearch method without options', t => {
  t.plan(1)
  const tree = h.buildTestTree(new ChooseIt())
  const result = tree.breadthFirstSearch(1)
  t.deepEqual(result, [1, 9])
})

test('call directly breadthFirstSearch method with options', t => {
  t.plan(1)
  const tree = h.buildTestTree(new ChooseIt())
  const result = tree.breadthFirstSearch(1, { maxResults: -1 })
  t.deepEqual(result, [1, 9])
})

test('evalutation with default parameters', t => {
  t.plan(1)
  const tree = h.buildTestTree(new ChooseIt())
  const result = tree.evaluate(1)
  t.deepEqual(result, [1, 9])
})

test('evalutation with maxResults', t => {
  t.plan(1)
  const tree = h.buildTestTree(new ChooseIt())
  const result = tree.evaluate(1, { maxResults: 1 })
  t.deepEqual(result, [1])
})

test('evalutation with traverseAll true', t => {
  t.plan(1)
  const tree = h.buildTestTree(new ChooseIt())
  const result = tree.evaluate(1, { traverseAll: true })
  t.deepEqual(result, [1, -4, 9])
})

test('evalutation with traverseAll true and maxResults', t => {
  t.plan(1)
  const tree = h.buildTestTree(new ChooseIt())
  const result = tree.evaluate(1, { traverseAll: true, maxResults: 2 })
  t.deepEqual(result, [1, -4])
})
