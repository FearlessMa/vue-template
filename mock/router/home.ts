import * as Koa from 'koa';
import * as Router from 'koa-router';


const home: Router = new Router();
const fn = async (ctx: Koa.Context, next) => {
  ctx.status = 200;
  ctx.body = 'mock server is start !';
  await next();
}
home.get('/', fn);

export default home;