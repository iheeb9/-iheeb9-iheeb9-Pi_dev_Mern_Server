require('dotenv').config()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose=require('mongoose')
const cors =require('cors')


var app = express();
  
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use ('/api',require('./routes/authRouter'));

app.use ('/api',require('./routes/commentRouter'));
app.use ('/api',require('./routes/sharedpostRouter'));
app.use ('/api',require('./routes/postRouter'));
app.use ('/api',require('./routes/userRouter'));
// app.use ('/api',require('./routes/commentRouter'));
// app.use ('/api',require('./routes/postRouter'));

app.use('/api/product',require('./routes/productrouter'));
app.use('/category',require('./routes/categoryrouter'))



app.use(cors);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const uri=process.env.MONGODB_URL
mongoose.connect(
  uri,
  {  useNewUrlParser:true ,
    useUnifiedTopology: true,
  },
  ()=>
  console.log("connected to mongodb")
)
module.exports = app;
