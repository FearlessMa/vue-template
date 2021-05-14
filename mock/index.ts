// import Koa = require('koa');
import * as Koa from 'koa';
import koaBodyparser = require('koa-bodyparser');
import logger from './middleware/logger';
import { getFile, getFileName } from './utils';
import * as Router from 'koa-router';
import { urlMap, serverConfig } from './config/urlMap';
const app: Koa = new Koa();
const router: Router = new Router();

app.use(koaBodyparser());
app.use(logger());

//获取router下的所有文件路径
const rootPath = __dirname;
const routerPath: string = rootPath + serverConfig.routerPath;
const routerFileNames: Array<string> = getFile(routerPath);
//设置koa路由
routerFileNames.forEach((path: string) => {
  let fileName: string = getFileName(path);
  let requestUrl: string = urlMap[fileName];
  if (requestUrl) {
    let module = require(routerPath + '/' + path).default;
    router.use(requestUrl, module.routes(), module.allowedMethods());
  }
})

app.use(router.routes());

app.listen(serverConfig.port, (): void => {
  console.log('server is running', 'http://127.0.0.1:' + serverConfig.port);
});
