
type AA = {
  t: string;
  option?: number;
}

const aa: AA = { t: '', a: 3 };

((aa: AA) => { })({ t: '', a: 3 })
