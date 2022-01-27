import { menuBar, MenuItem } from 'prosemirror-menu';
import { DOMParser, Schema } from 'prosemirror-model';
import { EditorState, Plugin } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ContainerNodeSpec } from './pluggin/container';
import { FracNodeSpec, FracNodeView, InsertFrac } from './pluggin/frac';
import { SelectedHighlightPlugin } from './pluggin/higlight-plugin';
import { InsertPow, PowNodeSpec } from './pluggin/pow';
import { InsertSqrt, SqrtNodeSpec, SqrtNodeView } from './pluggin/sqrt';
import { keymap } from 'prosemirror-keymap';
import applyDevTools from "prosemirror-dev-tools";
import { mathCursor } from './pluggin/mathcursor-plugin';
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

    spacer: {
      inline: true,
      parseDOM: [{ tag: "spacer" }],
      toDOM: (node) => ['spacer', ' '],
      defining: false,

    },

    container: ContainerNodeSpec,
    frac: FracNodeSpec,
    sqrt: SqrtNodeSpec,
    pow: PowNodeSpec,



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
    "Ctrl-p": InsertPow,
    "/": InsertFrac,
  }),

  // PluginSpacer,
  mathCursor(),
  PluginSqrt,
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
          // frac(node, view, getPos) { return new FracNodeView(node, view, getPos) },
          // sqrt(node, view, getPos) { return new SqrtNodeView(node, view, getPos) },
          // container(node, view, getPos) { return new ContainerNodeView(node, view, getPos) },
        },

      }
    );
    (window as any).view = this.view;
    // applyDevTools(this.view);
  }

  export(): void {
    console.log(this.view.state.toJSON());
  }

}




