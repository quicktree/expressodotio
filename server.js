#!/usr/bin/env node

"use strict"

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')
const fs = require('fs')
const chalk = require('chalk')
const utils = require('./utils/utils')
const app = express()

// On exit
process.on('exit', function(code) {
    return console.log(`Expresso shutting down.`);
});

// Args
let args = utils.checkArgs(__dirname)
if (!args) {
    console.log(chalk.redBright('Bad args.'))
    process.exit()
}

// Body parser
bodyParser.json()
bodyParser.urlencoded({ extended: false })

// CORS
app.use(cors())

// Verbosity middleware
app.use((req, res, next) => {
    utils.verbosity(args, req)
    next()
})

// Static files
app.use(args.staticPath, express.static(args.staticFiles))

if (args.mode === 'static') {
    fs.open(args.staticFiles + '/index.html', 'r', (err, fd) => {
        if (err) {
            console.log(chalk.yellowBright('Index.html not found inside static files directory, serving other files'));
        } else {
            console.log(chalk.green(args.staticFiles + '/index.html is being served from ' + args.staticPath));
        }
    })
}

app.get(args.staticPath, (req,res) => {
    console.log(__dirname  + args.staticFiles.split('.')[1])
    res.sendFile(args.staticFiles + '/index.html')
})

app.get('*', (req, res) => {
    if (args.mode === 'spa') {
        res.sendFile(args.staticFiles + '/index.html')
    } else {
        res.status(404)
        res.send({
            status: 'error'
        })
    }
});

app.listen(args.port, () => {
    console.log(chalk.green(`expressodotio active on port ${args.port}`))
})
