const express = require("express")
const dataroute = express.Router();
const fs = require('fs');

const routes = './Main/data.json';


const datas = (data) => {
    const convert = JSON.stringify(data)
    fs.writeFileSync(routes, convert)
}
const obtain = () => {
    const jsonData = fs.readFileSync(routes)
    return JSON.parse(jsonData)    
}


// GET Method
dataroute.get('/details', (req, res) => {
    fs.readFile(routes, 'utf8', (err, data) => {
      if (err) {
        throw err;
      }
      res.send(JSON.parse(data));
    });
  });



//POST Method
dataroute.post('/details/extra', (req, res) => {
   
    var existAccounts = obtain()
    const newAccountId = Math.floor(100000 + Math.random() * 900000)
   
    existAccounts[newAccountId] = req.body
     
    console.log('/n'+existAccounts);

    datas(existAccounts);
    res.send({success: true, msg: ' data added successfully'})
})

// Read json data
dataroute.get('/details/get', (req, res) => {
  const accounts = obtain()
  res.send(accounts)
})




// PUT Method
dataroute.put('/details/:id', (req, res) => {
   var existAccounts = obtain()
   fs.readFile(routes, 'utf8', (err, data) => {
    const accountId = req.params['id'];
    existAccounts[accountId] = req.body;

    datas(existAccounts);
    res.send(`accounts with id ${accountId} has been updated`)
  }, true);
});

//Delete method
dataroute.delete('/details/delete/:id', (req, res) => {
   fs.readFile(routes, 'utf8', (err, data) => {
    var existAccounts = obtain()

    const userId = req.params['id'];

    delete existAccounts[userId];  
    datas(existAccounts);
    res.send(`accounts with id ${userId} has been deleted`)
  }, true);
})
module.exports = dataroute;