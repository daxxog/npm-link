/* NpmLink / cli.js
 * Magically link local npm packages.
 * (c) 2014 David (daXXog) Volm ><> + + + <><
 * Released under Apache License, Version 2.0:
 * http://www.apache.org/licenses/LICENSE-2.0.html  
 */ (function(link,app){app.use(link);app.listen(7778);console.log('http://localhost:7778/archive.tar');}(require('./npm-link.js'),new require('express')()));