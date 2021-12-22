const fs = require("fs")
const yaml = require("js-yaml")


function getObject(theObject) {
    var result = null;
    if (theObject instanceof Array) {
        for (var i = 0; i < theObject.length; i++) {
            result = getObject(theObject[i]);
            if (result) {
                break;
            }
        }
    }
    else {
        for (var prop in theObject) {
            // console.log(prop + ': ' + theObject[prop]);
            if (prop == 'tagName') {
                if (theObject[prop] == 'xmp') {
                    return theObject;
                }
            }
            if (theObject[prop] instanceof Object || theObject[prop] instanceof Array) {
                result = getObject(theObject[prop]);
                if (result) {
                    break;
                }
            }
        }
    }
    return result;
}

try {

    let fileContents = fs.readFileSync('./preconfig.yaml', 'utf8');
    let data = yaml.safeLoad(fileContents);

    let logRows = fs.readFileSync('./src/stores.js').toString().split('\n');

    logRows[0] = "export const config = " + JSON.stringify(data)
    fs.writeFileSync('./src/stores.js', logRows.join('\n'));

    let logRows2 = fs.readFileSync('./public/global.css').toString().split('\n');

    logRows2[6] = ":root{" + Object.keys(data.setup.theme).map(x => "--" + (x.includes('_') ? x.split('_').join('-') : x) + ":" + data.setup.theme[x]).join(";") + "}"
    fs.writeFileSync('./public/global.css', logRows2.join('\n'));

    // console.log(data.apt_sections)

    if (process.argv.slice(2)[0] == 'parse') {
        fs.readdir('./pythonapt', (err, files) => {
            if (err) console.log(err)
            else
                files.forEach(file => {

                    let logRows3 = fs.readFileSync('./pythonapt/' + file).toString().split('\n');

                    let filename = ''
                    let code = ''
                    let codes = -1
                    let codee = -1
                    let lang = undefined
                    let prob_desc = ''
                    let const_desc = ''
                    let examp_desc = ''
                    let prob_m = -1
                    let const_m = -1
                    let examp_m = -1
                    let cpr_m = -1
                    let cpr_desc = ''

                    for (let i = 0; i < logRows3.length; i++) {

                        if (logRows3[i].includes('ilename:')) {
                            filename = logRows3[i].split(':')[1].trim()
                            logRows3[i] = ''
                        }
                        if (logRows3[i].includes('<xmp>') && codes == -1) {
                            codes = i
                        }
                        if (logRows3[i].includes('</xmp>') && codee == -1) {
                            codee = i
                        }
                        if (logRows3[i].includes('<h2>Problem Statement</h2>')) {
                            prob_m = i
                        }
                        if (logRows3[i].includes('<h3>Constraints</h3>')) {
                            const_m = i
                        }
                        if (logRows3[i].includes('<h3>Examples</h3>')) {
                            examp_m = i
                        }
                        if (logRows3[i].includes('<div class="copyright">')) {
                            cpr_m = i
                        }

                    }

                    lang = filename.split('.')[1] == 'py' ? 'python' : 'java';

                    code = logRows3.slice(codes + 1, codee)
                    while (code[0] == '') code = code.slice(1)

                    if (lang == 'python') code = code.map(x => (x.trim().slice(0, 3) == 'def' ? '' : '\t') + x.trim())

                    code = code.join('\n')

                    prob_desc = logRows3
                        .slice(prob_m + 1, const_m)
                        .map(x => x.trim())
                        .join('\n')
                        .replace(/<P>|<div>|<\/div>/gi, '')
                        .split('\n')


                    while (prob_desc[0] == '') prob_desc = prob_desc.slice(1)
                    while (prob_desc[prob_desc.length - 1] == '') prob_desc = prob_desc.slice(0, prob_desc.length - 1)

                    // console.log(prob_desc)
                    prob_desc = prob_desc.join('\n')

                    const_desc = logRows3
                        .slice(const_m + 1, examp_m)
                        .map(x => x.trim())
                        .join('\n')
                        .replace(/<P>|<div>|<\/div>/gi, '')
                        .split('\n')


                    while (const_desc[0] == '') const_desc = const_desc.slice(1)
                    while (const_desc[const_desc.length - 1] == '') const_desc = const_desc.slice(0, const_desc.length - 1)

                    //onsole.log(const_desc)
                    const_desc = const_desc.join('\n')

                    examp_desc = logRows3
                        .slice(examp_m + 1, cpr_m)
                        .map(x => x.trim())
                        .join('\n')
                        .replace(/<P>|<div>|<\/div>/gi, '')
                        .split('\n')

                    while (examp_desc[0] == '') examp_desc = examp_desc.slice(1)
                    while (examp_desc[examp_desc.length - 1] == '') examp_desc = examp_desc.slice(0, examp_desc.length - 1)

                    //console.log(examp_desc)
                    examp_desc = examp_desc.join('\n')

                    cpr_desc = logRows3
                        .slice(cpr_m + 1, logRows3.length)
                        .map(x => x.trim())
                        .join('\n')
                        .replace(/<P>|<div>|<\/div>|<\/html>|<\/body>/gi, '')
                        .split('\n')

                    while (cpr_desc[0] == '') cpr_desc = cpr_desc.slice(1)
                    while (cpr_desc[cpr_desc.length - 1] == '') cpr_desc = cpr_desc.slice(0, cpr_desc.length - 1)

                    // console.log(cpr_desc)
                    
                    cpr_desc = cpr_desc.join('\n')
                    if('Intro' == filename.split('.')[0]){
                        console.log(code)
                    }
                    
                    fs.writeFileSync('./APTS/' + filename.split('.')[0] + '.yaml', yaml.dump(
                        {
                            filename,
                            name: filename.split('.')[0],
                            description: "",
                            tags: ['TAG1', 'TAG2', 'Required'],
                            lang,
                            initial: code,
                            problem: prob_desc,
                            constraints: const_desc,
                            examples: examp_desc,
                            copyright: cpr_desc,

                        }
                    ))
                });
        })
    }

    fs.readdir('./APTs', (err, files) => {
        
        if (err) console.log(err)
        else{
            const aptsλ = files.map(file => yaml.safeLoad(fs.readFileSync('./APTs/'+file, 'utf8')))
            fs.writeFileSync('./src/aptsX.js', 'export default ' + JSON.stringify(aptsλ));
        }
    })




} catch (e) {
    console.log(e);
}




