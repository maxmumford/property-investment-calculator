module.exports = function(fileName){
  try {
    config = require(fileName);
  }
  catch (err) {
    console.log("unable to read file '" + fileName + "': ", err);
    console.log("see ./config/secrets.json for an example");
  }
  return config;
}
