# shunting-yard-typescript

Simple implementation of Dijkstra's shunting yard algorithm in Typescript.

## Usage

`npm i shunting-yard-typescript`

```ts
import { shuntingYard, evaluateRPN } from "shunting-yard-typescript"
```

See the tests (`./test/index.test.ts`) for examples.

## Design

Since this was implemented mostly for pedagogical use, there's no support for functions or operators with arity not equal to two. (i.e. non-infix operators).  Both functions are non-total (i.e. partial).  However, they are implemented in a somewhat-functional syntax.

Tokens operate as strings, so this supports non-numerical fields with 2-arity operators such as sets or Boolean algebra.


