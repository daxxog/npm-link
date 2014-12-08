var tar = require('tar'),
    tmp = require('tmp'),
    request = require('request'),
    vows = require('vows'),
    assert = require('assert');

var extract = function(path, cb) {
    var extractor = tar.Extract({
        path: path
    })
        .on('error', cb)
        .on('end', cb);

    request('http://localhost:7778/archive.tar')
        .on('error', cb)
        .pipe(extractor);
};

tmp.dir(function(err, path) {
    console.log(path + '/npm-link');

    if(!err) {
        vows.describe('npm-link').addBatch({
            'when extracting tar archive': {
                topic: function() {
                    extract(path, this.callback);
                },
                'we don\'t get any errors': function(topic) {
                    assert.equal(topic, undefined);
                }
            }
        }).run();
    } else {
        console.log('error: could not open tmp folder!');
        console.log(err);
    }
});