/**
 * Recursive Descent Parser Implementation
 * 
 * Custom lexer is used to create a list of tokens
 * Check: '../src/lexer.js'
 * 
 * Backus-Naur Form notation is used for syntax description
 * https://en.wikipedia.org/wiki/Backus%E2%80%93Naur_form
 */

import { lexer } from "./lexer"
import { tokensIds } from "./tokens"

class Parser {
  constructor(path: string) {
    this.tokens = lexer(path || process.env.FILE_PATH || 'tests/math.js');
    this.position = 0;
  }


  /**
   * Entry point for the algorithm
   */
  parse = () => {
    const lexems = this.tokens.map((token) => {
      return token.lexeme;
    })
    console.log(`Expression: ${lexems.join(" ")}`)

    console.log('Found tokens: ')
    console.table(this.tokens);

    const result = this.expression();
    const validLexems = lexems.slice(0, this.position);

    console.log(`Valid expression: ${validLexems.join(" ")}`)
    console.log(`Operation result: ${result}`);
  }


  /**
   * Check the token at current 'position'
   * If it matches, move to the next character and return 'true'
   */
  checkTokenAtPosition = (expected: string): string | null => {
    if (this.position === this.tokens.length) {
      // console.log('>>  Finished recursive descending');
      return null;
    }

    // console.log(`>>  Expected ${expected} at position ${this.position} >> Actual: ${this.tokens[this.position].type} with value ${this.tokens[this.position].lexeme}`)

    if (this.position < this.tokens.length && this.tokens[this.position].type === expected) {
      const lexeme = this.tokens[this.position].lexeme;
      this.position += 1;
      return lexeme
    }
    return null;
  }


  /**
   * Call function while it is provided
   * If function check fails, get back to the pointer position before function execution
   * Both zero and multiple function calls are valid since we have one of the following grammar rules:
   * (('+' | '-') sequence)*
   * (('/' | '*') terminal)*
   */
  descendRecursive = (func: Function): boolean => {
    while (true) {
      const checkpoint = this.position;

      if (!func()) {
        this.position = checkpoint;
        return true;
      }
    }
  }


  /**
   * Function that work as a start for descending recursive algorithm
   * Matches the following grammar rule: 
   * expression: sequence (('+' | '-') sequence)*
   */
  expression = () => {
    let leftSequence = this.sequence();

    if (!leftSequence && leftSequence !== 0) return null;

    const validSyntax = this.descendRecursive(() => {
      const operator = this.checkTokenAtPosition(tokensIds.ADDITION) || this.checkTokenAtPosition(tokensIds.SUBSTRACTION);
      if (!operator) return false;

      
      const rightSequence = this.sequence();
      if (rightSequence || rightSequence === 0) {
        switch (operator) {
          case "+":
            leftSequence += rightSequence;
            break;
          case "-":
            leftSequence -= rightSequence;
            break;
        }
        return true;
      }
    })

    if (validSyntax) {
      return Number(leftSequence);
    }
  }


  /**
   * Function that matches the following grammar rule: 
   * expression: terminal (('*' | '/') terminal)*
   */
  sequence = () => {
    let leftTerminal = this.terminal();

    if (!leftTerminal && leftTerminal !== 0) return null

    const validSyntax = this.descendRecursive(() => {
      const operator = this.checkTokenAtPosition(tokensIds.DIVISION) || this.checkTokenAtPosition(tokensIds.MULTIPLICATION);
      if (!operator) return false;

      const rightTerminal = this.terminal();

      if (rightTerminal || rightTerminal === 0) {
        switch (operator) {
          case "*":
            leftTerminal *= rightTerminal;
            break;
          case "/":
            leftTerminal /= rightTerminal;
            break;
        }
        return true;
      }
    })


    if (validSyntax) return Number(leftTerminal);
  }


  /**
   * Function that matches the following grammar rule: 
   * terminal: number | '(' expression ')'
   */
  terminal = (): string | number | null => {
    const checkpoint = this.position;

    /**
     * Matching with the left part of the grammar rule: number
     * If not matched, get back to the pointer position before function execution
     * Otherwise, return value
     */
    const numValue = this.checkTokenAtPosition(tokensIds.NUM);
    if (numValue) {
      return Number(numValue);
    }
    this.position = checkpoint;

    /**
     * Matching with the right part of the grammar rule: '(' expression ')'
     * If not matched, get back to the pointer position before function execution
     * Otherwise, return value
     */
    const leftParenthesis = this.checkTokenAtPosition(tokensIds.LEFT_PARENTHESIS);
    const expressionValue = this.expression();
    const rightParenthesis = this.checkTokenAtPosition(tokensIds.RIGHT_PARENTHESIS);
    if (leftParenthesis && (expressionValue ||  expressionValue === 0) && rightParenthesis) {
      return expressionValue;
    }
    this.position = checkpoint;

    /**
     * Nothing was matched - error in the expression
     */
    return null;
  }
}


const parser = new Parser('tests/math.js');
parser.parse();

