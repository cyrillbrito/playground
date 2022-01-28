import { NodeSpec } from 'prosemirror-model';
import { EditorState, TextSelection, Transaction } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { OurMathSchema } from '../editor.component';


export const FracNodeSpec: NodeSpec = {
  group: "math",
  content: 'container{2}',
  parseDOM: [{ tag: "fraction" }],
  toDOM: node => ['frac', ['span', { class: 'content' }, 0], ['span', { class: 'aligner' }]],
  inline: true,
};

export function InsertFrac(state: EditorState<OurMathSchema>, dispatch?: (tr: Transaction<OurMathSchema>) => void, view?: EditorView<OurMathSchema>): boolean {

  const { $from, $to } = state.selection;

  if ($from.depth !== $to.depth) {
    return false;
  }

  if (!dispatch) {
    return true;
  }

  const containerType = state.schema.nodes.container;
  const fracType = state.schema.nodes.frac;

  const topContainer = containerType.create();
  if ($from.pos !== $to.pos) {
    const slice = state.doc.slice($from.pos, $to.pos);
    topContainer.content = slice.content;
  }

  const bottomContainer = containerType.create();
  const fracNode = fracType.create(null, [topContainer, bottomContainer]);

  let tr = state.tr;
  tr = tr.replaceSelectionWith(fracNode);
  tr = tr.setSelection(TextSelection.create(tr.doc, $to.pos + 2));

  dispatch(tr);
  return true;
}
