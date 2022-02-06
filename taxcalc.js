// Even: New Regime
// Odd: Old Regime
// 0: New General
// 1: Old General
// 2: New SeniorCitizen
// 3: Old SeniorCitizen
// 4: New SuperSeniorCitizen
// 5: Old SuperSeniorCitizen
const tax_slabs = [
    [[250000, 0], [500000, 0.05], [1000000, 0.2], [Number.MAX_SAFE_INTEGER, 0.3]],
    [[250000, 0], [500000,0.05], [750000,0.1], [1000000,0.15], [1250000,0.2], [1500000,0.25],[Number.MAX_SAFE_INTEGER,0.3]],
    [[]]
];


export function CalculateTax(age, income, regime){
    var tax_slab = tax_slabs[0];
    if (regime === 'new' && age<55) tax_slab = tax_slabs[1];

    if (income < tax_slab[0][0]) return 0;
    var tax_income = income-tax_slab[0][0];
    var tax = 0;

    for (var i=1; i<tax_slab.length-1; i++) {
        var slab = tax_slab[i];
        var prev_slab = tax_slab[i-1];

        var increment = slab[0] - prev_slab[0];
        tax += slab[1] * Math.max(0, Math.min(increment, tax_income));
        tax_income -= increment;
    }
    tax += Math.max(0, tax_slab[tax_slab.length-1][1] * tax_income);

    return tax;
}

