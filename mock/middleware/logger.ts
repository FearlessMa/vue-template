import * as Koa from 'koa';

interface INext {
  (): Promise<any>
}

function log(ctx: Koa.Context): void {
  console.log('ctx: ', ctx.request.body);
  // console.log('URL: ', ctx.URL);
  console.log('href: ', ctx.href);
  // console.log('url: ', ctx.url);
  // console.log('originalUrl: ', ctx.originalUrl);
  // console.log('querystring: ', ctx.querystring);
  // console.log('query: ', ctx.query);
  // console.log('search: ', ctx.search);
  // console.log('host: ', ctx.host);
  // console.log('hostname: ', ctx.hostname);
  // console.log('charset: ', ctx.charset);
  console.log('path: ', ctx.path);
  console.log('method: ', ctx.method);
  // console.log('state: ', ctx.state);
  // console.log('app: ', ctx.app); //Koa 实例
  console.log('cookies  U: ', ctx.cookies.get('U'));
  // console.log('headers: ', ctx.headers); 
  // console.log('length: ', ctx.length);
  // console.log('fresh: ', ctx.fresh);
  // console.log('protocol: ', ctx.protocol);
  // console.log('ip: ', ctx.ip);
  //response
  // console.log('status: ', ctx.status);  //默认404
  // console.log('message: ', ctx.message);  //默认与404对应
}

export default function (): Koa.Middleware {
  return async (ctx: Koa.Context, next: INext): Promise<any> => {
    log(ctx);
    await next();
  }
}