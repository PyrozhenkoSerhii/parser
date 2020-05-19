/**
 * Recursive Descent Parser Implementation
 */

import { lexer } from "./lexer"
import { tokensIds } from "./tokens"

class Parser {
  constructor() {
    this.tokens = lexer(process.env.FILE_PATH || 'tests/math.lang');
    this.position = 0;
  }

  /**
   * Entry point for the algorithm
   */
  parse = () => {
    console.table(this.tokens);
    console.log(this.expr() ? this.tokens.slice(0, this.position) : null);
  }

  /**
   * Check the token at current 'position'
   * If it matches, move to the next character and return 'true'
   */
  checkTokenAtPosition = (expected: string): boolean => {
    if(this.position === this.tokens.length) {
      console.log('>>  Finished recursive descending');
      return false;
    }

    console.log(`>>  Expected ${expected} at position ${this.position} >> Actual: ${this.tokens[this.position].type} with value ${this.tokens[this.position].lexeme}` )
    
    if (this.position < this.tokens.length && this.tokens[this.position].type === expected) {
      this.position += 1;
      return true;
    }
    return false;
  }

  /**
   * Call function while it is provided
   * If function check fails, get back to the pointer position before function execution
   * Both zero and multiple function calls are valid since we have of the following grammar rules:
   * (('+' | '-') term)*
   * (('/' | '*') operand)*
   */
  descendRecursive = (func: Function): boolean => {
    while (true) {
      const checkpoint = this.position;

      if(!func()) {
        this.position = checkpoint;
        return true;
      }
    }
  }

  /**
   * Function that work as a start for descending recursive algorithm
   * Matches the following grammar rule: 
   * expr: term (('+' | '-') term)*
   */
  expr = () => {
    return this.term() && this.descendRecursive(() => {
      const rightToken = this.checkTokenAtPosition(tokensIds.ADDITION) || this.checkTokenAtPosition(tokensIds.SUBSTRACTION);
      return rightToken && this.term();
    })
  }

  /**
   * Function that matches the following grammar rule: 
   * expr: operand (('*' | '/') operand)*
   */
  term = () => {
    return this.operand() && this.descendRecursive(() => {
      const rightToken = this.checkTokenAtPosition(tokensIds.DIVISION) || this.checkTokenAtPosition(tokensIds.MULTIPLICATION);
      return rightToken && this.operand();
    })
  }

  /**
   * Function that matches the following grammar rule: 
   * expr: operand: number | '(' expr ')'
   */
  operand = (): boolean => {
    const checkpoint = this.position;

    // matched left part of | rule
    if (this.checkTokenAtPosition(tokensIds.NUM)) {
      return true;
    } else {
      this.position = checkpoint;
    }
 
    // matched right part of | rule
    if (this.checkTokenAtPosition(tokensIds.LEFT_PARENTHESIS) && this.expr() && this.checkTokenAtPosition(tokensIds.RIGHT_PARENTHESIS)) {
      return true;
    } else {
      this.position = checkpoint;
    }

    // zero match
    return false;
  }
}

const parser = new Parser();
parser.parse();

