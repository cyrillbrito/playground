import { DOMParser, Node as ProsemirrorNode } from 'prosemirror-model';
import { EditorState } from 'prosemirror-state';
import { Decoration, DecorationSet, EditorView, NodeView } from 'prosemirror-view';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GodSetup, schema } from './schema';
import { sqrtMain, sqrtTall } from './sqrt-svg/sqrt-paths';
import { SqrtNodeView } from './pluggin/sqrt';
import { FracNodeView } from './pluggin/frac';


@Component({
  selector: 'nb-editor',
  template: `
<div id=editor style='margin-bottom: 23px'></div>
<div style='display: none' id='content'>123</div>
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
          plugins: GodSetup(schema)
        }),
        nodeViews: {
          frac(node, view, getPos) { return new FracNodeView(node, view, getPos) },
          sqrt(node, view, getPos) { return new SqrtNodeView(node, view, getPos) },

          // table(node, view, getPos) { return new TableView(node, 200) },
        }
      }
    )
  }

}




