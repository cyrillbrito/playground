import { EditorState, Plugin } from 'prosemirror-state';
import { Decoration, DecorationSet, EditorView } from 'prosemirror-view';
import { sqrtMain, sqrtTall } from '../sqrt-svg/sqrt-paths';


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

  console.log(view.state.selection.$from.pos);

  view.state.doc.descendants((node, pos) => {
    if (node.type.name === 'sqrt') {

      const dom = view.nodeDOM(pos);

      const svgDOM = dom.firstChild as SVGElement;
      const pathDOM = svgDOM.firstChild as SVGPathElement;
      const contentDOM = dom.lastChild as HTMLElement;

      const fontSize = 16;

      const contentW = (contentDOM.offsetWidth / fontSize) || 1;
      const contentH = (contentDOM.offsetHeight / fontSize) || 1;

      const sqrtW = .8 + contentW + .1;

      svgDOM.setAttribute('width', `${sqrtW}em`);
      svgDOM.setAttribute('height', `${contentH}em`);

      // Pixels to EM is /16 and the viewBox used by KaTex is em*1000
      svgDOM.setAttribute('viewBox', `0 0 400000 ${contentH * 1000}`);

      let points: any;
      if (1250 < contentH * 1000) {
        points = sqrtTall(contentH * 1000);
      } else {
        points = sqrtMain();
      }

      pathDOM.setAttribute('d', points);
    }

    return true;
  });
}
