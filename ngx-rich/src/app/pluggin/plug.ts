import { Node } from 'prosemirror-model';
import { Plugin } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';


export const PluginSelected = new Plugin({
  props: {
    decorations(state) {
      const selection = state.selection;
      const resolved = state.doc.resolve(selection.from);
      const decoration = Decoration.node(resolved.before(), resolved.after(), { class: 'selected' });
      return DecorationSet.create(state.doc, [decoration]);
    }
  }
});


export const PluginSpacer = new Plugin({
  props: {
    decorations(state) {
      const decorations: Decoration[] = []
      TreeParse(state.doc, decorations);
      return DecorationSet.create(state.doc, decorations);
    },
  },
});

function TreeParse(parent: Node, decorations: Decoration[]): void {

  parent.descendants((node, pos) => {
    if (node.type.name === 'container') {
      if (node.firstChild && node.firstChild.type.name !== 'text') {
        const caretNode = document.createElement('caret');
        caretNode.innerText = '-';
        decorations.push(Decoration.widget(
          pos + 1,
          caretNode
        ))
      }
      if (node.lastChild && node.lastChild.type.name !== 'text') {
        const caretNode = document.createElement('caret');
        caretNode.innerText = '-';
        decorations.push(Decoration.widget(
          pos + node.nodeSize - 1,
          caretNode
        ));
      }
    }

    return true;
  });
}
