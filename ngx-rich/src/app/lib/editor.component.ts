import { DOMParser } from 'prosemirror-model';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SqrtNodeView } from './pluggin/sqrt';
import { ContainerNodeView } from './pluggin/container';
import { menuBar, MenuItem } from 'prosemirror-menu';
import { Schema } from 'prosemirror-model';
import { Plugin } from 'prosemirror-state';
import { ContainerNodeSpec } from './pluggin/container';
import { insertFrac } from './pluggin/frac';
import { SqrtNodeSpec } from './pluggin/sqrt';
import { PluginSelected } from './pluggin/plug';


const schema = new Schema({
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
});


const plugins: Plugin[] = [

  menuBar({
    floating: false,
    content: buildMenuItems(schema)
  }),

  // new Plugin({
  //   props: {
  //     attributes: { class: "ProseMirror-example-setup-style" }
  //   }
  // }),

  PluginSelected,

];

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



@Component({
  selector: 'nb-editor',
  template: `
<div id=editor style='margin-bottom: 23px'></div>
<div style='display: none' id='content'>123+456+009988</div>
  `,
  styleUrls: ['./style.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditorComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {
    (window as any).view = new EditorView(
      (document as any).querySelector('#editor'),
      {
        state: EditorState.create({
          doc: DOMParser.fromSchema(schema).parse((document as any).querySelector('#content')),
          plugins
        }),
        nodeViews: {
          // frac(node, view, getPos) { return new FracNodeView(node, view, getPos) },
          sqrt(node, view, getPos) { return new SqrtNodeView(node, view, getPos) },
          container(node, view, getPos) { return new ContainerNodeView(node, view, getPos) },
        },

      }
    )
  }

}




