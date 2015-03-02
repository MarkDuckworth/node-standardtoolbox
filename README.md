node-standardtoolbox
====================
A set of simple tools for node application development.

Getting Started
---------------

## Installation
    npm install

## Running Tests
    npm test

Modules
-------
The node-standardtoolbox contains one module.

## config
**Note:** The simple way to load configuration from JSON is to use Node's `require` method and should be preferred over this.

The config module loads configuration object from a JSON formatted configuration file.

    var config = require('node-standardtoolbox').config;

### Simple scenario
Create a JSON formatted config file.

    $ echo '{"hi":"mom"}' > test.config

Run node

    $ node

Load the config file

    > config =  require(...)
    > config.get('./test.config') // returns { hi: 'mom' }

### Specifying the config file
Use the get([filename]) method to load configuration from a specified file, with a fully qualified path.

    var myConfig = config.get('/home/special.config');

Or provide a relative path to resolve the config file location relative to the script that node is running.

    $ node C:\projects\application\app.js

    var myConfig = config.get('./debug.config'); // resolves to C:\projects\application\debug.config

Or do not pass a filename, and config will look for a config file with the same name as the script that node is running.

    > node C:\projects\application\app.js

    var myConfig = config.get(); // resolves to C:\projects\application\app.config

### Loaded configs are cached
Subsequent calls to get(...) do NOT reload the configuration from the file.

    > node C:\projects\application\app.js

    var myConfig = config.get(); // resolves to C:\projects\application\app.config
    // ... something modifies C:\projects\application\app.config
    var myConfig2 = config.get();

    myConfig === myConfig2; // true, these are the same object.
