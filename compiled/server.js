require("source-map-support").install();
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/  // The module cache
/******/  var installedModules = {};
/******/
/******/  // The require function
/******/  function __webpack_require__(moduleId) {
/******/
/******/    // Check if module is in cache
/******/    if(installedModules[moduleId]) {
/******/      return installedModules[moduleId].exports;
/******/    }
/******/    // Create a new module (and put it into the cache)
/******/    var module = installedModules[moduleId] = {
/******/      i: moduleId,
/******/      l: false,
/******/      exports: {}
/******/    };
/******/
/******/    // Execute the module function
/******/    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/    // Flag the module as loaded
/******/    module.l = true;
/******/
/******/    // Return the exports of the module
/******/    return module.exports;
/******/  }
/******/
/******/
/******/  // expose the modules object (__webpack_modules__)
/******/  __webpack_require__.m = modules;
/******/
/******/  // expose the module cache
/******/  __webpack_require__.c = installedModules;
/******/
/******/  // define getter function for harmony exports
/******/  __webpack_require__.d = function(exports, name, getter) {
/******/    if(!__webpack_require__.o(exports, name)) {
/******/      Object.defineProperty(exports, name, {
/******/        configurable: false,
/******/        enumerable: true,
/******/        get: getter
/******/      });
/******/    }
/******/  };
/******/
/******/  // getDefaultExport function for compatibility with non-harmony modules
/******/  __webpack_require__.n = function(module) {
/******/    var getter = module && module.__esModule ?
/******/      function getDefault() { return module['default']; } :
/******/      function getModuleExports() { return module; };
/******/    __webpack_require__.d(getter, 'a', getter);
/******/    return getter;
/******/  };
/******/
/******/  // Object.prototype.hasOwnProperty.call
/******/  __webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/  // __webpack_public_path__
/******/  __webpack_require__.p = "/assets/";
/******/
/******/  // Load entry module and return exports
/******/  return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var ENV = exports.ENV = "development" || 'development';
var isProduction = exports.isProduction = ENV === 'production';
var isDebug = exports.isDebug = ENV === 'development';
var isClient = exports.isClient = typeof window !== 'undefined';
var isTest = exports.isTest = ENV === 'test';

var SCOPES = exports.SCOPES = 'read_orders,read_products';
var ACTIVATE_CHARGE_ROUTE = exports.ACTIVATE_CHARGE_ROUTE = '/activate_charge';
var APP_NAME = exports.APP_NAME = 'devapp999';
var APP_URL = exports.APP_URL = 'https://84c4484d.ngrok.io';
var APP_HOME_ROUTE = exports.APP_HOME_ROUTE = '/home';
var AUTH_CALLBACK_ROUTE = exports.AUTH_CALLBACK_ROUTE = '/auth/callback';
var INSTALL_PAGE = exports.INSTALL_PAGE = 'https://apps.shopify.com/' + APP_NAME;
var UNINSTALL_ROUTE = exports.UNINSTALL_ROUTE = '/uninstall';

var sessionSecret = exports.sessionSecret = process.env.SESSION_SECRET || 'Your Session Secret goes here';

var REDIS_URL = exports.REDIS_URL = process.env.REDIS_URL || 'redis://:@127.0.0.1:6379';

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("winston");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("express-session");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.session = exports.sequelize = exports.Models = exports.connect = undefined;

var _connect = __webpack_require__(19);

var _connect2 = _interopRequireDefault(_connect);

var _session = __webpack_require__(23);

var _session2 = _interopRequireDefault(_session);

var _models = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.connect = _connect2.default;
exports.Models = _models.Models;
exports.sequelize = _models.sequelize;
exports.session = _session2.default;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sequelize = exports.Models = undefined;

var _sequelize = __webpack_require__(20);

var _sequelize2 = _interopRequireDefault(_sequelize);

var _config = __webpack_require__(0);

var _sequelize_config = __webpack_require__(21);

var _sequelize_config2 = _interopRequireDefault(_sequelize_config);

var _shop = __webpack_require__(22);

var _shop2 = _interopRequireDefault(_shop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = _sequelize_config2.default[_config.ENV];

var db = {};

var dbUrl = process.env[config.use_env_variable];

var database = config.database,
    username = config.username,
    password = config.password;


var sequelize = dbUrl ? new _sequelize2.default(dbUrl) : new _sequelize2.default(database, username, password, config);

db.Shop = sequelize.import('Shop', _shop2.default);

Object.keys(db).forEach(function (modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

exports.Models = db;
exports.sequelize = sequelize;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _http = __webpack_require__(7);

var _http2 = _interopRequireDefault(_http);

var _app = __webpack_require__(8);

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Get port from environment and store in Express.
 */
var port = process.env.PORT || '3001';
_app2.default.set('port', port);

/**
 * Create HTTP server.
 */
var server = _http2.default.createServer(_app2.default);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);

console.log('--------------------------');
console.log('===> 😊  Starting Server . . .');
console.log('===>  Environment: ' + "development");
console.log('===>  Listening on port: ' + _app2.default.get('port'));
console.log('--------------------------');

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}

server.on('error', onError);
server.on('listening', onListening);

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
// import favicon from 'serve-favicon';


var _express = __webpack_require__(2);

var _express2 = _interopRequireDefault(_express);

var _path = __webpack_require__(9);

var _path2 = _interopRequireDefault(_path);

var _cookieParser = __webpack_require__(10);

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _bodyParser = __webpack_require__(11);

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _expressFlash = __webpack_require__(12);

var _expressFlash2 = _interopRequireDefault(_expressFlash);

var _fs = __webpack_require__(13);

var _fs2 = _interopRequireDefault(_fs);

var _methodOverride = __webpack_require__(14);

var _methodOverride2 = _interopRequireDefault(_methodOverride);

var _compression = __webpack_require__(15);

var _compression2 = _interopRequireDefault(_compression);

var _helmet = __webpack_require__(16);

var _helmet2 = _interopRequireDefault(_helmet);

var _morgan = __webpack_require__(17);

var _morgan2 = _interopRequireDefault(_morgan);

var _serializeJavascript = __webpack_require__(18);

var _serializeJavascript2 = _interopRequireDefault(_serializeJavascript);

var _expressSession = __webpack_require__(3);

var _expressSession2 = _interopRequireDefault(_expressSession);

var _winston = __webpack_require__(1);

var _winston2 = _interopRequireDefault(_winston);

var _config = __webpack_require__(0);

var _db = __webpack_require__(4);

var _shopify = __webpack_require__(25);

var _shopify2 = _interopRequireDefault(_shopify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// We configure dotenv as early as possible in the app
__webpack_require__(30).config();

// Connect database
(0, _db.connect)();

var SHOPIFY_API_KEY = process.env.SHOPIFY_API_KEY;


var app = (0, _express2.default)();

if (_config.ENV === 'production') {
  app.use((0, _compression2.default)());
  // Secure your Express apps by setting various HTTP headers. Documentation: https://github.com/helmetjs/helmet
  app.use((0, _helmet2.default)({
    frameguard: {
      action: 'allow-from',
      domain: 'https://myshopify.com'
    }
  }));
}

var env = {
  SHOPIFY_API_KEY: SHOPIFY_API_KEY
};

// view engine setup
app.set('views', _path2.default.join(__dirname, 'views'));
app.set('view engine', 'pug');

// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use((0, _morgan2.default)(_config.isDebug ? 'dev' : 'combined'));

var rawBodySaver = function rawBodySaver(req, res, buf, encoding) {
  if (buf && buf.length) {
    req.rawBody = buf.toString(encoding || 'utf8');
  }
};

app.use(_bodyParser2.default.json({ verify: rawBodySaver }));
app.use(_bodyParser2.default.urlencoded({ extended: false }));

app.use((0, _methodOverride2.default)());
app.use((0, _cookieParser2.default)());

var staticOptions = _config.isProduction && { index: '_' };
app.use(_express2.default.static(_path2.default.join(__dirname, '../react-ui/build'), staticOptions));

var sessionConfig = {
  resave: false,
  saveUninitialized: false,
  secret: _config.sessionSecret,
  proxy: true, // The "X-Forwarded-Proto" header will be used.
  name: 'sessionId',
  // Add HTTPOnly, Secure attributes on Session Cookie
  // If secure is set, and you access your site over HTTP, the cookie will not be set
  cookie: {
    httpOnly: true,
    secure: _config.ENV === 'production'
  },
  store: _db.session
};

app.use((0, _expressSession2.default)(sessionConfig));
app.use((0, _expressFlash2.default)());

app.use('/', (0, _shopify2.default)());

app.get('/api/products', function (req, res) {
  var shopify = req.shopify;


  shopify.product.list({ limit: 5 }).then(function (products) {
    res.status(200).json(products);
  });
});

app.get('*', function (req, res, next) {
  var _ref = req.session.shopify || {},
      shop = _ref.shop;

  var environment = _extends({}, env, { SHOP_ORIGIN: shop });

  _fs2.default.readFile(_path2.default.join(__dirname, '../react-ui/build/index.html'), 'utf8', function (err, content) {
    if (err) {
      return next(err);
    }

    // Inject environment variables (Shopify API key and shop) in client code,
    // to be usd by the embedded app
    var replacement = 'window.env = ' + (0, _serializeJavascript2.default)(environment);
    var result = content.replace('var __ENVIRONMENT__', replacement);
    return res.send(result);
  });
});

// eslint-disable-next-line no-unused-vars
app.use(function (err, req, res, next) {
  _winston2.default.error(err);
  var status = err.status || 500;

  res.status(status);
  res.render('' + status, {
    message: err.message,
    error: _config.isDebug && err.stack,
    APP_URL: _config.APP_URL
  });
});

exports.default = app;
/* WEBPACK VAR INJECTION */}.call(exports, "server"))

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("cookie-parser");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("express-flash");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("method-override");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("compression");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("helmet");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("serialize-javascript");

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _winston = __webpack_require__(1);

var _winston2 = _interopRequireDefault(_winston);

var _models = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  _models.sequelize.authenticate().then(function () {
    _winston2.default.info('Connection has been established successfully.');
  }).catch(function (err) {
    _winston2.default.error('Unable to connect to the database:', err);
  });
};

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("sequelize");

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = {"development":{"username":"postgres","password":"TechAdmin","database":"shopify-app-development","host":"127.0.0.1","dialect":"postgres"},"test":{"username":"postgres","password":"TechAdmin","database":"shopify-app-test","host":"127.0.0.1","dialect":"postgres","logging":false},"production":{"use_env_variable":"DATABASE_URL","username":"postgres","password":"TechAdmin","database":"shopify-app-production","host":"127.0.0.1","dialect":"postgres"}}

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  var Shop = sequelize.define('Shop', {
    domain: {
      type: DataTypes.STRING,
      unique: true
    },
    chargeId: {
      type: DataTypes.BIGINT,
      unique: true
    }
  }, {
    classMethods: {
      associate: function associate() {
        // associations can be defined here
      }
    }
  });
  return Shop;
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _expressSession = __webpack_require__(3);

var _expressSession2 = _interopRequireDefault(_expressSession);

var _connectRedis = __webpack_require__(24);

var _connectRedis2 = _interopRequireDefault(_connectRedis);

var _config = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RedisStore = (0, _connectRedis2.default)(_expressSession2.default);

var store = new RedisStore({
  url: _config.REDIS_URL,
  // We use the 2nd database in Redis (1) in test to be able to clean it.
  db: _config.isTest ? 1 : 0
});

store.on('connect', function () {
  console.log('===> \uD83D\uDE0A  Connected to Redis Server on ' + _config.REDIS_URL + '. . .');
});

exports.default = store;

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("connect-redis");

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = __webpack_require__(26);

var _lodash2 = _interopRequireDefault(_lodash);

var _crypto = __webpack_require__(27);

var _crypto2 = _interopRequireDefault(_crypto);

var _express = __webpack_require__(2);

var _express2 = _interopRequireDefault(_express);

var _shopifyToken = __webpack_require__(28);

var _shopifyToken2 = _interopRequireDefault(_shopifyToken);

var _shopifyApiNode = __webpack_require__(29);

var _shopifyApiNode2 = _interopRequireDefault(_shopifyApiNode);

var _winston = __webpack_require__(1);

var _winston2 = _interopRequireDefault(_winston);

var _config = __webpack_require__(0);

var _db = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Routes for express app
 */
var Shop = _db.Models.Shop;


var router = _express2.default.Router();

exports.default = function () {
  var _process$env = process.env,
      SHOPIFY_API_KEY = _process$env.SHOPIFY_API_KEY,
      SHOPIFY_API_SECRET = _process$env.SHOPIFY_API_SECRET;


  var getShopifyToken = function getShopifyToken() {
    return new _shopifyToken2.default({
      sharedSecret: SHOPIFY_API_SECRET,
      redirectUri: '' + _config.APP_URL + _config.AUTH_CALLBACK_ROUTE,
      scopes: _config.SCOPES,
      apiKey: SHOPIFY_API_KEY
    });
  };

  var getAppsHome = function getAppsHome(shop) {
    return 'https://' + shop + '/admin/apps/';
  };

  // The home page of the app in Shopify Admin
  var getEmbeddedAppHome = function getEmbeddedAppHome(shop) {
    return '' + getAppsHome(shop) + _config.APP_NAME;
  };

  /**
   * Authenticates the shop with Shopify when accessing protected routes.
   * Returns a template file that redirects to the Shopify authorization page.
   * This mechanism is used to authorize an embedded app.
   * We need custom Javascript to escape the iframe as described in the docs.
   * See the "shopify_redirect" template for details.
   */
  var authenticate = function authenticate(req, res) {
    var query = req.query,
        session = req.session;


    var shop = query.shop || req.body.shop;

    _winston2.default.info('Authenticating shop %s', shop);

    if (!shop) {
      res.redirect(_config.INSTALL_PAGE);
      return;
    }

    var shopifyToken = getShopifyToken();
    var nonce = shopifyToken.generateNonce();

    // Save the nonce to state to verify it in the callback route later on
    session.state = nonce;

    var shopName = shop.split('.')[0];

    var url = decodeURI(shopifyToken.generateAuthUrl(shopName, undefined, nonce));

    res.render('shopify_redirect', { url: url, shop: shop });
  };

  /**
   * Creates an interface for accessing the Shopify API.
   * @param session A Shopify session with shop domain and access token
   */
  var getShopifyApi = function getShopifyApi(session) {
    var _session$shopify = session.shopify,
        shopUrl = _session$shopify.shop,
        token = _session$shopify.token;


    return new _shopifyApiNode2.default({
      shopName: shopUrl.split('.')[0],
      accessToken: token
    });
  };

  /**
   * This method gets called when the app is installed.
   * Setup any webhooks or services you need on Shopify inside here.
   *
   * @param session New session
   */
  var afterShopifyAuth = function afterShopifyAuth(session) {
    var shopify = getShopifyApi(session);

    var webhook = {
      topic: 'app/uninstalled',
      address: '' + _config.APP_URL + _config.UNINSTALL_ROUTE,
      format: 'json'
    };

    shopify.webhook.create(webhook);
  };

  /**
   * Creates a new recurring application charge and redirects the mercant to
   * the confirmation screen.
   */
  var createRecurringApplicationCharge = function createRecurringApplicationCharge(req, res, next) {
    var shopify = req.shopify,
        shop = req.session.shopify.shop;


    var newCharge = {
      name: _config.APP_NAME,
      price: 9.99,
      return_url: '' + _config.APP_URL + _config.ACTIVATE_CHARGE_ROUTE,
      test: true,
      trial_days: 7
    };

    shopify.recurringApplicationCharge.create(newCharge).then(function (charge) {
      res.render('shopify_redirect', {
        url: charge.confirmation_url,
        shop: shop
      });
    }).catch(next);
  };

  var hasActiveRecurringApplicationCharge = function hasActiveRecurringApplicationCharge(shopify) {
    return shopify.recurringApplicationCharge.list().then(function (charges) {
      return _lodash2.default.find(charges, { status: 'active' });
    });
  };

  /**
   * Shopify calls this route after the merchant authorizes the app.
   * It needs to match the callback route that you set in app settings.
   */
  router.get(_config.AUTH_CALLBACK_ROUTE, function (req, res, next) {
    var query = req.query,
        session = req.session;
    var code = query.code,
        shop = query.shop,
        state = query.state;


    var shopifyToken = getShopifyToken();

    if (typeof state !== 'string' || state !== session.state || // Validate the state.
    !shopifyToken.verifyHmac(query) // Validate the hmac.
    ) {
        return res.status(400).send('Security checks failed');
      }

    // Exchange the authorization code for a permanent access token.
    return shopifyToken.getAccessToken(shop, code).then(function (token) {
      session.shopify = { shop: shop, token: token };

      return Shop.findOrCreate({
        where: {
          domain: shop
        }
      }).spread(function () {
        afterShopifyAuth(session);

        req.shopify = getShopifyApi(session);

        hasActiveRecurringApplicationCharge(req.shopify).then(function (isActive) {
          if (isActive) {
            return res.redirect(getEmbeddedAppHome(shop));
          }
          return createRecurringApplicationCharge(req, res, next);
        });
      });
    }).catch(next);
  });

  var verifyWebhookHMAC = function verifyWebhookHMAC(req) {
    var hmac = req.headers['x-shopify-hmac-sha256'];

    var digest = _crypto2.default.createHmac('SHA256', SHOPIFY_API_SECRET).update(req.rawBody).digest('base64');

    return digest === hmac;
  };

  /**
   * This endpoint recieves the uninstall webhook and cleans up data.
   * Add to this endpoint as your app stores more data. If you need to do a lot of work, return 200
   * right away and queue it as a worker job.
   */
  router.post(_config.UNINSTALL_ROUTE, function (req, res) {
    if (!verifyWebhookHMAC(req)) {
      res.status(401).send('Webhook HMAC Failed');
      return;
    }

    Shop.destroy({
      where: {
        domain: req.headers['x-shopify-shop-domain']
      }
    }).then(function () {
      res.status(200).send('Uninstalled');
    });
  });

  /**
   * This middleware checks if we have a session.
   * If so, it attaches the Shopify API to the request object.
   * If there is no session or we have a different shop,
   * we start the authentication process.
   */
  var authMiddleware = function authMiddleware(req, res, next) {
    _winston2.default.info('Checking for valid session: ' + req.query.shop);
    var session = req.session,
        shop = req.query.shop;


    if (!session.shopify || shop && session.shopify.shop !== shop) {
      delete session.shopify;
      authenticate(req, res);
      return;
    }

    req.shopify = getShopifyApi(session);
    next();
  };

  router.use(authMiddleware);

  /*
   * Shopify calls this route when the merchant accepts or declines the charge.
   */
  router.get('/activate_charge', function (req, res, next) {
    var recurringApplicationCharge = req.shopify.recurringApplicationCharge,
        chargeId = req.query.charge_id,
        shop = req.session.shopify.shop;


    recurringApplicationCharge.get(chargeId).then(function (charge) {
      if (charge.status === 'accepted') {
        return recurringApplicationCharge.activate(chargeId).then(function () {
          return (
            // We redirect to the home page of the app in Shopify admin
            res.redirect(getEmbeddedAppHome(shop))
          );
        });
      }
      res.status(401);
      return res.render('charge_declined', { APP_URL: _config.APP_URL });
    }).catch(next);
  });

  router.get('/logout', function (req, res) {
    var shop = req.session.shopify.shop;


    delete req.session.shopify;

    res.redirect(getAppsHome(shop));
  });

  router.get('/api/orders', function (req, res) {
    var shopify = req.shopify;


    shopify.order.list({ limit: 5 }).then(function (orders) {
      res.status(200).json(orders);
    });
  });

  /**
   * Checks if we have an active application charge.
   * This middleware is active when the app is initially loaded.
   */
  var checkActiveRecurringApplicationCharge = function checkActiveRecurringApplicationCharge(req, res, next) {
    _winston2.default.info('Checking for active application charge: ' + req.query.shop);
    var shopify = req.shopify;


    hasActiveRecurringApplicationCharge(shopify).then(function (isActive) {
      if (!isActive) {
        _winston2.default.info('No active charge found: ' + req.query.shop);
        createRecurringApplicationCharge(req, res);
        return;
      }
      next();
    });
  };

  /*
   * Checks if the session is still valid by making a basic API call, as described in:
   * https://stackoverflow.com/questions/14418415/shopify-how-can-i-handle-an-uninstall-followed-by-an-instant-re-install
   */
  var checkForValidSession = function checkForValidSession(req, res, next) {
    _winston2.default.info('Checking if the session is still valid: ' + req.query.shop);
    var session = req.session,
        shopify = req.shopify;


    return shopify.shop.get().then(function () {
      return next();
    }).catch(function () {
      // Destroy the Shopify reference
      delete session.shopify;
      authenticate(req, res);
    });
  };

  router.get(_config.APP_HOME_ROUTE, checkForValidSession, checkActiveRecurringApplicationCharge, function (req, res) {
    res.redirect('/');
  });

  return router;
};

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = require("shopify-token");

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = require("shopify-api-node");

/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ })
/******/ ]);
//# sourceMappingURL=server.dev.js.map