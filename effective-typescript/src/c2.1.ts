

class Square {
  width: number
}

type TSquareConstructor = typeof Square;
type TSquare = InstanceType<TSquareConstructor>;

const constructor: { new(): Square } = null as any;

((t1: TSquareConstructor) => { })(constructor)
