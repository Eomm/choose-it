'use strict'

const t = require('tap')
const ChooseIt = require('../')
const test = t.test

test('Example in README must works', t => {
  t.plan(1)
  // const ChooseIt = require('choose-it')

  const exampleConfig = {
    admin: {
      viewAll: true
    },
    external: {
      viewAll: false,
      login: 'http://external.login.log'
    },
    guest: {
      viewAll: false,
      login: 'http://login.log'
    }
  }
  const resouceChooser = new ChooseIt()

  // Optionally, assign a "resource" to a Criteria
  resouceChooser.addCriteria((item) => item.admin === true, exampleConfig.admin)

  // You can chain the Criteria to build sub-conditions
  resouceChooser.addCriteria((item) => item.guest === true, exampleConfig.guest)
    .addCriteria((item) => item.external === true, exampleConfig.external)

  // Assign a node to a variable to use it later
  const myNode = resouceChooser.addCriteria((item) => item.power === false, { noPower: true })

  // Add a sibling node. You can't call this method on the root node!
  myNode.addSiblingCriteria((item) => item.power === true, { gotThePower: true })

  // View your tree
  resouceChooser.prettyPrint()
  // function noop () { return true }
  // ├── (item) => item.admin === true [object Object]
  // ├─┬ (item) => item.guest === true [object Object]
  // │ └── (item) => item.external === true [object Object]
  // ├── (item) => item.power === false [object Object]
  // └── (item) => item.power === true [object Object]

  // View your tree with a custom output
  resouceChooser.prettyPrint((criteria, resource = '') => `${criteria.toString()} = Resource [${resource.viewAll}]`)
  // function noop () { return true } = Resource [undefined]
  // ├── (item) => item.admin === true = Resource [true]
  // ├─┬ (item) => item.guest === true = Resource [false]
  // │ └── (item) => item.external === true = Resource [false]
  // ├── (item) => item.power === false = Resource [undefined]
  // └── (item) => item.power === true = Resource [undefined]

  const user = {
    guest: true,
    external: true
  }

  const res = resouceChooser.evaluate(user)
  console.log(res)
  /** It will print out:
   [
      { viewAll: false, login: 'http://login.log' },
      { viewAll: false, login: 'http://external.login.log' }
   ]
  */

  const needOnlyOne = resouceChooser.evaluate(user, { maxResults: 1 })
  console.log(needOnlyOne)
  /** It will print out:
   * [ { viewAll: false, login: 'http://login.log' } ]
   */

  t.strictSame(res, [
    { viewAll: false, login: 'http://login.log' },
    { viewAll: false, login: 'http://external.login.log' }
  ])
})
