const minimist = require('minimist')
const chalk = require('chalk')

// Args
let args = minimist(process.argv.slice(2), {
    default: {
        port: 3000,
        mode: 'static',
        staticFiles: './',
        staticPath: '/'
    },
});

module.exports.checkArgs = (rootdir) => { 
    if (args.help) {
        console.log('--port -> the port the server runs on (default 3000)')
        console.log('--mode -> static | spa (default static)')
        console.log('--staticFiles -> where to get the static files (default ./)')
        console.log('--staticPath -> where to serve the static files (default /)')
        console.log('any javascript file with a valid module exporting a middleware function will be loaded as middleware (Ex: expressodotio ./test.js)')
        process.exit()
    }
    if (typeof args.port !== 'number') {
        console.log(chalk.redBright('Argument for port is not a number'))
        return false;
    }
    if (typeof args.mode !== 'string') {
        console.log(chalk.redBright('Argument for mode is not a string'))
        return false;
    } else {
        if (args.mode !== 'static' && args.mode !== 'spa') {
            console.log(chalk.redBright('Argument for mode is not recognized'))
            return false;
        }
    }
    if (typeof args.staticFiles !== 'string') {
        console.log(chalk.redBright('Argument for staticFiles is not a string'))
        return false;
    } else {
        if (args.staticFiles.split('.')[1]) {
            args.staticFiles = rootdir + args.staticFiles.split('.')[1]
        }
    }
    if (typeof args.staticPath !== 'string') {
        console.log(chalk.redBright('Argument for staticPath is not a string'))
        return false;
    }
    return args;
};

module.exports.verbosity = (args, req) => {
    if (args.v) {
        console.log('Time:', Date.now() + ' | ' + req.baseUrl + ' | ' + req.ip + ' | ' + req.originalUrl)
    }
    if (args.vv) {
        console.log('Time:', Date.now() + ' | ' + req.baseUrl + ' | ' + req.ip + ' | ' + req.originalUrl + ' | ' + req.path + ' | ' + req.protocol + ' | ' + JSON.stringify(req.query))
    }
    if (args.vvv) {
        console.log('Time:', Date.now() + ' | ' + req.baseUrl + ' | ' + req.ip + ' | ' + req.originalUrl + ' | ' + req.path + ' | ' + req.protocol + ' | ' + JSON.stringify(req.query) + ' | ' + req.method + ' | ' + JSON.stringify(req.body))
    }
};