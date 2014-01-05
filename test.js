var fs = require('fs'),
    config = require('./config');

var filename;
    
console.log(config.get());

filename = 'test.js.config';
try {
  fs.writeFileSync(filename, JSON.stringify({a: 1, b: 2}));
  console.log(config.get());
}
catch (e) {
  console.log(e);
}
finally {
  fs.unlink(filename);
}

filename = 'invalidjson.config';
try {
  console.log(config.get(filename));
  fs.writeFileSync(filename, "/*-not json");
  console.log(config.get(filename));
}
catch (e) {
  console.log(e);
}
finally {
  fs.unlink(filename);
}

filename = 'mark.json';
try {
  fs.writeFileSync(filename, JSON.stringify({a: 2, b: 2}));
  console.log(config.get(filename));
  fs.writeFileSync(filename, JSON.stringify({a: 3, b: 2}));
  console.log(config.get(filename));
}
catch (e) {
  console.log(e);
}
finally {
  fs.unlink(filename);
}