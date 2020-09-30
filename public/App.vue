<template>
  <div id="app">

    <div id="dev">
      <pre > {{ dev }}</pre>
      <hr :id="dev.someString">
    </div>

    <div id="stg">
      <pre > {{ stg}}</pre>
      <hr :id="stg.someString">
    </div>

    <div id="prod">
      <pre > {{ prod }}</pre>
      <hr :id="prod.someString">
    </div>

    <div id="development">
        <pre > {{ development }}</pre>
        <hr :id="development.someString">
    </div>

    <div id="staging">
        <pre > {{ staging }}</pre>
        <hr :id="staging.someString">
    </div>

    <div id="production">
        <pre > {{ production }}</pre>
        <hr :id="production.someString">
    </div>

    <div id="overWriteDefault">
        <pre > {{ overWrite }}</pre>
        <hr :id="production.someString">
    </div>
  </div>
</template>

<script>
import   DOptions   from '../src/index.js'


const validationMap = {
  someString  : String,
  someNumber  : Number,
  someObject  : Object,
  someArray   : Array,
  someBoolean : Boolean,
  someFunction: Function
}

const dev = {
  someString  : 'dev',
  someNumber  : 5,
  someObject  : {},
  someArray   : [],
  someBoolean : true,
  someFunction: () => true
}

const stg = { ...dev, ...{ someString: 'stg' }  }

const prod = { ...dev, ...{ someString: 'stg' } }

const environments  = { prod, stg, dev }

export default {
  name: 'app',
  data: () => ({ overWrite: false, options: {}, dev: false, stg: false, prod: false, development: false, staging: false, production: false }),
  mounted
}

function mounted(){
  let force = 'dev'

  this.dev = { ...(new DOptions({ environments, validationMap, force })).get({ someString: 'xdev' }) }

  force = 'stg'
  this.stg = { ...(new DOptions({ environments, validationMap, force })).get({ someString: 'xstg' }) }


  force = 'prod'
  this.prod = { ...(new DOptions({ environments, validationMap, force })).get({ someString: 'xprod' }) }

  force = 'development'
  this.development = { ...(new DOptions({ environments, validationMap, force })).get({ someString: 'xdevelopment' }) }

  force = 'staging'
  this.staging = { ...(new DOptions({ environments, validationMap, force })).get({ someString: 'xstaging' }) }

  force = 'production'
  this.production = { ...(new DOptions({ environments, validationMap, force })).get({ someString: 'xproduction' }) }

  force = 'production'
  this.overWrite = { ...(new DOptions({ environments, validationMap, force })).get({ someString: 'xproduction' }) }
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;
  margin-top: 60px;
}
</style>
