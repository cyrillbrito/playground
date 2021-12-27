
const hasSomething = true;

const o1 = {
  ...(hasSomething ? { p1: 2 } : {})
}


