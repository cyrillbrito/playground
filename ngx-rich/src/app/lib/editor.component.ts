import { DOMParser } from 'prosemirror-model';
import { EditorState, NodeSelection, Selection } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { InsertSqrt, SqrtNodeView } from './pluggin/sqrt';
import { ContainerNodeView } from './pluggin/container';
import { menuBar, MenuItem } from 'prosemirror-menu';
import { Schema } from 'prosemirror-model';
import { Plugin } from 'prosemirror-state';
import { ContainerNodeSpec } from './pluggin/container';
import { FracNodeSpec, FracNodeView, InsertFrac } from './pluggin/frac';
import { SqrtNodeSpec } from './pluggin/sqrt';
import { PluginSelected } from './pluggin/plug';
import { InsertPow, PowNodeSpec } from './pluggin/pow';


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
  PluginSelected,
];





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
          frac(node, view, getPos) { return new FracNodeView(node, view, getPos) },
          sqrt(node, view, getPos) { return new SqrtNodeView(node, view, getPos) },
          // container(node, view, getPos) { return new ContainerNodeView(node, view, getPos) },
        },

      }
    )
  }

}




