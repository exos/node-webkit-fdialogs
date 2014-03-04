/** 
 * A module for manage file dialogs in node-webkit.
 * @module FDialogs
 */

"use strict";

var events  = require('events'),
    fs      = require('fs'),
    util    = require('util'),

    _       = require('underscore');

var defOprions = {
    type: 'open',
    accept: [],
    path: null,
    element: null
};

var FDialog = function () {
    this.initialize.apply(this, arguments);
};

// Extends

util.inherits(FDialog, events.EventEmitter);

// Exports 

module.exports = FDialog;

// Static

/**
 * No file select error, throeable
 *
 * @message string
 */

FDialog.NoSelectedFile = function (message) {
    this.name = 'NoSoelectedFile';
    this.message = message;
    this.stack = (new Error()).stack;
};

FDialog.NoSelectedFile.prototype = new Error();

// Private

FDialog.prototype._createElement = function () {

    var self = this;

    if (this.element)
        return this.element;

    this._pid = 0;

    this.element = this.window.document.createElement("input");
    this.element.type = 'file';

    this.element.addEventListener('change', function (ev) {
        self.emit('element-change', ev, this.element);
    });

    return this.element;

};

// Methods

/** @constructor */
FDialog.prototype.initialize = function (options) {  
    this._options = _.extends({}, defOprions, options);

    if (typeof this._options.window !== "undefined")
        this.window = this._options.window;

    this.element = null;

    // Super
    events.EventEmitter.call(this);

};

/** Set window object (for element creation */
FDialog.prototype.setWindow = function (window) {
    this.window = window;
};

/** Show dialog */
FDialog.prototype.show = function (cb) {

    var element = this._createElement();

    cb = cb || function () {};

    element.click();
    cb (null, element);

};

/** Get a file path by a dialog */
FDialog.prototype.getFilePath = function (cb) {

    var self = this;
    

    self.once('element-change', function (ev, element) {
        var filname = element.value;

        if (!filname) return (new FDialog.NoSelectedFile("No file selected") , null);

        cb(null, filename);

    });

    self.show();

};

/** Get file content and path */
FDialog.prototype.readFile = function (options, cb) {

    var self = this;

    if (typeof options == 'function') {
        cb = options;
        options = {};
    }

    self.getFilePath(function (err, filepath) {

        if (err) return cb(err);

        fs.readFile(filepath, options, function (err, body) {
            cb(err, body, filepath);
        });

    }); 

};

FDialog.prototype.saveFile = function (data, encoding, options, cb) {

    var self = this;

    if (typeof encoding == 'function') {
        cb = encoding;
        encoding = options = null;
    }

    if (typeof options == 'function') {
        cb = options;
        options = null;
    }

    self.getFilePath(function (err, filepath) {
        if (err) return cb(err);

        if (!Buffer.isBuffer(data)) {
            data = new Buffer(data, encoding);
        }

        fs.writeFile(filepath, options, function (err) {
            if (err) return cb(err);

            cb (null, filepath);

        });

    }) 

};
