Expression
  = head:Sequence tail:(Gap ("+" / "-") Gap Sequence)* {
      return tail.reduce(function(result, element) {
        if (element[1] === "+") { return result + element[3]; }
        if (element[1] === "-") { return result - element[3]; }
      }, head);
    }

Sequence
  = head:Terminal tail:(Gap ("*" / "/") Gap Terminal)* {
      return tail.reduce(function(result, element) {
        if (element[1] === "*") { return result * element[3]; }
        if (element[1] === "/") { return result / element[3]; }
      }, head);
    }

Terminal
  = "(" Gap expr:Expression Gap ")" { return expr; }
  / Number

Number = Gap digits:[0-9.-]+ { return Number(digits.join("")) }

Gap = [ \t\n\r]*