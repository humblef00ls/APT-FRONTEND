const fs = require("fs")
const yaml = require("js-yaml")


try {
    let fileContents = fs.readFileSync('./preconfig.yaml', 'utf8');
    let data = yaml.safeLoad(fileContents);

    let logRows = fs.readFileSync('./src/stores.js').toString().split('\n');

    logRows[0] = "export const config = "+ JSON.stringify(data)
    fs.writeFileSync('./src/stores.js', logRows.join('\n'));

    let logRows2 = fs.readFileSync('./public/global.css').toString().split('\n');

    logRows2[6] = ":root{"+ Object.keys(data.setup.theme ).map(x=>"--"+ (x.includes('_') ? x.split('_').join('-') : x )+ ":" + data.setup.theme[x]).join(";") +"}" 
    fs.writeFileSync('./public/global.css', logRows2.join('\n'));

} catch (e) {
    console.log(e);
}