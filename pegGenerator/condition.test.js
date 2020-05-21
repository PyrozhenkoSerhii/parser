import {parse} from "./condition";
import fs from "fs"

const code = fs.readFileSync('tests/condition.js').toString();

console.log('>> Code:');
console.log(code);

console.log('>> Result:')
console.log(parse(code));