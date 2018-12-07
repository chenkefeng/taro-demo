import SDUtils from 'sudao-utils'

const {ApiConfig, AppEnvironment} = SDUtils

let appEnv = AppEnvironment.DEVELOP

ApiConfig.baseURL = (_: string): string => {
  if (appEnv == AppEnvironment.DEVELOP) {         //   开发环境
    return 'https://beibeibang.com.cn/api/sloop/'
  } else if (appEnv == AppEnvironment.TRIAL) {    //   体验环境
    return 'https://beibeibang.com.cn/api/sloop/'
  } else if (appEnv == AppEnvironment.RELEASE) {  //   生产环境
    return 'https://beibeibang.com.cn/api/sloop/'
  }
  return ''
}
