const express = require('express'),
      path = require('path'),
      http = require('http'),
      favicon = require('serve-favicon'),
      logger = require('morgan'),
      cookieParser = require('cookie-parser'),
      bodyParser = require('body-parser'),
      passport = require('passport'),
      cors = require('cors'),
      keys = require('./config/keys'),
      expressSession = require('express-session'),
      MongoStore = require('connect-mongo')(expressSession);

var index = require('./routes/index'),
    users = require('./routes/users'),
    login = require('./routes/authRoutes/login'),
    signup = require('./routes/authRoutes/signup'),
    authentication = require('./services/authentication'),
    fileOperations = require('./routes/utils/file-operantions'),
    userProfile = require('./routes/utils/userProfile'),
    star = require('./routes/user/starring'),
    filelist = require('./routes/filesDirectoriesRoute/listDirectories'),
    uploadFile = require('./routes/filesDirectoriesRoute/uploadFile'),
    permissions = require('./routes/filesDirectoriesRoute/permissions'),
    dirLogs = require('./routes/filesDirectoriesRoute/directoriesLogging'),
    usergroups = require('./routes/user/usergroup');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
const corsOptions = {
    origin: keys.CLIENT_URL,
    credentials: true
};

app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSession({
    secret:keys.EXPRESS_SESSION_SECRET,
    resave:false,
    saveUninitialized: false,
    duration: 30*60*1000, //30 mins
    activeDuration: 30*1000, //30 seconds
    cookie: { secure: false,
        httpOnly: false},
    store: new MongoStore({url: keys.MONGO_URL})
}));

app.use(passport.initialize());
require('./routes/authRoutes/passport')(passport);
app.use(passport.session());

app.get('/users', users.list);

app.post('/afterSignUp', signup.afterSignUp);

app.post('/getDir',authentication.requireLogin, filelist.listdir);
app.get('/getDir',authentication.requireLogin, filelist.listdir);
app.post('/uploadFile',authentication.requireLogin, uploadFile);
app.post('/mkdir',authentication.requireLogin,fileOperations.mkdir);
app.post('/delDir',authentication.requireLogin,fileOperations.delDir);
app.post('/unstar',authentication.requireLogin,star.UnStarDir);
app.post('/star',authentication.requireLogin,star.setStaredDir);
app.post('/logout',authentication.requireLogin,login.signout);
app.post('/getUserLogs',authentication.requireLogin,dirLogs.getUserLoggings);
app.post('/setUserProfile',authentication.requireLogin,userProfile.updateUserProfileDataReq);
app.post('/getUserProfile',authentication.requireLogin,userProfile.getUserProfileDataReq);
app.post('/validateEmails',authentication.requireLogin,permissions.validateEmails);
app.post('/shareFile',authentication.requireLogin,permissions.shareFile);
app.post('/download',fileOperations.download );
app.post('/login',login.signin);
app.post('/logout',authentication.requireLogin,login.signout);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.log(err);

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
