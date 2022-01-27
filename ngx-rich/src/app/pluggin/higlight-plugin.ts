import { Plugin } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';


export const SelectedHighlightPlugin = new Plugin({
  props: {
    decorations(state) {
      const selection = state.selection;
      const resolved = state.doc.resolve(selection.from);
      const decoration = Decoration.node(resolved.before(), resolved.after(), { class: 'selected' });
      return DecorationSet.create(state.doc, [decoration]);
    }
  }
});

