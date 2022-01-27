import { Node  } from 'prosemirror-model';
import { Plugin } from 'prosemirror-state';
import { Decoration, DecorationSet, EditorView } from 'prosemirror-view';
import { sqrtMain, sqrtTall } from '../sqrt-svg/sqrt-paths';


export const PluginSqrt = new Plugin({
  props: {
    decorations(state) {
      const decorations: Decoration[] = []
      TreeParse(state.doc, decorations)
      console.log('decor')
      return DecorationSet.create(state.doc, decorations);
    },

  },
  view: view => {
    console.log('view')
    return {
      update: v2 => {
        v2.state.doc
        console.log('v2')

          TreeParse2(v2)
      },
      destroy: () => console.log('vDest'),
    };
  }
});

function TreeParse(parent: Node, decorations: Decoration[]): void {

  parent.descendants((node, pos) => {
    if (node.type.name === 'sqrt') {

      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('preserveAspectRatio', 'xMinYMin slice');

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      svg.appendChild(path);

      const contentW = 1;
      const contentH = 1;

      const sqrtW = .8 + contentW + .1;

      svg.setAttribute('width', `${sqrtW}em`);
      svg.setAttribute('height', `${contentH}em`);


      // Pixels to EM is /16 and the viewBox used by KaTex is em*1000
      svg.setAttribute('viewBox', `0 0 400000 ${contentH * 1000}`);

      let points: any;
      if (1250 < contentH * 1000) {
        points = sqrtTall(contentH * 1000);
      } else {
        points = sqrtMain();
      }

      path.setAttribute('d', points);


      decorations.push(Decoration.widget(
        pos + 1,
        svg,
        {}
      ))
    }

    return true;
  });
}

function TreeParse2(view: EditorView): void {

  view.state.doc.descendants((node, pos) => {
    if (node.type.name === 'sqrt') {

      const dom = view.nodeDOM(pos);
      // console.log(dom);

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