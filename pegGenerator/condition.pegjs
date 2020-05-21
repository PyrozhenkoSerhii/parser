Program = 
	variables: Assignment*
    operations: Operation*
    {
    	operations = operations.map((operation) => {
        let truthyCondition = false;

        switch(operation.type){
          case "if":
            variables.forEach((variable) => {
              if(variable.id !== operation.condition.id) return;

              switch (operation.condition.operator) {
                case ">": 
                  truthyCondition = variable.value > operation.condition.value
                  break;
                case "===":
                  truthyCondition = variable.value === operation.condition.value
                  break;
                case "<":
                  truthyCondition = variable.value < operation.condition.value
                  break;
                default:
                  truthyCondition = false;
              }
            });
            break;
        }

        return {...operation, truthy: truthyCondition };
      })
        
      // return changed variables
		  return operations.reduce((variables, operation) => {
        if(!operation.truthy) return variables;
            
			  return variables.map((variable, index) => {
				  return operation.body.leftOperand === variable.id && operation.body.operator === "="
            ? {...variable, value: operation.body.rightOperand }
            : variable;
			    }) 
		    }, variables)
    }
    
Assignment = Gap Identifier id:ID "=" value: Number ";"? Gap { 
    	return {id: id.toString(), value}
   	}
    
Operation = IfExpression // can be anything else, such as ForExpression, WhileExpression, etc.
    
IfExpression = Gap "if" Gap "(" condition: Condition ")" Gap "{" body: Body "}" ";"? {
	return { type: 'if', condition: condition, body: body };
   }
    
Condition = id:ID operator:Operator value:Number {
	return {id: id[0], operator, value};
  }

Identifier = Gap "const" / "let" / "var" Gap

Body = Gap left:ID operator:"=" right:Number ";"? Gap {  // currently, only assignment is used as an operator
		return {leftOperand: left[0], operator, rightOperand: right }
    }

Operator = Gap operator: ("===" / "==" / ">=" / "<=" / ">" / "<") Gap {return operator} 

ID = Gap id:[A-Za-z]+[A-Za-z0-9-_]* Gap {return id}

Number = Gap digits:[0-9.-]+ Gap { return Number(digits.join("")) }

Gap = [ \t\n\r]*


                                       
