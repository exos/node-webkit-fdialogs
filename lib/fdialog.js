
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

// Methods

FDialog.prototype.initialize = function (options) {  
    this._options = _.extends({}, defOprions, options);

    // Super
    events.EventEmitter.call(this);
};
