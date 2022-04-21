const Koa=require("koa");
const router=require("koa-router")();
const bodyParser = require('koa-bodyparser');

const app=new Koa();

const storage={ping:'pong'};

app.use(bodyParser());
app.use(async (ctx,next)=>{
    ctx.set("Access-Control-Allow-Origin",ctx.header.origin||"*");
    ctx.set("Access-Control-Allow-Credentials","true");
    ctx.set("Access-Control-Allow-Headers","*");
    if (ctx.method === 'OPTIONS') {
        ctx.body = 200;
    } else {
        await next();
    }
});

router.get("/get/:key",async (ctx,next)=> {
    if(ctx.params.key==='json')
        ctx.body=JSON.stringify(storage);
    else
        ctx.body=storage[ctx.params.key];
    await next();
});

router.get("/set/:key",async (ctx,next)=> {
    storage[ctx.params.key]=decodeURIComponent(ctx.querystring);
    console.log(ctx.params.key,decodeURIComponent(ctx.querystring));
    ctx.body='success';
    await next();
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(8899);
console.log("Listen on "+8899);