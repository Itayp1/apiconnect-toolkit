const fs = require("fs");
// require("./gatewayscript")
const yaml = require("js-yaml");

let file = fs.readFileSync("./gatewayscript.js", "utf8");
file = yaml.dump({ file }, {});

fs.writeFileSync("ssss.txt", file.toString());
console.log(file);
