import { history } from 'prosemirror-history';
import { menuBar, MenuItem } from 'prosemirror-menu';
import { Schema } from 'prosemirror-model';
import { EditorState, Plugin } from 'prosemirror-state';
import { ContainerNodeSpec } from './pluggin/container';
import { FracNodeSpec, insertFrac } from './pluggin/frac';
import { PluginSelected, PluginTest } from './pluggin/plug';
import { SqrtNodeSpec } from './pluggin/sqrt';



export const schema = new Schema({
  nodes: {

    doc: {
      content: "formula",
    },

    formula: {
      content: "math*",
      parseDOM: [{ tag: "formula" }],
      toDOM() { return ["formula", 0] },
    },
    // placeholder: {
    //   parseDOM: [{ tag: "placeholder" }],
    //   toDOM: () => ['placeholder'],
    //   inline: true,
    //   atom: true,
    // },
    // frac: FracNodeSpec,
    sqrt: SqrtNodeSpec,

    // pow: {
    //   group: "math",
    //   content: 'container container',
    //   parseDOM: [{ tag: "pow" }],
    //   toDOM: () => ['pow', 0],
    //   inline: true,
    // },

    container: ContainerNodeSpec,



    text: {
      group: "math"
    },

  },
  marks: {}
})



// ================================

let fracType = schema.nodes.frac
let formulaT = schema.nodes.formula;
let numberT = schema.nodes.number;
let placeholderT = schema.nodes.placeholder;
let borderT = schema.nodes.border;
let sqrtT = schema.nodes.sqrt;
let powT = schema.nodes.pow;
let containerT = schema.nodes.container;


function insertSqrt(state: EditorState<any>, dispatch: any) {
  let { $from } = state.selection, index = $from.index()

  if (dispatch) {
    // const placeholder = placeholderT.create();
    // const container = containerT.create(null, );
    const sqrt = containerT.create(null);
    const transaction = state.tr.replaceSelectionWith(sqrt)
    dispatch(transaction);
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
    run: insertFrac
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

  return [[insertFractionItem], [insertSqrtItem], [insertPowItem]]
}

// ================================


export function GodSetup(schema: Schema) {

  let plugins = [

    menuBar({
      floating: false,
      content: buildMenuItems(schema)
    }),

    new Plugin({
      props: {
        attributes: { class: "ProseMirror-example-setup-style" }
      }
    }),

    PluginTest,
    PluginSelected,

  ];



  return plugins
}
