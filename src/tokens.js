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

export const tokensIds = {
  IF: "IF",
  WHILE_LOOP: "WHILE_LOOP",
  FOR_LOOP: "FOR_LOOP",
  LEFT_PARENTHESIS: "LEFT_PARENTHESIS",
  RIGHT_PARENTHESIS: "RIGHT_PARENTHESIS",
  LEFT_BRACKET: "LEFT_BRACKET",
  RIGHT_BRACKET: "RIGHT_BRACKET",
  SEMICOLON: "SEMICOLON",
  NUM: "NUM",
  STRING: "STRING",
  ID: "ID",
  ASSIGN: "ASSIGN",
  CONSTANT: "CONSTANT",
  VARIABLE: "VARIABLE",
  ADDITION: "ADDITION",
  SUBSTRACTION: "SUBSTRACTION",
  MULTIPLICATION: "MULTIPLICATION",
  DIVISION: "DIVISION",
  EQUAL: "EQUAL",
  LESS_THAN: "LESS_THAN",
  GREATER_THAN: "GREATER_THAN",
}