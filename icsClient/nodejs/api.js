/**
 * Created by JetBrains WebStorm.
 * User: user1
 */
var express = require('express');
var cors = require('cors');
var debug = require('debug')('server');
var path = require('path');
var join = path.join;
var http = require('http');
var url = require('url');
var querystring = require('querystring');
var _ = require('underscore');

var app = express();
var server = http.createServer(app);
var fs = require('fs');
var favicon = require('serve-favicon');
app.use(favicon(__dirname + '/public/favicon.ico'));

app.use(cors());

var getRawBody = require('raw-body');
var typer = require('media-typer');

app.use(function(req, res, next) {
    var contentType = req.headers['content-type'];
    var contentLength = req.headers['content-length'];
    var parseConfig = {
        length: contentLength,
        limit: '1mb'
    };

    if (contentType) {
        parseConfig.encoding = typer.parse(contentType).parameters.charset;
    }
    getRawBody(req, parseConfig, function(err, string) {
        if (err) {
            return next(err);
        }

        req.text = string;
        next()
    })
});

app.use(logger);

app.use('/config', processConfig);
app.use('/results', processResults);


var localPort = process.env.PORT || 5555;

// --- io Variables
var ioInspectionTimer = null;
var ioConfig = {
//    fps: 20,
//    buffer_size: 10000,
//    input_result: 0
};

var lastInspectionIndex = 0;
// --- END io Variables


// run node web-server
server.listen(localPort);
console.warn('server started at port', localPort);

var mylogger = require('./lib/mylogger'),
    Log = new mylogger();

var io = require('socket.io').listen(server, {
    logger: new mylogger,
    'Log level': 3
});

io.on('connection', function (socket) {
    console.log('[SOCKET EVENT] connected !');

    socket.on('configuration', function(data) {
        console.log('[SOCKET EVENT] configuration : ', data);
        ioSetConfiguration(data);
    });

    socket.on('start', function (data) {
        console.log('[SOCKET EVENT] start : ', data);
        ioStartInspection(socket, data);
    });

    socket.on('stop', function (data) {
        console.log('[SOCKET EVENT] stop : ', data);
        ioStopInspection(data);
    });

    socket.on('reset', function (data) {
        console.log('[SOCKET EVENT] reset : ', data);
        lastInspectionIndex = 0;
        ioStopInspection(data);

    });

    socket.on('disconnect', function () {
        console.log('[SOCKET EVENT] disconnected!!! ');
        ioStopInspection();
    });

    var serverConfiguration = _.clone(ioConfig);

    if (lastInspectionIndex > 0) {
        serverConfiguration.lastInspectionIndex = lastInspectionIndex;
    }
    socket.emit('serverConfiguration', serverConfiguration);
});

// ----------------------------------------------------------
// --------  START SOCKET.io FUNCTIONS

function ioSetConfiguration (config) {
    if (!config) {
        return;
    }

    if (config.input_fps) {
        ioConfig.fps = config.input_fps;
    }

    if (config.input_buffer) {
        ioConfig.buffer_size = config.input_buffer;
    }

    if (lastInspectionIndex == 0) {
        lastInspectionIndex = config.input_result;
        console.log('lastinspectionIndex = ', lastInspectionIndex);
    }
}


function ioStartInspection (socket, config) {
    ioSetConfiguration(config);
    var interval = parseInt(1000 / ioConfig.fps);
    if (ioInspectionTimer) {
        ioStopInspection();
    }

    console.log('live data started!');
    ioInspectionTimer = setInterval(function () {
        socket.emit('inspection', {
            inspectionIndex: lastInspectionIndex++,
            inspectionTimestamp: (new Date()).getTime()
        });

    }, interval);
}


function ioStopInspection () {
    if (ioInspectionTimer) {
        console.log('live data stopped!');
        clearInterval(ioInspectionTimer);
        ioInspectionTimer = null;
    }
}

// --------  END SOCKET.io FUNCTIONS
// ----------------------------------------------------------


function logger(req, res, next) {
    console.log('%s %s', req.method, req.url);
    next();
}


function startsWith(s, start, ignoreCase) {
    var result = s;

    if (result) {
        if (ignoreCase) {
            s = s.toLowerCase();
            start = start.toLowerCase();
        }
        result = s.lastIndexOf(start, 0) === 0;
    }
    return result;
}


function processResults(req, res, next) {
    var requestUrl, parsedUrl, query, params, page, start, limit, ts, inspectionList;

    requestUrl = req.url;
    parsedUrl = url.parse(requestUrl);
    query = parsedUrl.query;
    params = querystring.parse(query);

    page = Number(params.page);
    start = Number(params.start);
    limit = Number(params.limit);
    ts = (new Date()).getTime() / 1000;

    res.writeHead(200, {
        "Content-Type": "application/javascript"
    });

    if (!(isNaN(limit) || isNaN(start) || isNaN(limit))) {
        var resultData = [],
            subtractPage = (page - 1) * limit,
            input_fps = ioConfig.fps,
            intervalBetweenInspections = parseInt(1000 / input_fps),
            lastIndex = lastInspectionIndex || ioConfig.input_result,
            lastTimestamp = (new Date()).getTime();

//        console.log('ioConfig: ', ioConfig);
//        console.log('lastInspectionIndex = ', lastInspectionIndex);

        for (var i = 0; i < limit; i++) {
            var inspectionIndex = lastIndex - i - subtractPage,
                subtractTime = lastTimestamp - i * 1000;

            if (inspectionIndex <= 0) {
                break;
            }

            resultData.push(generateInspection(inspectionIndex, ts));
        }
    }


    res.write(JSON.stringify({
        data: resultData,
        total: lastInspectionIndex
    }));

    res.end();

    function generateInspection(index, ts) {
        return {
            inspectionIndex: index,
            inspectionTime: ts,
            isOk: false
        };
    }
}


function processConfig(req, res, next) {
    var requestUrl = req.url,
        parsedUrl = url.parse(requestUrl),
        path = parsedUrl.pathname,
//		invokePrefix = '/' + invokePrependPath + '/',
//		invokeLen = invokePrefix.length,
//		action = startsWith(path, invokePrefix) ? path.substr(invokeLen) : path,
        query = parsedUrl.query,

        params = querystring.parse(query),
        callbackName = params.callback,
        isJsonp = !!callbackName,

        ret = 'Config',
        async = false;

    res.writeHead(200, {
        "Content-Type": "application/javascript"
    });

    if (isJsonp) {
        res.write(callbackName);
        res.write('(');
    }

    res.write(ret);

    if (isJsonp) {
        res.write(')');
    }
    res.end();
}