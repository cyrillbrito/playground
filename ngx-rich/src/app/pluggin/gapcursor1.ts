import { keydownHandler } from 'prosemirror-keymap';
import { EditorState, NodeSelection, Plugin, TextSelection, Transaction } from 'prosemirror-state';
import { Decoration, DecorationSet, EditorView } from 'prosemirror-view';
import { GapCursor2 } from './gapcursor';


// :: () → Plugin
// Create a gap cursor plugin. When enabled, this will capture clicks
// near and arrow-key-motion past places that don't have a normally
// selectable position nearby, and create a gap cursor selection for
// them. The cursor is drawn as an element with class
// `ProseMirror-gapcursor`. You can either include
// `style/gapcursor.css` from the package's directory or add your own
// styles to make it visible.
export const gapCursor = function () {
  return new Plugin({
    props: {
      decorations: drawGapCursor,

      createSelectionBetween(view, $anchor, $head): GapCursor2 {

        // console.log(view.state.selection);
        if (view.state.selection instanceof GapCursor2) {
          debugger
        }

        if ($anchor.pos == $head.pos && GapCursor2.valid($head))
          return new GapCursor2($head);
        else
          return undefined;
      },

      handleClick,
      handleKeyDown
    }
  })
}

export { GapCursor2 as GapCursor }

const handleKeyDown = keydownHandler({
  "ArrowLeft": arrow("horiz", -1),
  "ArrowRight": arrow("horiz", 1),
  "ArrowUp": arrow("vert", -1),
  "ArrowDown": arrow("vert", 1)
})

function arrow(axis, dir) {
  let dirStr = axis == "vert" ? (dir > 0 ? "down" : "up") : (dir > 0 ? "right" : "left");
  let last = false;
  return function (state: EditorState, dispatch?: (tr: Transaction) => void, view?: EditorView): boolean {
    // let sel = state.selection
    // let $start = dir > 0 ? sel.$to : sel.$from, mustMove = sel.empty
    // if (sel instanceof TextSelection) {
    //   if (!view.endOfTextblock(dirStr) || $start.depth == 0) return false
    //   mustMove = false
    //   $start = state.doc.resolve(dir > 0 ? $start.after() : $start.before())
    // }
    // let $found = GapCursor.findFrom($start, dir, mustMove)
    // if (!$found) return false
    // if (dispatch) dispatch(state.tr.setSelection(new GapCursor($found)))

    // if (last) {
    //   debugger
    // }
    // last = false;


    let sel = state.selection;
    if (!(sel instanceof TextSelection)) {
      return false;
    }



    let resolvedPos1 = dir > 0 ? sel.$to : sel.$from;
    console.log(resolvedPos1.pos);
    if (resolvedPos1.parent.type.name !== 'container') {
      return false;
    }

    const resolvedPos2 = state.doc.resolve(resolvedPos1.pos + dir);
    if (resolvedPos2.parent.type.name === 'container' || resolvedPos1.depth <= resolvedPos2.depth) {
      return false;
    }

    const resolvedPos3 = state.doc.resolve(resolvedPos2.pos + dir);
    if (resolvedPos3.parent.type.name !== 'container' || resolvedPos2.depth <= resolvedPos3.depth) {
      return false;
    }

    // const pos = dir > 0 ? $start.after() : $start.before();
    console.log(
      resolvedPos1.parent.type.name,
      resolvedPos1.pos,
      resolvedPos2.parent.type.name,
      resolvedPos2.pos,
      resolvedPos3.parent.type.name, resolvedPos3.pos
    )

    if (dispatch) {
      console.log('DIST');

      // let tr = state.tr.insertText(' ', resolvedPos3.pos);
      // tr = tr.setSelection(TextSelection.create(tr.doc, resolvedPos3.pos - 2, resolvedPos3.pos - 2));

      // dispatch(tr);
      // dispatch(state.tr.setSelection(TextSelection.create(state.doc, resolvedPos3.pos - 1, resolvedPos3.pos )))
      dispatch(state.tr.setSelection(new GapCursor2(resolvedPos3)))
    }

    last = true;
    return true;
  }
}

function handleClick(view, pos, event) {
  if (!view.editable) return false
  let $pos = view.state.doc.resolve(pos)
  if (!GapCursor2.valid($pos)) return false
  let { inside } = view.posAtCoords({ left: event.clientX, top: event.clientY })
  if (inside > -1 && NodeSelection.isSelectable(view.state.doc.nodeAt(inside))) return false
  view.dispatch(view.state.tr.setSelection(new GapCursor2($pos)))
  return true
}

function drawGapCursor(state) {
  if (!(state.selection instanceof GapCursor2)) return null
  let node = document.createElement("div")
  node.className = "ProseMirror-gapcursor2"
  return DecorationSet.create(state.doc, [Decoration.widget(state.selection.head, node, { key: "gapcursor" })])
}
