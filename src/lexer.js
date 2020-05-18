import fs from "fs";
import { tokens } from "./tokens"

const isDivider = (char) => {
  const dividerRegex = /(\n|\s+|\t)/;
  return dividerRegex.test(char);
}

const lexer = (() => {
  const code = fs.readFileSync(process.env.FILE_PATH || '../tests/test1.lang').toString();
  const lines = code.split("\n").map((line) => {
    return `${line}\n`
  });
  const sequenceList = [];

  lines.forEach((line, lineIndex) => {
    let buffer = '';
    [...line].forEach((char) => {
      if (tokens.SEMICOLON.test(char)) {
        sequenceList.push({ line: lineIndex, value: buffer });
        sequenceList.push({ line: lineIndex, value: char });
        buffer = '';
      }
      else if (!isDivider(char)) {
        buffer = `${buffer}${char}`;
      } else {
        if (buffer) {
          sequenceList.push({ line: lineIndex, value: buffer });
          buffer = '';
        }
      }
    })
  })


  const foundTokens = [];
  sequenceList.forEach((sequence) => {
    let matchedToken = '';
    Object.entries(tokens).forEach(([tokenId, tokenRegex]) => {
      if (tokenRegex.test(sequence.value)) {
        matchedToken = tokenId;
      }
    })

    foundTokens.push({
      line: sequence.line,
      type: matchedToken || "SyntaxError: Unexpected indentifier",
      lexeme: sequence.value,
    })
  })

  console.table(foundTokens)
})();

