// import applyDevTools from 'prosemirror-dev-tools';
import { history, redo, undo } from 'prosemirror-history';
import { keymap } from 'prosemirror-keymap';
import { menuBar, MenuItem } from 'prosemirror-menu';
import { DOMParser, Schema } from 'prosemirror-model';
import { EditorState, Plugin } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ContainerNodeSpec } from './pluggin/container';
import { DynNodeSpec, DynNodeView, InsertDyn } from './pluggin/dyn';
import { FracNodeSpec, InsertFrac } from './pluggin/frac';
import { SelectedHighlightPlugin } from './pluggin/higlight-plugin';
import { mathCursor } from './pluggin/mathcursor-plugin';
import { InsertPow, PowNodeSpec } from './pluggin/pow';
import { InsertSqrt, SqrtNodeSpec } from './pluggin/sqrt';
import { PluginSqrt } from './pluggin/sqrt-plug';


const schema = new Schema({
  nodes: {

    doc: {
      content: "formula",
    },

    formula: {
      content: "math*",
      parseDOM: [{ tag: "formula" }],
      toDOM() { return ["formula", 0] },
      inline: false
    },

    container: ContainerNodeSpec,
    frac: FracNodeSpec,
    sqrt: SqrtNodeSpec,
    pow: PowNodeSpec,

    // dyn: DynNodeSpec,

    // span: {
    //   group: 'math',
    //   content: "text*",
    //   parseDOM: [{ tag: "span" }],
    //   toDOM() { return ["span", 0] },
    //   inline: true
    // },
    text: {
      group: "math"
    },

  },
  marks: {}
});

export type OurMathSchema = typeof schema;

const plugins: Plugin[] = [

  menuBar({
    floating: false,
    content: [
      [new MenuItem({
        title: "Insert fraction",
        label: "Insert fraction",
        enable(state) { return true },
        run: InsertFrac
      })],
      [new MenuItem({
        title: "Insert Sqrt",
        label: "Insert Sqrt",
        enable(state) { return true },
        run: InsertSqrt
      })],
      [new MenuItem({
        title: "Insert Pow",
        label: "Insert Pow",
        enable(state) { return true },
        run: InsertPow,
      })]
    ]
  }),
  SelectedHighlightPlugin,

  keymap({
    "Ctrl-s": InsertSqrt,
    "^": InsertPow,
    "/": InsertFrac,
    "Ctrl-d": InsertDyn,
    "Mod-z": undo,
    "Shift-Mod-z": redo,
    "Mod-y": redo,
  }),

  // PluginSpacer,
  mathCursor(),
  PluginSqrt,
  history(),
];


@Component({
  selector: 'nb-editor',
  template: `
  <button (click)="export()">Export</button>
<div id=editor style='margin-bottom: 23px'></div>
<div style='display: none' id='content'>123+456+009988</div>
  `,
  styleUrls: ['./s-editor.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditorComponent implements OnInit {

  view: EditorView;

  constructor() { }

  ngOnInit(): void {
    this.view = new EditorView(
      document.querySelector('#editor'),
      {
        state: EditorState.create({
          doc: DOMParser.fromSchema(schema).parse(document.querySelector('#content')),
          // doc: Node.fromJSON(schema, null),
          plugins
        }),
        nodeViews: {
          // dyn(node, view, getPos) { return new DynNodeView(node, view, getPos) },
        },

      }
    );
    // applyDevTools(this.view);
  }

  export(): void {
    console.log(this.view.state.toJSON());
  }

}




