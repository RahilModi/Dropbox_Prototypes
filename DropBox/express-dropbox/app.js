var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    multer = require('multer'),
    cookieSession = require('cookie-session');

const keys = require('./config/key');

var index = require('./routes/index'),
    user = require('./routes/user'),
    login = require('./routes/AuthRoutes/login'),
    signup = require('./routes/AuthRoutes/signup'),
    activity = require('./routes/ActivitiesRoute/activity'),
    files = require('./routes/FilesRoute'),
    folder = require('./routes/FolderRoutes'),
    uploadfiles = require('./routes/uploadFile');


const app = express();
//Enable CORS
app.use(cors());
app.use(
    cookieSession({
        name:'session',
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.COOKIE_KEY]
    })
);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/user', user);
app.use('/login', login);
app.use('/signup', signup);
app.use('/activity', activity);
app.use('/files', files);
app.use('/folder',folder);
app.use('/uploadFiles',uploadfiles);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

module.exports = app;
