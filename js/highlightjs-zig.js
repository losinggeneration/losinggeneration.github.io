/*
Language: Zig
Author: Harley Laue <losinggeneration@gmail.com> Khairul Hidayat <me@khairul.my.id>, Nelson Sylvest*r Fritsch <info@nelsonfritsch.de>, Hugo Locurcio <hugo.locurcio@hugo.pro>
Description: Zig programming language
*/

var module = module ? module : {};   // shim for browser use

function hljsDefineZig(hljs) {
  var KEYWORDS = {
    keyword:
      'align allowzero and asm async await break catch comptime ' +
      'const continue defer else enum errdefer error export ' +
      'extern fn for if inline nakedcc noalias or ' +
      'orelse packed promis pub resume return linksecetion ' +
      'stdcallc struct suspend switch test threadlocal ' +
      'try union unreachable usingnamespace var ' +
      'volatile while',
    literal:
      'true false null undefined'
  };

  var hex = '[0-9a-fA-F]',
      char_escape = '(\\\\x' + hex + '{2})|' +
        '(\\\\u\\{' + hex + '+\\})|(\\\\[nrt\'"])';

  return {
    name: 'Zig',
    aliases: ['zig'],
    keywords: KEYWORDS,
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      {
        className: 'number',
        variants: [
          {begin: '0b[01]+'},
          {begin: '0o[0-7]+'},
          {begin: '0o[0-7]+'},
          {begin: '0x' + hex + '+'}
        ]
      },
      hljs.NUMBER_MODE,
      {
        className: 'string',
        variants: [
          {begin: 'c?"[^\\"\\n]*"'},
          {begin: 'c?\\\\\\\\.*$'},
        ]
      },
      hljs.QUOTE_STRING_MODE,
      {
        className: 'quote', begin: "'" + char_escape + '|.' + "'"
      },
      {
        className: 'built_in', begin: '@[A-Za-z_][A-Za-z0-9_]*'
      },
      {
        className: 'function',
        beginKeywords: 'fn', end: '\\s*(\\{|$)', excludeEnd: true,
        contains: [
          hljs.TITLE_MODE,
          {
            className: 'params',
            begin: /\(/, end: /\)/,
            keywords: KEYWORDS,
            illegal: /["']/
          }
        ]
      }
    ]
  };
}

module.exports = function(hljs) {
  hljs.registerLanguage('zig', hljsDefineZig);
};

module.exports.definer = hljsDefineZig;
