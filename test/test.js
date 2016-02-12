//NOTE: force enabling of the chalk before any dependency is loaded
require('chalk').enabled = true;

var assert    = require('assert');
var highlight = require('../');

function testFunc () {
    var re    = /(.+) awesome$/;
    var match = 'You are awesome'.match(re);

    return match[1];
}

var code = testFunc.toString();

it('Should highlight code', function () {
    var expected = '\u001b[36mfunction\u001b[39m testFunc\u001b[90m(\u001b[39m\u001b[90m)\u001b[39m \u001b[90m{\u001b[39m\n' +
                   '    \u001b[36mvar\u001b[39m re    \u001b[90m=\u001b[39m \u001b[35m/(.+) awesome$/\u001b[39m\u001b[90m;\u001b[39m\n' +
                   '    \u001b[36mvar\u001b[39m match \u001b[90m=\u001b[39m \u001b[32m\'You are awesome\'\u001b[39m\u001b[90m.\u001b[39mmatch\u001b[90m(\u001b[39mre\u001b[90m)\u001b[39m\u001b[90m;\u001b[39m\n' +
                   '\n' +
                   '    \u001b[36mreturn\u001b[39m match\u001b[90m[\u001b[39m\u001b[35m1\u001b[39m\u001b[90m]\u001b[39m\u001b[90m;\u001b[39m\n' +
                   '\u001b[90m}\u001b[39m';

    assert.strictEqual(highlight(code), expected);
});

it('Should highlight code with custom renderer', function () {
    var renderer = ['string', 'punctuator', 'keyword', 'number', 'regex', 'comment', 'invalid'].reduce(function (rend, tokenType) {
        rend[tokenType] = function (str) {
            return '<' + tokenType + '>' + str + '</' + tokenType + '>';
        };

        return rend;
    }, {});

    var expected = '<keyword>function</keyword> testFunc<punctuator>(</punctuator><punctuator>)</punctuator> <punctuator>{</punctuator>\n' +
                   '    <keyword>var</keyword> re    <punctuator>=</punctuator> <regex>/(.+) awesome$/</regex><punctuator>;</punctuator>\n' +
                   '    <keyword>var</keyword> match <punctuator>=</punctuator> <string>\'You are awesome\'</string><punctuator>.</punctuator>match<punctuator>(</punctuator>re<punctuator>)</punctuator><punctuator>;</punctuator>\n' +
                   '\n' +
                   '    <keyword>return</keyword> match<punctuator>[</punctuator><number>1</number><punctuator>]</punctuator><punctuator>;</punctuator>\n' +
                   '<punctuator>}</punctuator>';

    assert.strictEqual(highlight(code, renderer), expected);
});
