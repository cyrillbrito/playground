import { NodeSpec } from 'prosemirror-model';
import { EditorState, Transaction } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { OurMathSchema } from '../editor.component';


export const PowNodeSpec: NodeSpec = {
  group: "math",
  content: 'container',
  parseDOM: [{ tag: "pow" }],
  toDOM() { return ["pow", 0] },
  inline: true,
};

export function InsertPow(state: EditorState<OurMathSchema>, dispatch?: (tr: Transaction<OurMathSchema>) => void, view?: EditorView<OurMathSchema>): boolean {

  if (!dispatch) {
    return true;
  }

  const containerType = state.schema.nodes.container;
  const powType = state.schema.nodes.pow;

  const container = containerType.createChecked();

  const { from, to } = state.selection;
  if (from !== to) {
    const slice = state.doc.slice(state.selection.from, state.selection.to);
    container.content = slice.content;
  }

  const fracNode = powType.createChecked(null, [container]);

  let transaction = state.tr.replaceSelectionWith(fracNode)

  if (from !== to) {
    console.log(to + 3);
    // newTr = newTr.setSelection(TextSelection.create(newTr.doc, to+5));
  }

  dispatch(transaction);
  return true;
}
