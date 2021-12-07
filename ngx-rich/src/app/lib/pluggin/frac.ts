import { Node as ProsemirrorNode, NodeSpec } from 'prosemirror-model';
import { Decoration, DecorationSet, EditorView, NodeView } from 'prosemirror-view';
import { schema } from '../schema';


export const FracNodeSpec: NodeSpec = {
  group: "math",
  content: 'formula{2}',
  // parseDOM: [{ tag: "fraction" }],
  // toDOM() { return ["fraction", 0] },
  inline: true,
};

export class FracNodeView implements NodeView<typeof schema> {

  dom?: Element;
  contentDOM?: Node;

  constructor(node: ProsemirrorNode<typeof schema>, view: EditorView<typeof schema>, getPos: boolean | (() => number)) {
    console.log('constructor');
    this.dom = this.contentDOM = document.createElement('fraction');
    // if (node.content.size == 0) this.dom.classList.add('empty')
  }

  update(node: ProsemirrorNode<typeof schema>, decorations: Decoration[], innerDecorations: DecorationSet) {
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
