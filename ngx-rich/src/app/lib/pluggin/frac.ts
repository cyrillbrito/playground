import { Node as ProsemirrorNode, NodeSpec } from 'prosemirror-model';
import { EditorState, Transaction } from 'prosemirror-state';
import { Decoration, DecorationSet, EditorView, NodeView } from 'prosemirror-view';
import { OurMathSchema } from '../editor.component';


export const FracNodeSpec: NodeSpec = {
  group: "math",
  content: 'container{2}',
  parseDOM: [{ tag: "fraction" }],
  inline: true,
};

export function InsertFrac(state: EditorState<OurMathSchema>, dispatch: (p: Transaction<OurMathSchema>) => void, view: EditorView<OurMathSchema>, event: Event) {

  if (!dispatch) {
    // This is a test, in the code examples there was this validation
    // I don't know if this is useful
    debugger;
    console.error('!dispach test')
  }

  const containerType = state.schema.nodes.container;
  const fracType = state.schema.nodes.frac;

  const topContainer = containerType.createChecked();
  const bottomContainer = containerType.createChecked();

  const { from, to } = state.selection;
  if (from !== to) {
    const slice = state.doc.slice(state.selection.from, state.selection.to);
    topContainer.content = slice.content;
  }

  const fracNode = fracType.createChecked(null, [topContainer, bottomContainer]);

  let transaction = state.tr.replaceSelectionWith(fracNode)

  if (from !== to) {
    console.log(to + 3);
    // newTr = newTr.setSelection(TextSelection.create(newTr.doc, to+5));
  }

  dispatch(transaction);
}

export class FracNodeView implements NodeView {

  dom?: Element;
  contentDOM?: Node;

  constructor(node: ProsemirrorNode, view: EditorView, getPos: boolean | (() => number)) {

    this.dom = document.createElement('frac');
    this.contentDOM = document.createElement('content');
    const blankDOM = document.createElement('blank');

    this.dom.appendChild(this.contentDOM);
    this.dom.appendChild(blankDOM);
  }

  update(node: ProsemirrorNode, decorations: Decoration[], innerDecorations: DecorationSet) {
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
