import { DOMParser, Node as ProsemirrorNode } from 'prosemirror-model';
import { EditorState } from 'prosemirror-state';
import { Decoration, DecorationSet, EditorView, NodeView } from 'prosemirror-view';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GodSetup, schema } from './schema';
import { sqrtTall } from './sqrt-svg/sqrt-tall-only';


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
          fraction(node, view, getPos) { return new FractionView(node, view, getPos) },
          sqrt(node, view, getPos) { return new SqrtView(node, view, getPos) },

          // table(node, view, getPos) { return new TableView(node, 200) },
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
    this.dom = this.contentDOM = document.createElement('fraction');
    // if (node.content.size == 0) this.dom.classList.add('empty')
  }

  update(node: ProsemirrorNode<typeof schema>, decorations: Decoration[], innerDecorations: DecorationSet) {
    console.log('update');
    if (node.type.name != 'fraction') return false
    if (node.content.size > 0) this.dom.classList.remove('empty')
    else this.dom.classList.add('empty')
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

class SqrtView implements NodeView<typeof schema> {

  dom?: Element;
  contentDOM?: Element;

  svg: SVGElement;
  path: SVGPathElement;

  constructor(node: ProsemirrorNode<typeof schema>, view: EditorView<typeof schema>, getPos: boolean | (() => number)) {
    console.log('constructor');
    this.dom = document.createElement('sqrt');

    this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.svg.setAttribute('preserveAspectRatio', 'xMinYMin slice');
    // this.svg.setAttribute('width', '4em');
    this.dom.appendChild(this.svg);

    this.path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    this.svg.appendChild(this.path);

    this.contentDOM = document.createElement('span');
    this.dom.appendChild(this.contentDOM);
  }

  update(node: ProsemirrorNode<typeof schema>, decorations: Decoration[], innerDecorations: DecorationSet) {

    console.log('update');

    if (node.type.name !== 'sqrt') {
      return false;
    }

    this.updateHeight(this.contentDOM.clientHeight);


    return true
  }

  private updateHeight(height: number): void {

    this.svg.setAttribute('viewBox', `0 0 4000 ${height * 50}`);
    this.svg.setAttribute('height', `${height}px`);

    this.path.setAttribute('d', sqrtTall(height / 10));

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