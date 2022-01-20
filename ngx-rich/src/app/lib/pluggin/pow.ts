import { Node as ProsemirrorNode, NodeSpec } from 'prosemirror-model';
import { EditorState, Transaction } from 'prosemirror-state';
import { Decoration, DecorationSet, EditorView, NodeView } from 'prosemirror-view';
import { OurMathSchema } from '../editor.component';


export const PowNodeSpec: NodeSpec = {
  group: "math",
  content: 'container{2}',
  parseDOM: [{ tag: "pow" }],
  toDOM() { return ["pow", 0] },
  inline: true,
};

export function InsertPow(state: EditorState<OurMathSchema>, dispatch: (p: Transaction<OurMathSchema>) => void, view: EditorView<OurMathSchema>, event: Event) {
  
  if (!dispatch) {
    // This is a test, in the code examples there was this validation
    // I don't know if this is useful
    debugger;
    console.error('!dispach test')
  }
  
  const containerType = state.schema.nodes.container;
  const powType = state.schema.nodes.pow;

  const leftContainer = containerType.create();
  const rightContainer = containerType.create();

  const { from, to } = state.selection;
  if (from !== to) {
    const slice = state.doc.slice(state.selection.from, state.selection.to);
    leftContainer.content = slice.content;
  }

  const fracNode = powType.create(null, [leftContainer, rightContainer]);

  let transaction = state.tr.replaceSelectionWith(fracNode)

  if (from !== to) {
    console.log(to + 3);
    // newTr = newTr.setSelection(TextSelection.create(newTr.doc, to+5));
  }

  dispatch(transaction);
}

export function InsertFrac(state: EditorState<OurMathSchema>, dispatch: (p: Transaction<OurMathSchema>) => void, view: EditorView<OurMathSchema>, event: Event) {

  if (!dispatch) {
    // This is a test, in the code examples there was this validation
    // I don't know if this is useful
    debugger;
    console.error('!dispach test')
  }

  const containerType = state.schema.nodes.container;
  const fracType = state.schema.nodes.frac;

  const topContainer = containerType.create();
  const bottomContainer = containerType.create();

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
}