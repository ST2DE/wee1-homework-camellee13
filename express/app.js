// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

// var app = express();



// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// module.exports = app;



const express = require ('express');
const app = express();
var path = require('path');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));


// app.use('/about_me', express.static("demo"));

app.get('/', function(req, res){
	res.send('Hello!');
});

app.get('/about_me', function(req, res) {
	var name = req.query.name;  // 取網址上面帶的 name 參數
    if(req.query.name === undefined) // 如果沒有帶參數的話，就把名稱改成訪客
      name = 'Visitor'; 
    res.render('about_me', {name: name}); // 將 name 變數丟到 index template 中
});

app.listen(3000, function (){
	console.log('Example app is running on port 3000!');
});

module.exports = app;