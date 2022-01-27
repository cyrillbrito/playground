import { Node, NodeSpec, ResolvedPos } from 'prosemirror-model';
import { EditorState, TextSelection, Transaction, NodeSelection, } from 'prosemirror-state';
import { Decoration, DecorationSet, EditorView, NodeView } from 'prosemirror-view';
import { OurMathSchema } from '../editor.component';
import { sqrtMain, sqrtTall } from '../sqrt-svg/sqrt-paths';


export const SqrtNodeSpec: NodeSpec = {
  group: "math",
  content: 'container',
  parseDOM: [{ tag: "sqrt" }],
  toDOM() { return ["sqrt", 0] },
  inline: true,
};


export function InsertSqrt(state: EditorState<OurMathSchema>, dispatch?: (tr: Transaction<OurMathSchema>) => void, view?: EditorView<OurMathSchema>): boolean {

  const { $from, $to } = state.selection;

  if ($from.depth !== $to.depth) {
    return false;
  }

  if (!dispatch) {
    return true;
  }

  const containerType = state.schema.nodes.container;
  const sqrtType = state.schema.nodes.sqrt;

  const containerNode = containerType.create();
  if ($from.pos !== $to.pos) {
    const slice = state.doc.slice($from.pos, $to.pos);
    containerNode.content = slice.content;
  }

  const sqrtNode = sqrtType.create(null, [containerNode]);

  let tr = state.tr;
  tr = tr.replaceSelectionWith(sqrtNode);
  tr = tr.setSelection(new TextSelection(tr.doc.resolve($to.pos + 2)));


  dispatch(tr);
  return true;
}

export class SqrtNodeView implements NodeView {

  dom?: HTMLElement;
  contentDOM?: HTMLElement;

  svg: SVGElement;
  path: SVGPathElement;

  fontSize = 16;

  constructor(node: Node, view: EditorView, getPos: boolean | (() => number)) {

    this.dom = document.createElement('sqrt');

    this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.svg.setAttribute('preserveAspectRatio', 'xMinYMin slice');
    this.dom.appendChild(this.svg);

    this.path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    this.svg.appendChild(this.path);

    this.contentDOM = document.createElement('content');
    this.dom.appendChild(this.contentDOM);

    this.updateHeight(0);

  }

  update(node: Node, decorations: Decoration[], innerDecorations: DecorationSet) {

    console.log('SQRT update');

    if (node.type.name !== 'sqrt') {
      return false;
    }

    this.updateHeight(this.contentDOM.clientHeight);

    return true;
  }

  private updateHeight(height: number): void {

    const contentW = (this.contentDOM.offsetWidth / this.fontSize) || 1;
    const contentH = (this.contentDOM.offsetHeight / this.fontSize) || 1;

    const sqrtW = .8 + contentW + .1;

    this.svg.setAttribute('width', `${sqrtW}em`);
    this.svg.setAttribute('height', `${contentH}em`);


    // Pixels to EM is /16 and the viewBox used by KaTex is em*1000
    this.svg.setAttribute('viewBox', `0 0 400000 ${contentH * 1000}`);

    let points: any;
    if (1250 < contentH * 1000) {
      points = sqrtTall(contentH * 1000);
    } else {
      points = sqrtMain();
    }

    this.path.setAttribute('d', points);
  }

  selectNode(): void {
    console.log('SQRT selectNode');
  }

  deselectNode(): void {
    console.log('SQRT deselectNode');
  }

  setSelection(anchor: number, head: number, root: Document): void {
    console.log('SQRT setSelection');
    // this.updateHeight(0);
  }

  stopEvent(event: Event) {
    console.log('SQRT stopEvent');
    return true
  }

  ignoreMutation(p: MutationRecord | { type: 'selection', target: Element }): boolean {
    console.log('SQRT ignoreMutation');
    return false
  }

  destroy(): void {
    console.log('SQRT destroy');
  }
}
