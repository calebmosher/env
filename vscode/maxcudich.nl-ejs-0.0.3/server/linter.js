const rewire = require('rewire');
const ejs = rewire('ejs');
const EJS_INCLUDE_REGEX = require('ejs-include-regex');
const check = require('syntax-error');
// Internal Function
// Replaces text with whitespace
function padWhitespace(text) {
    let res = '';
    // if text contains newlines,
    // space them properly
    if (text.indexOf('\n') !== -1) {
        // a crude way of counting newlines
        text.split('\n').forEach((t, n) => {
            if (n !== 0) {
                // Add newline
                res += '\n';
            }
            // Pad with whitespace between each newline
            for (let x = 0; x < t.length; x++) {
                res += ' ';
            }
        });
    }
    else {
        // Only pad with whitespace if no newline
        for (let x = 0; x < text.length; x++) {
            res += ' ';
        }
    }
    return res;
}
exports.parse = (text, options) => {
    // Use rewire to access the ejs internal function "Template"
    const Template = ejs.__get__('Template');
    const opts = options || {};
    const temp = new Template(text, opts);
    // Use ejs to parse the text
    const arr = temp.parseTemplateText();
    // console.log(arr);
    // ^^^^ enable this for development purposes
    // This allows you to see the values you will be working with below
    // Initialize variables:
    // Initialize var to hold the JS-Parseable String
    let scr = '';
    // Initialize mode var
    // This is used to indicate the status:
    // Inside Scriptlet, mode=1
    // Outside Scriptlet, mode=0
    let mode;
    // Initialize delimiter variable
    const d = opts.delimiter || '%';
    arr.forEach(function (str, i, arr) {
        switch (str) {
            case '<' + d:
            case '<' + d + '-':
            case '<' + d + '=':
            case '<' + d + '_':
                mode = 1;
                scr += padWhitespace(str);
                break;
            case d + '>':
            case '-' + d + '>':
            case '_' + d + '>':
                mode = 0;
                if (!/(\(|;|{|=>)\s*$/.test(scr)) {
                    const rightPaddingLength = scr.match(/\s*$/)[0].length;
                    scr = `${scr.trimRight()};${Array(rightPaddingLength === 0 ? 0 : rightPaddingLength - 1).join(' ')}`;
                }
                scr += padWhitespace(str);
                break;
            case (str.match(EJS_INCLUDE_REGEX) || {}).input:
                // if old-style include, replace with whitespace
                scr += padWhitespace(str);
                break;
            default:
                // If inside Scriptlet or Output, add to scr
                if (mode === 1) {
                    scr += str;
                    break;
                }
                // else, pad with whitespace
                scr += padWhitespace(str);
        } // end of switch
    }); // end of loop
    // console.log(scr);
    // ^^^^ enable this to debug wrong line or col numbers
    return scr;
};
exports.lint = function (text, opts = {}) {
    // parse
    const scr = exports.parse(text, opts);
    // check for errors
    const err = check(scr);
    if (err) {
        const errLine = err.inspect().split(/\n/g)[2];
        let startPos;
        let endPos;
        let i = err.column - 1;
        while (!startPos) {
            if (i === errLine.length)
                endPos = errLine.length;
            if (i === 0)
                startPos = 0;
            if (!endPos) {
                if (/\s/.test(errLine[i])) {
                    endPos = i;
                    i = err.column - 1;
                    continue;
                }
                i++;
                continue;
            }
            if (/\s/.test(errLine[i]))
                startPos = i;
            i--;
        }
        Object.assign(err, { startPos, endPos, line: err.line - 1 });
    }
    return err; // if no errors, returns undefined
};
//# sourceMappingURL=linter.js.map