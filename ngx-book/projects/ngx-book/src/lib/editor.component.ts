import { DOMParser, Node as ProsemirrorNode } from 'prosemirror-model';
import { EditorState } from 'prosemirror-state';
import { Decoration, DecorationSet, EditorView, NodeView } from 'prosemirror-view';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { GodSetup, schema } from './schema';
import { TableView } from './tt-table/TableView';


@Component({
  selector: 'nb-editor',
  template: `
<div id=editor style="margin-bottom: 23px"></div>
<div style="display: none" id="content">123</div>
  `,
  styleUrls: ['./style.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditorComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {
    (window as any).view = new EditorView(
      (document as any).querySelector("#editor"),
      {
        state: EditorState.create({
          doc: DOMParser.fromSchema(schema).parse((document as any).querySelector("#content")),
          plugins: GodSetup(schema)
        }),
        nodeViews: {
          // fraction(node, view, getPos) { return new FractionView(node, view, getPos) }
          table(node, view, getPos) { return new TableView(node, 200) }
        }
      }
    )
  }

}


class FractionView implements NodeView<typeof schema> {

  dom?: Element;
  contentDOM?: Node;

  constructor(node: ProsemirrorNode<typeof schema>, view: EditorView<typeof schema>, getPos: boolean | (() => number)) {
    console.log('constructor');
    this.dom = this.contentDOM = document.createElement("fraction");
    // if (node.content.size == 0) this.dom.classList.add("empty")
  }

  update(node: ProsemirrorNode<typeof schema>, decorations: Decoration[], innerDecorations: DecorationSet) {
    console.log('update');
    if (node.type.name != "fraction") return false
    if (node.content.size > 0) this.dom.classList.remove("empty")
    else this.dom.classList.add("empty")
    return true
  }

  selectNode(): void {
    console.log('selectNode');
  }

  deselectNode(): void {
    console.log('deselectNode');
  }

  setSelection(anchor: number, head: number, root: Document): void {
    console.log('setSelection');
  }

  stopEvent(event: Event) {
    console.log('stopEvent');
    return true
  }

  ignoreMutation(p: MutationRecord | { type: 'selection', target: Element }): boolean {
    console.log('ignoreMutation');
    return false
  }

  destroy(): void {
    console.log('destroy');
  }
}