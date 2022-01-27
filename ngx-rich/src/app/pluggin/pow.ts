import { NodeSpec } from 'prosemirror-model';
import { EditorState, TextSelection, Transaction } from 'prosemirror-state';
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

  const { $from, $to } = state.selection;

  if ($from.depth !== $to.depth) {
    return false;
  }

  if (!dispatch) {
    return true;
  }

  const containerType = state.schema.nodes.container;
  const powType = state.schema.nodes.pow;

  const containerNode = containerType.create();
  if ($from.pos !== $to.pos) {
    const slice = state.doc.slice($from.pos, $to.pos);
    containerNode.content = slice.content;
  }

  const sqrtNode = powType.create(null, [containerNode]);

  let tr = state.tr;
  tr = tr.replaceSelectionWith(sqrtNode);
  tr = tr.setSelection(new TextSelection(tr.doc.resolve($to.pos + 2)));

  dispatch(tr);
  return true;
}
