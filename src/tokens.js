export const tokens = {
  "IF": /if/,
  "WHILE_LOOP": /while/,
  "FOR_LOOP": /for/,

  "LEFT_PARENTHESIS": /\(/,
  "RIGHT_PARENTHESIS": /\)/,
  "LEFT_BRACKET": /\{/,
  "RIGHT_BRACKET": /\}/,
  "SEMICOLON": /\;/,

  "NUM": /[0-9]+$/,
  "STRING": /('|")\w+('|")/,

  "ID": /([a-zA-Z]+[0-9]*)+\b(?<!\b(while|if|for))/,

  "ASSIGN": /=/,
  "CONSTANT": /const/,
  "VARIABLE": /(let|var)/,

  "ADDITION": /\+/,
  "SUBSTRACTION": /\-/,
  "MULTIPLICATION": /\*/,
  "DIVISION": /\//,

  "EQUAL": /(==|===)/,
  "LESS_THAN": /</,
  "GREATER_THAN": />/,
}