import {CalculateTax} from './taxcalc.js'
import express from 'express';
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    try{
        var income = parseInt(req.query.income);
        var age = parseInt(req.query.age);
        var regime = req.query.regime;
        var tax = CalculateTax(age, income, regime);
        
        console.log(income, age, regime, tax);
        res.send(tax.toString());
    }
    catch(e){
        console.log(e);
        res.send("Error");
    }
})

app.listen(port, () => {
  console.log(`Active on ${port}`)
})

