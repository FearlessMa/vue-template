
interface IUrlMap {
  [name: string]: string
}
const serverConfig = {
  port: 9000,
  routerPath: '/router',
};
const urlMap: IUrlMap = {
  home: '/',
  userInfo:'/user/info',
  login:'/user/login'
}

export {
  urlMap,
  serverConfig
}
