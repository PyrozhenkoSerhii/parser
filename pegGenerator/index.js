import {parse} from "./arithmetics";
import fs from "fs"

const code = fs.readFileSync('tests/math.js').toString();

console.log(code);

console.log(parse(code));