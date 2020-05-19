import fs from "fs";
import { tokens } from "./tokens"
import { type TToken } from "../types/token"

const isDivider = (char: string): boolean => {
  const dividerRegex = /(\n|\s+|\t)/;
  return dividerRegex.test(char);
}

export const lexer = (path: string): Array<TToken> => {
  const code = fs.readFileSync(path).toString();
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


  const foundTokens: Array<TToken> = [];
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

  return foundTokens;
}