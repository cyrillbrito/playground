



const vbPad = 80;   // padding above the surd, measured inside the viewBox.
const emPad = 0.08; // padding, in ems, measured in the document.

const hLinePad = 80;  // padding above a sqrt viniculum. Prevents image cropping.



export const makeSqrtImage = function (
  height: number,
) {
  const spanHeight = height + emPad;
  const viewBoxHeight = Math.floor(1000 * height) + vbPad;
  return sqrtTall(spanHeight, viewBoxHeight);
};

const sqrtTall = function (
  hLinePad: number,
  viewBoxHeight: number
): string {

  const vertSegment = viewBoxHeight - 54 - hLinePad;

  return `M702 ${hLinePad}H40000040
H742v${vertSegment}l-4 4-4 4c-.667.7 -2 1.5-4 2.5s-4.167 1.833-6.5 2.5-5.5 1-9.5 1
h-12l-28-84c-16.667-52-96.667 -294.333-240-727l-212 -643 -85 170
c-4-3.333-8.333-7.667-13 -13l-13-13l77-155 77-156c66 199.333 139 419.667
219 661 l218 661zM702 ${hLinePad}H400000v40H742z`;
};