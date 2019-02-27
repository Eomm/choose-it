'use strict'

const t = require('tap')
const UseIt = require('../')
const h = require('./helper')
const test = t.test

test('new UseIt error', t => {
  t.plan(4);

  [null, undefined, 'str', 42].forEach(e => {
    t.throws(() => UseIt(e), 'new UseIt must accept only functions')
  })
})

test('addCriteria return a new node', t => {
  t.plan(1)
  const use = new UseIt()
  const newNode = use.addCriteria(() => true)

  t.notOk(Object.is(use, newNode), 'addCriteria must return a new node')
})

test('addCriteria chain', t => {
  t.plan(3)
  const use = new UseIt()
  use.addCriteria(() => true)
    .addCriteria(() => true)
    .addCriteria(() => true)

  t.equals(use.children.length, 1)
  t.equals(use.children[0].children.length, 1)
  t.equals(use.children[0].children[0].children.length, 1)
})

test('addCriteria error', t => {
  t.plan(4);

  [null, undefined, 'str', 42].forEach(e => {
    t.throws(() => {
      const use = new UseIt()
      use.addCriteria(e)
    }, 'addCriteria must accept only functions')
  })
})

test('addSiblingCriteria return a new node', t => {
  t.plan(1)
  const use = new UseIt()
  const newNode = use
    .addCriteria(() => true)
    .addSiblingCriteria(() => true)

  t.notOk(Object.is(use, newNode), 'addSiblingCriteria must return a new node')
})

test('addSiblingCriteria chain', t => {
  t.plan(4)
  const use = new UseIt()
  use.addCriteria(() => true)
    .addSiblingCriteria(() => true)
    .addCriteria(() => true)

  t.equals(use.children.length, 2)
  t.equals(use.children[0].children.length, 0)
  t.equals(use.children[1].children.length, 1)
  t.equals(use.children[1].children[0].children.length, 0)
})

test('addSiblingCriteria on root', t => {
  t.plan(1)
  t.throws(() => {
    const use = new UseIt()
    use.addSiblingCriteria(() => true)
  })
})

test('toJSON must return a simple tree', t => {
  t.plan(1)
  const tree = h.buildTestTree(new UseIt())

  const simpleTree = {
    criteria: /:*/,
    resource: undefined,
    nodes: [
      {
        criteria: 'i < 0',
        resource: -1,
        nodes: [
          { criteria: 'i < -5', resource: -5, nodes: [] },
          { criteria: 'i > -5', resource: -4, nodes: [] }
        ]
      },
      {
        criteria: 'i == 0',
        resource: 0,
        nodes: [{ criteria: 'i <= 0', resource: -10, nodes: [] }]
      },
      {
        criteria: 'i > 0',
        resource: 1,
        nodes: [
          {
            criteria: 'i > 10',
            resource: 10,
            nodes: [{ criteria: 'i > 6', resource: 7, nodes: [] }]
          },
          { criteria: 'i < 10', resource: 9, nodes: [] },
          { criteria: 'i > 99', resource: 100, nodes: [] }
        ]
      }
    ]
  }

  t.like(tree.toJSON(), simpleTree)
})

test('clear', t => {
  t.plan(4)
  const use = new UseIt()
  const child = use.addCriteria(() => true)

  t.equals(use.children.length, 1)
  t.equals(child.parent, use)

  use.clear()

  t.equals(use.children.length, 0)
  t.equals(child.parent, undefined)
})

test('evaluate with wrong algorithm settings', t => {
  t.plan(1)
  t.throws(() => {
    const use = new UseIt()
    use.evaluate(1, { algorithm: 'NONE' })
  })
})

test('prettyPrint', t => {
  t.plan(1)
  t.doesNotThrow(() => {
    const tree = h.buildTestTree(new UseIt())
    tree.prettyPrint()
  })
})
