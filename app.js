const express = require('express');
const app=express();
const path=require("path")
const session=require("express-session")
const flash = require('connect-flash');

const methodOverride = require("method-override")



//mongodb
require('./config/connection')();

const adminRouter=require("./router/admin");
const userRouter=require('./router/user');
const authRouter=require("./router/auth");
const homeRouter=require("./router/home")


app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'template')));
app.use(express.static(path.join(__dirname, 'usertemplate')));
app.use("/uploads", express.static("uploads"));
app.use("/categoryImages", express.static("categoryImages"));

app.set("view engine","ejs");
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use(session({
    secret:"your-secret-key",
    cookie:{maxAge:6000000}
}));

app.use(flash());
app.use(methodOverride("_method"))

app.use((req, res, next) => {
    res.header("Cache-Control", "no-store, no-cache, must-revalidate");
    next();
  });




app.use('/',userRouter)
app.use("/",adminRouter)
app.use("/",authRouter)
app.use("/",homeRouter)



app.listen(4000,()=>{
    console.log("http://localhost:4000")
});
