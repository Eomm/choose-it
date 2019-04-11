'use strict'

const t = require('tap')
const ChooseIt = require('../')
// const h = require('./helper')
const test = t.test

test('addCriteria return a new graph node', t => {
  t.plan(4)
  const use = new ChooseIt()
  const graphOptions = {
    resource: { res: 'hello' },
    weight: 42
  }
  const newNode = use.addCriteria(() => true, graphOptions)

  t.notOk(Object.is(use, newNode), 'addCriteria must return a new node')
  t.equals(newNode.weight, graphOptions.weight)
  t.deepEquals(newNode.resource, graphOptions.resource)
  t.ok(Object.is(newNode.resource, graphOptions.resource), 'the resource is not cloned')
})

test('compose graph')

test('search shortest path on graph')

test('error with wrong search settings')
