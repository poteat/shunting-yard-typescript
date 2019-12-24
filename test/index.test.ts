import _ from "lodash";
import {
  shuntingYard,
  evaluateRPN,
  OperatorDefinition,
  traceDebugOperations
} from "../src/index";

const calculatorOperations: OperatorDefinition = {
  "+": {
    func: (x, y) => `${Number(x) + Number(y)}`,
    arity: 2,
    priority: 1
  },
  "-": {
    func: (x, y) => `${Number(x) - Number(y)}`,
    arity: 2,
    priority: 1
  },
  "*": {
    func: (x, y) => `${Number(x) * Number(y)}`,
    arity: 2,
    priority: 2
  },
  "/": {
    func: (x, y) => `${Number(x) / Number(y)}`,
    arity: 2,
    priority: 2
  }
};

it("Calculator", () => {
  const rpn = shuntingYard(calculatorOperations)(
    "100 - ( 5 * 10 * ( 2 - 1 ) ) + 10".split(" ")
  );
  const result = evaluateRPN(calculatorOperations)(rpn);
  expect(result).toBe("60");
});

const {
  tracedDefinition: setTheoreticOperations,
  getDebugLog
} = traceDebugOperations({
  union: {
    func: (x, y) => _.union(x.split(","), y.split(",")).join(","),
    arity: 2,
    priority: 1
  },
  intersect: {
    func: (x, y) => _.intersection(x.split(","), y.split(",")).join(","),
    arity: 2,
    priority: 1
  }
});

it("Set Operations", () => {
  const rpn = shuntingYard(setTheoreticOperations)(
    "2,5,10,15 intersect ( 1,2,3 union 3,4,5,6 ) union 22".split(" ")
  );
  const result = evaluateRPN(setTheoreticOperations)(rpn);
  expect(result).toBe("2,5,22");

  const debugLog = getDebugLog();

  console.log(debugLog.map((x, i) => `Operation #${i + 1}:\t${x}`).join("\n"));
});
