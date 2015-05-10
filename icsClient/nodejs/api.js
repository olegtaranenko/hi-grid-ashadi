/**
 * Created by JetBrains WebStorm.
 * User: user1
 */
var express = require('express');
var cors = require('cors');
var debug = require('debug')('server');
var path = require("path");
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
//app.use(invoke);

app.use('/config', processConfig);
app.use('/results', processResults);


var localPort = process.env.PORT || 5555;

// run node web-server
server.listen(localPort);
console.warn('server started at port', localPort);

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
    page = params.page;
    start = params.start;
    limit = params.limit;
    ts = (new Date()).getTime() / 1000;

    var inspectionList = nextDummy(100000, ts);

    res.writeHead(200, {
        "Content-Type": "application/javascript"
    });

    start = parseInt(start);
    var resultData = [];
    for (var i = 0; i < limit; i++) {
        var inspectionIndex = (page - 1) * limit + i + start;
        if(inspectionIndex < inspectionList.length){
            resultData.push(inspectionList[inspectionIndex]);
        }
    }

    res.write(JSON.stringify({
        data: resultData,
        total: inspectionList.length
    }));

    res.end();


    function nextDummy(index, ts) {

        var data = [];

        for(var i=0; i < index ; i++){
            var dummyTpl = {
                inspectionIndex: i,
                inspectionTime: i,
                iterationDuration: i,
                inspectionDuration: i,
                isOk: false
            };
            data.push(dummyTpl);
        }


        return data;
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