# choose-it

[![Coverage Status](https://coveralls.io/repos/github/Eomm/choose-it/badge.svg?branch=master)](https://coveralls.io/github/Eomm/choose-it?branch=master)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

This module let you focus on the business logic instead of going crazy in a `if/else` jungle 🐵🌴🌴

An example use case is when you have a set of databases connections that are not configured as cluster,
or simply some settings you need to use based on some logic of your company.

In this case you have to write always the same `if` conditions to pick one of those resources.

`choose-it` will solve this problem!


## Installation

```
npm install choose-it
```


## Usage

```js
const ChooseIt = require('choose-it')

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

// View your tree
resouceChooser.prettyPrint()
// function noop () { return true }
// ├── (item) => item.admin === true [object Object]
// └─┬ (item) => item.guest === true [object Object]
//   └── (item) => item.external === true [object Object]


// View your tree with a custom output
resouceChooser.prettyPrint((criteria, resource = {}) => `${criteria.toString()} = Resource [${resource.viewAll}]`)
// function noop () { return true } = undefined
// ├── (item) => item.admin === true = true
// └─┬ (item) => item.guest === true = false
//   └── (item) => item.external === true = false

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
```


# API

Choose-it implement a Generic Tree under the hood that you can visualize like this:

![Tree Image](https://mermaidjs.github.io/mermaid-live-editor/#/view/eyJjb2RlIjoiZ3JhcGggVEQ7XG5ST09UKChSb290KSktLT5BKChpPDApKTtcblJPT1QtLT5CKChpPT0wKSk7XG5ST09ULS0-QygoaT4wKSk7XG5BLS0-QTEoKGk8LTUpKTtcbkEtLT5BMigoaT4tNSkpO1xuQi0tPkIxKChpPD0xMCkpO1xuQy0tPkMxKChpPjEwKSk7XG5DLS0-QzIoKGk8MTApKTtcbkMtLT5DMygoaT4xMDApKTtcbkMxLS0-QzExKChpPjYpKTsiLCJtZXJtYWlkIjp7InRoZW1lIjoiZGVmYXVsdCJ9fQ)

Default options:

```js
{
  traverseAll: false,
  maxResults: 0, // 0 = disabled
  algorithm: 'BFS', // [BFS, DFS]
  order: 'NLR' // when DFS: [NLR, LRN]
}
```


## Roadmap

⬜ Docs

⬜ Emit events `onAdd`, `onFind`, `onMax`, `onEnd`

⬜ Manage Promise in Criteria

⬜ Performance
