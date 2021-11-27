import { DOMParser, Schema } from 'prosemirror-model';
import { addListNodes } from 'prosemirror-schema-list';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { exampleSetup } from './index';
import { schema } from './schema-basic';


const mySchema = new Schema({
  nodes: addListNodes(schema.spec.nodes, "paragraph block*", "block"),
  marks: schema.spec.marks
})


@Component({
  selector: 'nb-editor',
  template: `
    <div id=editor style="margin-bottom: 23px"></div>

    <div style="display: none" id="content">
      <h3>Hello ProseMirror</h3>

      <p>This is editable text. You can focus it and start typing.</p>

      <p>To apply styling, you can select a piece of text and manipulate
      its styling from the menu. The basic schema
      supports <em>emphasis</em>, <strong>strong
      text</strong>, <a href="http://marijnhaverbeke.nl/blog">links</a>, <code>code
      font</code>, and <img src="/img/smiley.png"> images.</p>

      <p>Block-level structure can be manipulated with key bindings (try
      ctrl-shift-2 to create a level 2 heading, or enter in an empty
      textblock to exit the parent block), or through the menu.</p>

      <p>Try using the “list” item in the menu to wrap this paragraph in
      a numbered list.</p>
    </div>
  `,
  styleUrls: ['./style.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    (window as any).view = new EditorView((document as any).querySelector("#editor"), {
      state: EditorState.create({
        doc: DOMParser.fromSchema(mySchema).parse((document as any).querySelector("#content")),
        plugins: exampleSetup({ schema: mySchema })
      })
    })
  }

}


