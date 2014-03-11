/**
 * Created by MarkDuckworth on 3/9/14. Copyright (c) 2014 MarkDuckworth. All rights reserved.
 */
var expect = require("chai").expect,
    fs = require('fs'),
    path = require('path'),
    util = require('util'),
    config = require('../config');

describe('config', function(){
    var filepath,
        hash = {a: 1, b: 2};

    afterEach(function() {
        if (fs.existsSync(filepath)) {
            fs.unlinkSync(filepath);
        }
    });

    describe('#get()', function(){

        /**
         * Test that the config file is loaded from a file named after the script argument to node.
         * I.e. process.argv[1].
         */
        describe('when called in a node process that was given a script argument', function() {
            beforeEach(function() {
                filepath = process.argv[1] + '.config';
                fs.writeFileSync(filepath, JSON.stringify(hash));
            });

            it('should get the config file as the same name as the script file argument to node', function(){
                expect(config.get()).to.deep.equal(hash);
            });
        });

        /**
         * Test that the config file is loaded from a file in the working directory if no script argument was passed to node
         */
        describe('when called in a node process that was NOT given a script argument', function() {
            var oldArg1;

            beforeEach(function() {
                oldArg1 = process.argv[1];
                process.argv[1] = undefined;
                filepath = path.join(process.cwd(), "config.config");
                fs.writeFileSync(filepath, JSON.stringify(hash));
            });

            afterEach(function() {
                process.argv[1] = oldArg1;
            });

            it('should get the config file is loaded from a file in the working directory',
                function(){
                    expect(config.get()).to.deep.equal(hash);
                });
        });
    });

    describe('#get(filename)', function(){
        /**
         * Test that the config file is loaded from a file in the same directory as the script file,
         * if only a file name was provided
         */
        var filenameOnly = "mark.config";
        beforeEach(function() {
            filepath = path.join(path.dirname( process.argv[1] ), filenameOnly);
            fs.writeFileSync(filepath, JSON.stringify(hash));
        });

        it('should get the config file is loaded from a file in the working directory',
            function(){
                expect(config.get(filenameOnly)).to.deep.equal(hash);
            });
    });

    describe('#get(filepath)', function(){
        /**
         * Test that the config file is loaded from a file at a specified path
         */
        var filename;
        var directory;

        beforeEach(function() {
            filename = "bart.config";
            directory = path.resolve(process.cwd(), "./tempTestingDirectory/");
            fs.mkdirSync(directory);
            filepath = path.resolve(directory, filename);
            fs.writeFileSync(filepath, JSON.stringify(hash));
        });

        afterEach(function() {
            try {
                fs.unlinkSync(filepath);
                fs.rmdirSync(directory);
            }
            catch (e) {
                console.log(util.inspect(e));
            }
        });

        it('should get the config file is loaded from a file in the specified directory',
            function(){
                expect(config.get(filepath)).to.deep.equal(hash);
            });
    });
});
