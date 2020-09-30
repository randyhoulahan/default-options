const dev   = { basePath: '/' }
const stg   = { ...dev }
const prod  = { ...stg }

const ENVS   = { dev, stg, prod }
const V_MAP  = { basePath: String }

export const globalDefaultOptions = {}

export default class DefaultOptions{
  constructor({ environments, validationMap, forceEnv, name }){
    environments   = assignEnvironments(environments)

    validationMap  = Object.assign(V_MAP, validationMap)
    
    this.props     = { environments, validationMap, forceEnv, name }
  }

  get(userOpts={}, env=this.env){
    const { environments } = this.props

    for(const propName in userOpts)
      environments[env][propName] = userOpts[propName]
    
    this.validate(environments[env])

    return environments[env]
  }

  get env (){
    if(this.props.forceEnv) return this.props.forceEnv
    if(isServer() && (typeof process !== 'undefined' && process.env)) return process.env.NODE_ENV || 'prod'

    return getEnvClient()
  }

  validate(opts){ return validate(opts, this.props.validationMap) }
}

export const setDefaultOptions = ({ environments, validationMap, forceEnv, name }, nameSpace = name) => {
  if(!nameSpace) throw new Error(' @houlagins/default-options.setDefaultOptions: no name/nameSpace passed to setDefaultOptions')

  globalDefaultOptions[nameSpace] = new DefaultOptions({ environments, validationMap, forceEnv, name })
}

export const getDefaultOptionsFunction = (nameSpace) => (userOpts={}, forceEnv) => globalDefaultOptions[nameSpace].get(userOpts, forceEnv)

export const validateOptions = validate


function getEnvClient(){
  const thisHost = window.location.href

  if(stg.hostname && thisHost.includes(stg.hostname)) return 'stg'
  if(dev.hostname && thisHost.includes(dev.hostname))      return 'dev'
  if(prod.hostname && thisHost.includes(prod.hostname))     return 'prod'

  return 'prod'
}

function isServer(){ return typeof window === 'undefined' }

function validate (opts, vMap){
  for (const key in opts){
    const rType = opts[key].constructor? opts[key].constructor : (typeof opts[key] === 'object')? Object : undefined
    const eType = vMap[key]
    

    if(!Object.keys(vMap).includes(key)) unknownKeyError(opts, key)

    if(rType !== eType)  errorUnknownType(key, rType.name, eType.name)
  }
}

function unknownKeyError (options, key){
  throw new Error(`${key} not permitted in  component: options`)
}

function errorUnknownType (key, rType, eType){
  throw new Error(`${key} has incorrect type.  Received: ${rType} Expected: ${eType}`)
}

function assignEnvironments(environments){
  const dev  = Object.assign({}, ENVS.dev, environments.dev   || environments.development || {})
  const stg  = Object.assign({}, ENVS.stg, environments.stg   || environments.staging     || {})
  const prod = Object.assign({}, ENVS.prod, environments.prod || environments.production  || {})

  const development = dev
  const staging     = stg
  const production  = prod
  
  return { development, dev, staging, stg, production, prod }
}