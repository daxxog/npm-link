/* NpmLink
 * Magically link local npm packages.
 * (c) 2014 David (daXXog) Volm ><> + + + <><
 * Released under Apache License, Version 2.0:
 * http://www.apache.org/licenses/LICENSE-2.0.html  
 */

/* UMD LOADER: https://github.com/umdjs/umd/blob/master/returnExports.js */
(function (root, factory) {
    if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like enviroments that support module.exports,
        // like Node.
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(factory);
    } else {
        // Browser globals (root is window)
        root.NpmLink = factory();
  }
}(this, function() {
    var express = require('express'),
        tar = require('tar'),
        fstream = require('fstream'),
        inherits = require('util').inherits,
        app = express.Router(),
        cwd = process.cwd(),
        error;

    error = function(err) {
        console.log(err);
    };
    
    app.get('/archive.tar', function(req, res) {
        var packer = tar.Pack({noProprietary: true}).on('error', error),
            stack = [],
            buffer;

        packer.on('data', function(x) {
            stack.push(x);
        });

        packer.on('end', function() {
            buffer = new Buffer(stack.map(function(b) {
                return b.length;
            }).reduce(function(t, b) {
                return t + b;
            }));

            stack.reduce(function(t, b) {
                if(typeof t !== 'number') {
                    t = 0;
                }

                b.copy(buffer, t, 0, b.length + 1);

                return t + b.length;
            });

            res.set('Content-Type', 'application/x-tar');
            res.send(buffer);
        });

        fstream.Reader({path: cwd, type: "Directory" }).on('error', error).pipe(packer);
    });

    return app;
}));
