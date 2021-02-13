const fs = require("fs");
// require("./gatewayscript")
const yaml = require("js-yaml");

try {
  let fileContents = fs.readFileSync("./example.yaml", "utf8");
  let data = yaml.load(fileContents);

  // console.log(data)
  const execute = data["x-ibm-configuration"].assembly.execute;
  //   console.log(execute[1]["operation-switch"].case[1].execute);
  // console.log(data["x-ibm-configuration"].assembly.execute);

  data["x-ibm-configuration"].assembly.execute = checkForScripts(execute);
  // console.log(data["x-ibm-configuration"].assembly.execute);

  const updatedYaml = yaml.dump(data, {});
  fs.writeFileSync("updatedYaml.yaml", updatedYaml);

  // const gatewayscripts = execute.filter(({gatewayscript}) => gatewayscript)

  // console.log(gatewayscripts);
} catch (e) {
  console.log(e);
}

function checkForScripts(data) {
  return data.map((obj) => {
    const [operation] = Object.keys(obj);
    const extracetObj = obj[operation];

    switch (operation) {
      case "gatewayscript":
        const { title: jsName } = extracetObj;
        // console.log(title);
        try {
          obj.gatewayscript.source = fs.readFileSync(`./${jsName}.js`, "utf8");
        } catch (error) {}
        return obj;
        break;
      case "if":
        if (extracetObj.execute.length > 0) {
          obj.if.execute = checkForScripts(extracetObj.execute);
          return obj;
          // console.log(obj);
        } else {
          return obj;
        }

        break;
      case "operation-switch":
        if (extracetObj.case.length > 0) {
          obj["operation-switch"].case = checkForScripts(extracetObj.case);
          return obj;
        } else {
          return obj;
        }

        break;
      case "switch":
        if (extracetObj.case.length > 0) {
          obj.switch.case = checkForScripts(extracetObj.case);

          return obj;
        } else {
          return obj;
        }

        break;

      case "operations":
        // console.log(extracetObj);
        // console.log(obj);

        if (obj.execute.length > 0) {
          obj.operations.execute = checkForScripts(obj.execute);
          return obj;

          // console.log(obj);
        } else {
          return obj;
        }

        break;

      case "xslt":
        const { title } = extracetObj;

        try {
          obj.xslt.source = fs.readFileSync(`./${title}.xsl`, "utf8");
        } catch (error) {}
        return obj;
        break;

      default:
        return obj;
        break;
    }
  });
}
