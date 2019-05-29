const { Calculator } = require("./calculator");

const args = process.argv.slice(2);

if (args.length) {
    calc(args);
} else {
    const express = require('express');
    const app = express();

    // Example: http://localhost:3000/calc?2*2
    app.get('/calc', async function (req, res) {
        let calc = new Calculator(Object.keys(req.query)[0]);
        const result = await calc.calc();
        res.json(result);
    })

    app.listen(3000)
}

async function calc(args) {
    if (args.length === 1) {
        args = args[0];
    }
    const calc = new Calculator(args);
    console.log(await calc.calc());
}

