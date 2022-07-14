import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import './Dice.css'

export default forwardRef((props: { n: number }, ref) => {

  const [n, setN] = useState<number | null>();

  useEffect(() => {
    (ref as any).current.roll = () => { setN(Math.floor(Math.random() * 6 + 1)) };
  }, [ref]);

  const pips = [];
  for (let i = 0; i < (n ?? 0); i++) {
    pips.push(<div className="dice-pip" key={i}></div>);
  }

  return (
    <div className="dice-face">
      <div className="dice-inner">
        {pips}
      </div>
    </div>
  );

});
