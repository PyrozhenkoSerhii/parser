import {parse} from "./arithmetics";
import fs from "fs"

const code = fs.readFileSync('tests/math.js').toString();

console.log('Code:', code);

console.log(parse(code));