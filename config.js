/**
 * Copyright 2014, Mark Duckworth
 */
var fs = require('fs'),
    path = require('path'),
    util = require('util');

// named config instances
var configs = {};

/**
 * Get the configuration from the specified filename. The configuration will be synchronously read
 * and parsed from the file as JSON, only once during the application lifecycle.
 *
 * @param filename specifies a path to the config file relative to the script argument passed to node,
 *        or relative to the working directory, if no script argument was passed. Alternatively, if the filename
 *        argument was not passed, then the config filename will be based on the script file arg for node.
 * @returns the parsed JSON configuration from the config file, or null if the configuraiton file
 *          cannot be read or parsed.
 */ 
module.exports.get = function( filename ) {
  var configFilename = filename,
      configPath = '',
      configFullPath,
      config = null;
  
  // get config file name
  if( !configFilename ) {
    configFilename = ( process.argv[1] || 'config' ) + '.config';
  }
  
  // resolve absolute path to config file
  if( process.argv[1] ) {
    configPath = path.dirname( process.argv[1] );
  }
  configFullPath = path.resolve( configPath, configFilename );
  
  // return existing config if already in memory
  if( configs[ configFullPath ]) {
    return configs[ configFullPath ];
  }
  
  // load config from file, if file exists
  if( fs.existsSync( configFullPath )) {
    var fileContent = fs.readFileSync( configFullPath );
    if( fileContent ) {
      // parse and store in the array of named config instances
      try {
        config = JSON.parse( fileContent );
        configs[ configFullPath ] = config;
      }
      catch (e) {
        console.log("Unable to parse the configuration file: ", configFullPath);
        console.log("JSON.parse error:", util.inspect(e));
      }
    }
    else {
      console.log("Unable to read the configuration file: ", configFullPath);
    }
  }
  else {
    console.log("Unable to find the configuration file: '", configFullPath, "'");
  }
  
  return config;
}