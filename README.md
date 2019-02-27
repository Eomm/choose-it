# use-it

This module let you focus on the business logic instead of going crazy in a `if/else` jungle 🐵🌴

An example use case is when you have a set of databases connections that are not configured as cluster,
or simply some settings you need to use based on some logic of your company.

In this case you have to write always the same `if` conditions to pick one of those resources.

`use-it` will solve this problem!

## Usage

```js
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


const UseIt = require('use-it')
const resouceChooser = new UseIt()

resouceChooser.addCriteria((item) => item.admin === true, exampleConfig.admin)

// You can chain the Criteria to build sub-conditions
resouceChooser.addCriteria((item) => item.guest === true, exampleConfig.guest)
              .addCriteria((item) => item.external === true, exampleConfig.external)

const user = {
  guest: true,
  external: true
}

const res = resouceChooser.evaluate(user)
console.log(res)
/** It will print out
   [ 
      { viewAll: false, login: 'http://login.log' },
      { viewAll: false, login: 'http://external.login.log' } 
   ]
*/
```

# API

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

[] Docs
[] Emit events `onAdd`, `onFind`, `onMax`, `onEnd`
[] Manage Primise Criteria
[] Performance
