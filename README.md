
# node-webkit-fdialogs

[![Dependency Status](https://david-dm.org/exos/node-webkit-fdialogs.png)](https://david-dm.org/exos/node-webkit-fdialogs)

This package help to use file dialogs in Node-Webkit.

## Reazon

Node-webkit does not offer any solution to manage fdialogs, quatem they:

    We do not provide file dialog API in javascript for following reasons now:

    - Our way is the standard way of HTML, it will not cause errors if you move to other platforms.
    - Better code reusing.
    
    But if the need is very strong, we will provide it in future.

For easy use of file selection by dialogs, this package offer a some of methods for work with file elements.

# Install

From [npm](https://www.npmjs.org/package/node-webkit-fdialogs):

```
$ npm install node-webkit-fdialogs
```

From git

```
$ git clone https://github.com/exos/node-webkit-fdialogs.git
```

# Use

## Simple:

```JavaScript

var fdialogs = require('node-webkit-fdialogs');

// Open file simple

fdialogs.readFile(function (err, data, path) {

    console.log("content of file ", path, "is" , data);

});

// Save file simple 

var content = new Buffer("Hello world!", 'utf-8');

fdialogs.saveFile(content, function (err, path) {

    console.log("File saved in", path);

});


```

## More options

```JavaScript
var fdialogs = require('node-webkit-fdialogs');

var Dialog = new fdialogs.FDialog({
    type: 'open',
    accept: ['.gif','.png','image/jpeg'],
    path: '~/Documents'
});

Dialog.readFile(function (err, content, path) {

});

```

# Documentation:

See [wiki](https://github.com/exos/node-webkit-fdialogs/wiki)

# TODO

* Multi file support
* Directory selector support
