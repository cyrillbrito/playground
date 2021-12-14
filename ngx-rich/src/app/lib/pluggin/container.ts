import { Node as ProsemirrorNode, NodeSpec } from 'prosemirror-model';
import { EditorState, TextSelection, Transaction } from 'prosemirror-state';
import { Decoration, DecorationSet, EditorView, NodeView } from 'prosemirror-view';
import { schema } from '../schema';


export const ContainerNodeSpec: NodeSpec = {
  content: "placeholder|math+",
  parseDOM: [{ tag: "container" }],
  toDOM: () => ['container', 0],
  inline: true,


};


export class ContainerNodeView implements NodeView<typeof schema> {

  dom?: Element;
  contentDOM?: Node;

  constructor(node: ProsemirrorNode<typeof schema>, view: EditorView<typeof schema>, private getPos: boolean | (() => number)) {
    this.dom = this.contentDOM = document.createElement('container');
    this.dom.setAttribute('ola', 'adeus');
  }

  update(node: ProsemirrorNode<typeof schema>, decorations: Decoration[], innerDecorations: DecorationSet) {
    console.log('ContainerNodeView update');

    if (node.type.name !== 'container') {
      debugger;
      return false;
    }

    return true
  }

  selectNode(): void {
    console.log('ContainerNodeView selectNode');
  }

  deselectNode(): void {
    console.log('ContainerNodeView deselectNode');
  }

  setSelection(anchor: number, head: number, root: Document): void {
    console.log('ContainerNodeView setSelection', anchor, head, root, (this.getPos as any)());
  }

  stopEvent(event: Event) {
    console.log('ContainerNodeViewstopEvent');
    return true
  }

  ignoreMutation(p: MutationRecord | { type: 'selection', target: Element }): boolean {
    console.log('ContainerNodeView ignoreMutation');
    return false;
  }

  destroy(): void {
    console.log('ContainerNodeView destroy');
  }
}
