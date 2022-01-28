import { EditorState, Plugin } from 'prosemirror-state';
import { Decoration, DecorationSet, EditorView } from 'prosemirror-view';
import { sqrtMain, sqrtSize1, sqrtSize2, sqrtSize3, sqrtSize4, sqrtTall } from '../sqrt-svg/sqrt-paths';


// TODO Improvement, track the sqrt in the doc so that the update
// doesn't require a brute force search for the sqrt.


/**
 * Plugin creates the SVG element that renders the Square root,
 * and also maintains the correct sizings.
 */
export const PluginSqrt = new Plugin({
  props: {
    decorations: createDecorations,
  },
  view: view => ({
    update: updateSqrtSvg,
  })
});

function createDecorations(state: EditorState): DecorationSet {

  const decorations: Decoration[] = []

  state.doc.descendants((node, pos) => {
    if (node.type.name === 'sqrt') {
      decorations.push(Decoration.widget(pos + 1, createSqrtSvg));
    }
    return true;
  });

  return DecorationSet.create(state.doc, decorations);
}

function createSqrtSvg(view: EditorView, getPos: () => number): globalThis.Node {

  const svgDOM = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svgDOM.setAttribute('preserveAspectRatio', 'xMinYMin slice');

  const pathDOM = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  svgDOM.appendChild(pathDOM);

  return svgDOM;
}

function updateSqrtSvg(view: EditorView, prevState: EditorState): void {

  view.state.doc.descendants((node, pos) => {
    if (node.type.name === 'sqrt') {

      const dom = view.nodeDOM(pos);

      const svgDOM = dom.firstChild as SVGElement;
      const pathDOM = svgDOM.firstChild as SVGPathElement;
      const contentDOM = dom.lastChild as HTMLElement;

      // TODO This is very hardcoded
      const fontSizeSrt:string = (document.getElementsByTagName('app-root')[0] as any).style.fontSize;
      const fontSize = Number(fontSizeSrt.split('px')[0]);


      const contentW = (contentDOM.offsetWidth / fontSize) || 1;
      const contentH = (contentDOM.offsetHeight / fontSize) || 1;

      const sqrtW = .9 + contentW + .1;
      const sqrtH = contentH + .1;

      svgDOM.setAttribute('width', `${sqrtW}em`);
      svgDOM.setAttribute('height', `${sqrtH}em`);

      svgDOM.setAttribute('viewBox', `0 0 400000 ${contentH * 1000}`);

      let points: any;
      const viewBoxHeight = contentH * 1000;
      if (viewBoxHeight < 1300) {
        points = sqrtMain();
      } else if (viewBoxHeight < 1700) {
        points = sqrtSize1();
      } else if (viewBoxHeight < 2200) {
        points = sqrtSize2();
      } else if (viewBoxHeight < 2800) {
        points = sqrtSize3();
      } else if (viewBoxHeight < 3300) {
        points = sqrtSize4();
      } else {
        points = sqrtTall(viewBoxHeight);
      }

      pathDOM.setAttribute('d', points);
    }

    return true;
  });
}
