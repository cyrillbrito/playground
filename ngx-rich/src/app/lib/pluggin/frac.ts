import { Node as ProsemirrorNode, NodeSpec } from 'prosemirror-model';
import { EditorState, TextSelection, Transaction } from 'prosemirror-state';
import { Decoration, DecorationSet, EditorView, NodeView } from 'prosemirror-view';


export const FracNodeSpec: NodeSpec = {
  group: "math",
  content: 'container{2}',
  parseDOM: [{ tag: "fraction" }],
  toDOM() { return ["fraction", 0] },
  inline: true,
};

export function insertFrac(state: EditorState, dispatch: (p: Transaction) => void, editorView: EditorView, event: Event) {

  const containerType = state.schema.nodes.container;
  const fracType = state.schema.nodes.frac;
  const placeholderType = state.schema.nodes.placeholder;

  if (!dispatch) {
    // This is a test, in the code examples there was this validation
    // I don't know if this is useful
    debugger;
    console.error('!dispach test')
  }

  const topContainer = containerType.create(null, placeholderType.create());
  const bottomContainer = containerType.create(null, placeholderType.create());

  const { from, to } = state.selection;
  if (from !== to) {
    const slice = state.doc.slice(state.selection.from, state.selection.to);
    topContainer.content = slice.content;
  }

  const fracNode = fracType.create(null, [topContainer, bottomContainer]);

  let newTr = state.tr.replaceSelectionWith(fracNode)

  if (from !== to) {
    console.log(to + 3);
    // newTr = newTr.setSelection(TextSelection.create(newTr.doc, to+5));
  }

  dispatch(newTr);

  return true
}


export class FracNodeView implements NodeView {

  dom?: Element;
  contentDOM?: Node;

  constructor(node: ProsemirrorNode, view: EditorView, getPos: boolean | (() => number)) {
    console.log('constructor');
    this.dom = this.contentDOM = document.createElement('fraction');
    // if (node.content.size == 0) this.dom.classList.add('empty')
  }

  update(node: ProsemirrorNode, decorations: Decoration[], innerDecorations: DecorationSet) {
    console.log('update');
    if (node.type.name != 'fraction') return false
    if (node.content.size > 0) this.dom.classList.remove('empty')
    else this.dom.classList.add('empty')
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
