const express = require('express')
const app = express()
const port = process.env.PORT || 3000;

const tax_slabs = 
    [[250000, 0], [500000,0.05], [750000,0.1], [1000000,0.15], [1250000,0.2], [1500000,0.25],[Number.MAX_SAFE_INTEGER,0.3]]
;

function CalculateTax(age, income, regime) {
    if (income < tax_slabs[0][0]) return 0;
    var tax_income = income-tax_slabs[0][0];
    var tax = 0;

    for (var i=1; i<tax_slabs.length-1; i++) {
        var slab = tax_slabs[i];
        var prev_slab = tax_slabs[i-1];

        var increment = slab[0] - prev_slab[0];
        tax += slab[1] * Math.max(0, Math.min(increment, tax_income));
        tax_income -= increment;
    }
    tax += Math.max(0, tax_slabs[tax_slabs.length-1][1] * tax_income);

    return tax;
}

app.get('/', (req, res) => {
    var tax = CalculateTax(25, 4950000, "simple");
    res.send("uo " + tax)
})

app.listen(port, () => {
  console.log(`Active on ${port}`)
})

