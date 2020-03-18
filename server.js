#!/usr/bin/env node

"use strict"

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const fs = require('fs')
const chalk = require('chalk')
const utils = require('./utils/utils')
const app = express()

let noIndex = true

// On exit
process.on('exit', function(code) {
    return console.log(`Expresso shutting down.`);
});

// Args
let args = utils.checkArgs(process.cwd())
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

// Importing middlewares
for (let i = 0; i < args._.length; i++) {
    if (!args._[i].includes('js')) {
        console.log(chalk.redBright(`Invalid file extension for ${args._[i]}`))
    } else {
        try {
            app.use(require(process.cwd() + '/' + args._[i]))
        } catch (error) {
            console.log(chalk.redBright(error))
        }
    }
}

// Static files
app.use(args.staticPath, express.static(args.staticFiles))

if (args.mode === 'static') {
    fs.open(args.staticFiles + '/index.html', 'r', (err, fd) => {
        if (err) {
            console.log(chalk.yellowBright('Index.html not found inside static files directory, serving other files'));
        } else {
            noIndex = true
            console.log(chalk.green('index.html is being served from ' + args.staticPath));
        }
    })
}

app.get(args.staticPath, (req,res) => {
    if (noIndex) {
        res.status(404)
        res.send({
            status: 'error'
        })
    } else {
        res.sendFile(args.staticFiles + '/index.html')
    }
})

// Catchall, includes check for spa mode
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
