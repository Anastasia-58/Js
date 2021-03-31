const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

app.use(express.static('../src'));
app.use(bodyParser.json());

app.get('/catalogData', (req, res) => {
  fs.readFile('./goods.json', 'utf8', (err, data) => {
      if(!err){
          res.setHeader('Content-Type','Application/json');
          res.end(data);
      } else{
          console.log(err);
     res.end(JSON.stringify(err))
      }
  });
});

app.post('/catalogData', (req, res) => {
  fs.readFile('./goods.json', 'utf8', (err, data) => {
    if (!err) {
      const goods = JSON.parse(data);
      const id = goods.reduce((acc,good)=> acc>good.id ? acc : good.id, 0) + 1;
        
      goods.push({
          id: id,
          title: req.body.title,
          price: req.body.price
      });
        
      fs.writeFile('./goods.json', JSON.stringify(goods), (err) => {
        if (!err) {
          res.end();
        } else {
          console.log(err);
          res.end(JSON.stringify(err))
        }
      });
    
  } else{
      console.log(err);
     res.end(JSON.stringify(err))
  }
});
});

app.get('/cart', (req, res) => {
  fs.readFile('./cart.json', 'utf8', (err, data) => {
      if(!err){
          res.setHeader('Content-Type','Application/json');
          res.end(data);
      } else{
          console.log(err);
     res.end(JSON.stringify(err))
      }
  });
});

app.post('/cart', (req, res) => {
  fs.readFile('./cart.json', 'utf8', (err, data) => {
    if (!err) {
      const goods = JSON.parse(data);
        
      goods.push(req.body);
      console.log(goods);
        
      fs.writeFile('./cart.json', JSON.stringify(goods), (err) => {
        if (!err) {
          res.end();
        } else {
          console.log(err);
          res.end(JSON.stringify(err))
        }
      });
    
  } else{
      console.log(err);
     res.end(JSON.stringify(err))
  }  
      
  });
});

app.delete('/cart', (req, res) => {
  fs.readFile('./cart.json', 'utf8', (err, data) => {
    if (!err) {
      const cart = JSON.parse(data);
      const id = req.body.id;
      const goodIndex = cart.findIndex((item)=>item.id==id);
      cart.splice(goodIndex, 1);
        
        
      fs.writeFile('./cart.json', JSON.stringify(goods), (err) => {
        if (!err) {
          res.end();
        } else {
          console.log(err);
          res.end(JSON.stringify(err))
        }
      });
    
  } else{
      console.log(err);
     res.end(JSON.stringify(err))
  }  
      
  });
});

app.listen(3000, function() {
  console.log('server is running on port 3000!');
});