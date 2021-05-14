import * as Koa from 'koa';
import * as Router from 'koa-router';


const home: Router = new Router();
const fn = async (ctx: Koa.Context, next) => {
  ctx.status = 200;
  ctx.body = {
    code: 0,
    data:{
      message: 'success'
    }
  };
  await next();
}
home.get('/', fn);
home.post('/', fn);

export default home;