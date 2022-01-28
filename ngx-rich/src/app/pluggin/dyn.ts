import { Node, NodeSpec } from 'prosemirror-model';
import { EditorState, TextSelection, Transaction } from 'prosemirror-state';
import { Decoration, DecorationSet, EditorView, NodeView } from 'prosemirror-view';
import { OurMathSchema } from '../editor.component';


export const DynNodeSpec: NodeSpec = {
  group: "math",
  content: "text*",
  parseDOM: [{ tag: "dyn" }],
  toDOM: () => ['dyn', 0],
  inline: true,
};

export function InsertDyn(state: EditorState<OurMathSchema>, dispatch?: (tr: Transaction<OurMathSchema>) => void, view?: EditorView<OurMathSchema>): boolean {

  const { $from, $to } = state.selection;

  if ($from.depth !== $to.depth) {
    return false;
  }

  if (!dispatch) {
    return true;
  }

  const type = state.schema.nodes.dyn;

  const dynNode = type.create(null, state.schema.text('20'));

  let tr = state.tr;
  tr = tr.replaceSelectionWith(dynNode);
  tr = tr.setSelection(new TextSelection(tr.doc.resolve($to.pos + 2)));

  dispatch(tr);
  return true;
}

export class DynNodeView implements NodeView {

  dom?: HTMLElement;
  contentDOM?: HTMLElement;

  constructor(node: Node, view: EditorView, getPos: boolean | (() => number)) {

    this.dom =this.contentDOM= document.createElement('dyn');

  }

  update(node: Node, decorations: Decoration[], innerDecorations: DecorationSet) {
    // console.log('update');
    // if (node.type.name != 'fraction') return false
    // if (node.content.size > 0) this.dom.classList.remove('empty')
    // else this.dom.classList.add('empty');
    return true
  }

  selectNode(): void {
    console.log('selectNode');
    
    this.dom.style.height = this.dom.textContent + 'px';
  }

  // deselectNode(): void {
  //   console.log('deselectNode');
  // }

  setSelection(anchor: number, head: number, root: Document): void {
    console.log('setSelection');
    
    this.dom.style.height = this.dom.textContent + 'px';
  }

  // stopEvent(event: Event) {
  //   console.log('stopEvent');
  //   return true
  // }

  // ignoreMutation(p: MutationRecord | { type: 'selection', target: Element }): boolean {
  //   console.log('ignoreMutation');
  //   return false
  // }

  // destroy(): void {
  //   console.log('destroy');
  // }
}
