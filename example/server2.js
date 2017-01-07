var express = require('express'),
   bodyParser = require('body-parser')

var app = express()
   .use(bodyParser.json());

app.post('/products', function(req, res) {
   var newProduct = {
      name: req.param('name'),
      description: req.param('description'),
      price: req.param('price')
   }
   console.log(req.param('name'));
   products.push(newProduct);
   res.statusCode = 201;
   res.location('/products/' + products.length);
   res.json(true);
});
/**
 * Listen
 */

app.listen(3000);
