import { Node, NodeSpec } from 'prosemirror-model';
import { EditorState, TextSelection, Transaction } from 'prosemirror-state';
import { Decoration, DecorationSet, EditorView, NodeView } from 'prosemirror-view';
import { OurMathSchema } from '../editor.component';


export const FracNodeSpec: NodeSpec = {
  group: "math",
  content: 'container{2}',
  parseDOM: [{ tag: "fraction" }],
  toDOM: node => ['frac', ['content', 0], ['blank']],
  inline: true,
};

export function InsertFrac(state: EditorState<OurMathSchema>, dispatch?: (tr: Transaction<OurMathSchema>) => void, view?: EditorView<OurMathSchema>): boolean {

  const { $from, $to } = state.selection;

  if ($from.depth !== $to.depth) {
    return false;
  }

  if (!dispatch) {
    return true;
  }

  const containerType = state.schema.nodes.container;
  const fracType = state.schema.nodes.frac;

  const topContainer = containerType.create();
  if ($from.pos !== $to.pos) {
    const slice = state.doc.slice($from.pos, $to.pos);
    topContainer.content = slice.content;
  }

  const bottomContainer = containerType.create();
  const fracNode = fracType.create(null, [topContainer, bottomContainer]);

  let tr = state.tr;
  tr = tr.replaceSelectionWith(fracNode);
  tr = tr.setSelection(TextSelection.create(tr.doc, $to.pos + 4));

  dispatch(tr);
  return true;
}

export class FracNodeView implements NodeView {

  dom?: HTMLElement;
  contentDOM?: HTMLElement;

  constructor(node: Node, view: EditorView, getPos: boolean | (() => number)) {

    this.dom = document.createElement('frac');
    this.contentDOM = document.createElement('content');
    const blankDOM = document.createElement('blank');

    this.dom.appendChild(this.contentDOM);
    this.dom.appendChild(blankDOM);
  }

  update(node: Node, decorations: Decoration[], innerDecorations: DecorationSet) {
    // console.log('update');
    // if (node.type.name != 'fraction') return false
    // if (node.content.size > 0) this.dom.classList.remove('empty')
    // else this.dom.classList.add('empty')
    return true
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
