import { Node as ProsemirrorNode, NodeSpec } from 'prosemirror-model';
import { EditorState, Transaction } from 'prosemirror-state';
import { Decoration, DecorationSet, EditorView, NodeView } from 'prosemirror-view';
import { OurMathSchema } from '../editor.component';
import { sqrtMain, sqrtTall } from '../sqrt-svg/sqrt-paths';


export const SqrtNodeSpec: NodeSpec = {
  group: "math",
  content: 'container',
  parseDOM: [{ tag: "sqrt" }],
  inline: true,
};

export function InsertSqrt(state: EditorState<OurMathSchema>, dispatch: (p: Transaction<OurMathSchema>) => void, view: EditorView<OurMathSchema>, event: Event) {

  if (!dispatch) {
    // This is a test, in the code examples there was this validation
    // I don't know if this is useful
    debugger;
    console.error('!dispach test')
  }

  const containerNode = state.schema.nodes.container.create();
  const sqrtNode = state.schema.nodes.sqrt.create(null, [containerNode]);

  let transaction = state.tr.replaceSelectionWith(sqrtNode);

  // const resolvedPos = transaction.doc.resolve(
  //   transaction.selection.anchor - transaction.selection.$anchor.nodeBefore.nodeSize
  // );
  // transaction.setSelection(new NodeSelection(resolvedPos));

  dispatch(transaction);
}

export class SqrtNodeView implements NodeView {

  dom?: HTMLElement;
  contentDOM?: HTMLElement;

  svg: SVGElement;
  path: SVGPathElement;

  fontSize = 16;

  constructor(node: ProsemirrorNode, view: EditorView, getPos: boolean | (() => number)) {

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

  update(node: ProsemirrorNode, decorations: Decoration[], innerDecorations: DecorationSet) {

    console.log('update');

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
    console.log('selectNode');
  }

  deselectNode(): void {
    console.log('deselectNode');
  }

  setSelection(anchor: number, head: number, root: Document): void {
    console.log('setSelection');
  }

  stopEvent(event: Event) {
    console.log('stopEvent');
    return true
  }

  ignoreMutation(p: MutationRecord | { type: 'selection', target: Element }): boolean {
    console.log('ignoreMutation');
    return false
  }

  destroy(): void {
    console.log('destroy');
  }
}
