import { MenuItem } from "prosemirror-menu";
import { Schema } from "prosemirror-model"
import { keymap } from "prosemirror-keymap"
import { history } from "prosemirror-history"
import { baseKeymap } from "prosemirror-commands"
import { EditorState, Plugin } from "prosemirror-state"
import { dropCursor } from "prosemirror-dropcursor"
import { gapCursor } from "prosemirror-gapcursor"
import { menuBar } from "prosemirror-menu"

import { buildKeymap } from "./keymap"
import { buildInputRules } from "./inputrules"
import { createTable } from "./tt-table/utilities/createTable";

export { buildKeymap, buildInputRules }

export const schema = new Schema({
  nodes: {

    doc: {
      content: "blockers*"
    },

    p: {
      group: 'blockers',
      content: 'text*',
      toDOM: () => ['p', 0],
    },

    formula: {
      group: 'blockers',
      content: "(text|math)*",
      parseDOM: [{ tag: "formula" }],
      toDOM() { return ["formula", 0] },
      
    },

    fraction: {
      group: "math",
      content: 'formula{2}',
      // parseDOM: [{ tag: "fraction" }],
      // toDOM() { return ["fraction", 0] },
      inline: true,
    },

    sqrt: {
      group: "math",
      content: 'formula',
      parseDOM: [{ tag: "sqrt" }],
      toDOM: () => ['sqrt', '√', ['span', 0]],
      inline: true,
    },

    pow: {
      group: "math",
      content: 'formula formula',
      parseDOM: [{ tag: "pow" }],
      toDOM: () => ['pow', 0],
      inline: true,
    },

    table: {
      tableRole: 'table',
      group: 'blockers',
      content: 'tableRow+',
      isolating: true,
    },

    tableRow: {
      tableRole: 'row',
      // inline: true,
      content: '(tableCell | tableHeader)*',
      parseDOM: [{ tag: 'tr' }],
      toDOM: () => ['tr', 0],
    },

    tableHeader: {
      tableRole: 'header_cell',
      // inline: true,
      content: 'text*',
      isolating: true,
      parseDOM: [{ tag: 'th' }],
      toDOM: () => ['th', 0],
    },

    tableCell: {
      tableRole: 'cell',
      // inline: true,
      content: 'text*',
      isolating: true,
      parseDOM: [{ tag: 'td' }],
      toDOM: () => ['td', 0],
    },

    text: {},

  },
  marks: {}
})



// ================================

let fracType = schema.nodes.fraction
let formulaT = schema.nodes.formula;
let numberT = schema.nodes.number;
// let placeholderT = schema.nodes.placeholder;
let borderT = schema.nodes.border;
let sqrtT = schema.nodes.sqrt;
let powT = schema.nodes.pow;

function insertFrac(state: EditorState<any>, dispatch: any) {
  let { $from } = state.selection, index = $from.index()

  if (dispatch) {
    // const spans = [numberT.create(null, placeholderT.create()), numberT.create(null, placeholderT.create())]
    const spans = [formulaT.create(), formulaT.create()]
    dispatch(state.tr.insert($from.pos, fracType.create(null, spans)))
    // dispatch(state.tr.insert($from.pos, fracType.create()))
  }
  return true
}

function insertSqrt(state: EditorState<any>, dispatch: any) {
  let { $from } = state.selection, index = $from.index()

  if (dispatch) {
    const spans = [formulaT.create()]
    dispatch(state.tr.replaceSelectionWith(sqrtT.create(null, spans)))
  }
  return true
}

function insertPow(state: EditorState<any>, dispatch: any) {
  let { $from } = state.selection, index = $from.index()

  if (dispatch) {
    const nodes = [formulaT.create(), formulaT.create()]
    dispatch(state.tr.replaceSelectionWith(powT.create(null, nodes)))
  }
  return true
}

export function buildMenuItems(schema: Schema) {

  // return new MenuItem({
  //   title: "Insert " + name,
  //   label: name.charAt(0).toUpperCase() + name.slice(1),
  //   enable(state) { return insertDino(name)(state) },
  //   run: insertDino(name)
  // })


  const insertFractionItem = new MenuItem({
    title: "Insert fraction",
    label: "Insert fraction",
    enable(state) { return true },
    run(state, dispatch) { insertFrac(state, dispatch) }
  })

  const insertSqrtItem = new MenuItem({
    title: "Insert Sqrt",
    label: "Insert Sqrt",
    enable(state) { return true },
    run(state, dispatch) { insertSqrt(state, dispatch) }
  })

  const insertPowItem = new MenuItem({
    title: "Insert Pow",
    label: "Insert Pow",
    enable(state) { return true },
    run(state, dispatch) { insertPow(state, dispatch) }
  })

  const insertTable = new MenuItem({
    title: "Insert Table",
    label: "Insert Table",
    enable(state) { return true },
    run(state, dispatch) {
      const node = createTable(schema, 2, 2, false);
      dispatch(state.tr.replaceSelectionWith(node));
    }
  })

  return [[insertFractionItem], [insertSqrtItem], [insertPowItem], [insertTable]]
}

// ================================


export function GodSetup(schema: Schema) {

  let plugins = [
    buildInputRules(schema),
    keymap(buildKeymap(schema, null) as any),
    keymap(baseKeymap),
    dropCursor(),
    gapCursor(),
  ];

  plugins.push(menuBar({
    floating: false,
    content: buildMenuItems(schema)
  }) as any);

  plugins.push(history())

  return plugins.concat(new Plugin({
    props: {
      attributes: { class: "ProseMirror-example-setup-style" }
    }
  }))
}
