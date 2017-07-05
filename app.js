
const koa = require('koa');
const app = new koa();
const logger = require('koa-logger');
const server = require('koa-static');
const render = require('koa-swig');
const koaBody = require('koa-body');
const session = require('koa-session2');
const co = require('co');
const router = require('koa-router')();
const favicon = require('koa-favicon');
const cluster = require('cluster');
import handleRender from './reactRender';
import films from './datas/detail.json'

app.use(logger());
app.use(session({
    key:'sessionID',
    maxAge:1000*60*30
}));

// parse request
app.use(koaBody({ 
    jsonLimit:1024*1024*5,
    formLimit:1024*1024*5,
    textLimit:1024*1024*5,
    formidable: { uploadDir: __dirname + '/build/upload' } 
}));


// set static directiory
app.use(server(__dirname + '/build'));
// favicon
// app.use(favicon(__dirname + '/public/favicon.ico'));

// add the route
router.get('/', (ctx, next) => {
        ctx.body= handleRender();
    })
    .get('/film',async (ctx,next)=>{
        let id=ctx.query.id;
        if(!id){
            ctx.body=await {
                status:-1,
                msg:'id is null or empty'
            };
            return;
        }
        let rets=films.filter(item=>item.id==id);
        if(!rets.length){
            ctx.body=await {
                status:-1,
                msg:`the film which id is ${id} is empty`
            };
            return;
        }
        ctx.body=await {
            status:0,
            film:rets[0],
            msg:'success !'
        };
    });

app.use(router.routes())
   .use(router.allowedMethods());

app.on('error', (err, ctx) => {
        ctx.status = 500;
        ctx.statusText = 'Internal Server Error';
    if (process.env.NODE_ENV === 'develop') { //throw the error to frontEnd when in the develop mode
        ctx.res.end(err.message); //finish the response
    }
});

// deal 404
app.use(async(ctx, next) => {
    ctx.status = 404;
    ctx.body = await ctx.res.end('404');
});

module.exports=app;

