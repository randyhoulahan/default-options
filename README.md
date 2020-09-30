---
sidebarDepth: 2
---
# Default Options Service

## Description

A service that assists in creating and validating component options.  Option sets based on env dev, stg, production can be configured.

## Install

```bash
yarn add @houlagins/default-options

#OR 

npm install @houlagins/default-options
```

## API

### setDefaultOptions
```js
const environments  = { prod, stg, dev }
const validationMap = { expiry: Number, name: String, apisUrls: Object, dataSources: Array, version: String }

setDefaultOptions({ environments, validationMap, name: libName }, libName)
```
### getDefaultOptionsFunction

```js
Once the options are set for the component, export the function that returns the components options based on the env
...
export getDefaultOptionsFunction(libName)
```

```js
import getDefaultOptions from './default-options.mjs'

const forceEnv = 'dev' // otherwise will look for NODE_ENV and defaults to production

getDefaultOptions({/* over write defaults*/}, forceEnv)
```