import { keydownHandler } from 'prosemirror-keymap';
import { EditorState, NodeSelection, Plugin, TextSelection, Transaction } from 'prosemirror-state';
import { Node as ProsemirrorNode } from 'prosemirror-model';
import { Decoration, DecorationSet, EditorView } from 'prosemirror-view';
import { MathCursor } from './mathcursor';

export const mathCursor = function () {
  return new Plugin({
    props: {
      decorations: state => {
        if (state.selection instanceof MathCursor) {
          const node = document.createElement("div")
          node.className = "ProseMirror-mathcursor"
          const decoration = Decoration.widget(state.selection.head, node, { key: "mathcursor" })
          return DecorationSet.create(state.doc, [decoration])
        }
        return null;
      },
      handleKeyDown: keydownHandler({
        "ArrowLeft": arrow(-1),
        "ArrowRight": arrow(1),
        "ArrowUp": arrow(-1),
        "ArrowDown": arrow(1)
      })
    }
  })
}

function arrow(dir: number) {

  return function (state: EditorState, dispatch?: (tr: Transaction) => void, view?: EditorView): boolean {

    const $currPos = dir > 0 ? state.selection.$to : state.selection.$from;
    const $nextNextPos = state.doc.resolve($currPos.pos + dir * 4);

    // If there is a depth change of 4 it means it is on the edged of two containers
    if ($currPos.depth - $nextNextPos.depth === 4) {

      if (dispatch) {
        console.log('DIST');
        const resolvedPos3 = state.doc.resolve($currPos.pos + dir * 2);
        dispatch(state.tr.setSelection(new MathCursor(resolvedPos3)))
      }

      return true;
    }

    return false;
  }
}


export const PluginSpacer = new Plugin({
  props: {
    decorations(state) {
      const decorations: Decoration[] = []
      TreeParse(state.doc, decorations);
      return DecorationSet.create(state.doc, decorations);
    },
  },
});

function TreeParse(parent: ProsemirrorNode, decorations: Decoration[]): void {

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
