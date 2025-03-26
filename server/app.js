var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, PATCH, POST, DELETE');
  next();
});

app.use('/products', require('./routes/productRoutes'));
app.use('/user', require('./routes/userRoutes'));
app.use('/cart', require('./routes/cartRoutes'));

/* console.log('Registrerade routes:');
app._router.stack.forEach(function(r){
  if (r.route && r.route.path){
    console.log(`${Object.keys(r.route.methods)} ${r.route.path}`);
  } else if (r.name === 'router') {
    r.handle.stack.forEach(function(layer) {
      if (layer.route) {
        const methods = Object.keys(layer.route.methods).join(',');
        console.log(`  ${methods.toUpperCase()} ${r.regexp}`);
      }
    });
  }
}); */

// Synkronisera databasen och starta servern
const { sequelize } = require('./models');
sequelize.sync({ alter: true }).then(() => {
  console.log('Databasen är synkroniserad!');
}).catch((err) => {
  console.error('Fel vid synkronisering av databasen:', err);
});

module.exports = app;
