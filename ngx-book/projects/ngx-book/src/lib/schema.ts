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

export { buildKeymap, buildInputRules }

export const schema = new Schema({
  nodes: {

    doc: {
      content: "math_block+"
    },

    math_block: {
      content: "inline*",
      parseDOM: [{ tag: "p" }],
      toDOM() { return ["p", 0] }
    },

    number: {
      group: "inline",
      content: 'placeholder|(text+)',
      inline: true,
      
      // isolating: false,
      // selectable:terue
      // parseDOM: [{ tag: "sqrt" }],
      toDOM: () => ['number', 0],
      // defining:true,
      // selectable: true,
    },

    fraction: {
      group: "inline",
      content: 'inline{2}',

      // parseDOM: [{ tag: "fraction" }],
      // toDOM() { return ["fraction", 0] },

      inline: true,
      // must be off
      atom: false,

      // isolating: true, ??
      selectable: false,
      // create: (a) => {

      // }
    },

    placeholder: {
      inline: true,
      parseDOM: [{ tag: "placeholder" }],
      toDOM: () => ['placeholder'],

      // atom: true,
      isolating:true,
      selectable: false,
      // defining:true,
      // allowGapCursor:true
    },
    text: {},


    // sqrt: {
    //   group: "inline",
    //   content: 'inline',
    //   inline: true,
    //   // isolating: false,
    //   // selectable:terue
    //   parseDOM: [{ tag: "sqrt" }],
    //   toDOM: () => ['sqrt', '√', ['border', 0]],
    //   // defining:true,
    //   // selectable: true,
    // },

    border: {
      // group: "inline",
      content: 'inline',
      inline: true,

      // atom: true,

      parseDOM: [{ tag: "border" }],
      toDOM: () => ['border', 0],

    },




  },
  marks: {}
})



// ================================

let fracType = schema.nodes.fraction
let numberT = schema.nodes.number;
let placeholderT = schema.nodes.placeholder;
let borderT = schema.nodes.border;
let sqrtT = schema.nodes.sqrt;

function insertFrac(state: EditorState<any>, dispatch: any) {
    let { $from } = state.selection, index = $from.index()

  if (dispatch) {
    const spans = [numberT.create(null, placeholderT.create()), numberT.create(null, placeholderT.create())]
    dispatch(state.tr.insert($from.pos, fracType.create(null, spans)))
  }
  return true
}

// function insertSqrt(state: EditorState<any>, dispatch: any) {
//   let { $from } = state.selection, index = $from.index()
//   // if (!$from.parent.canReplaceWith(index, index, sqrtT))
//   //   return false
//   if (dispatch) {
//     const spans = [placeholderT.create()]
//     dispatch(state.tr.replaceSelectionWith(sqrtT.create(null, spans)))
//   }
//   return true
// }

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

  // const insertSqrtItem = new MenuItem({
  //   title: "Insert Sqrt",
  //   label: "Insert Sqrt",
  //   enable(state) { return true },
  //   run(state, dispatch) { insertSqrt(state, dispatch) }
  // })

  return [[insertFractionItem], /*[insertSqrtItem]*/]
}

// ================================


export function GodSetup(schema: Schema) {

  let plugins = [
    buildInputRules(schema),
    keymap(buildKeymap(schema, null) as any),
    keymap(baseKeymap),
    dropCursor(),
    gapCursor()
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
