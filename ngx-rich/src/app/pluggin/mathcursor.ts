import { Node as ProsemirrorNode, ResolvedPos, Slice } from 'prosemirror-model';
import { NodeSelection, Selection, SelectionBookmark } from 'prosemirror-state';
import { Mappable, Mapping } from 'prosemirror-transform';

// TODO There is still a lot of code that needs understanding here

export class MathCursor extends Selection {

  constructor($pos: ResolvedPos) {
    super($pos, $pos);
  }

  override map(doc: ProsemirrorNode, mapping: Mappable): Selection {
    const $pos = doc.resolve(mapping.map(this.head));
    return Selection.near($pos);
  }

  override content(): Slice {
    return Slice.empty;
  }

  override eq(other: Selection): boolean {
    return other instanceof MathCursor && other.head == this.head;
  }

  override toJSON(): { [key: string]: any } {
    return { type: "mathcursor", pos: this.head }
  }

  static override fromJSON(doc: ProsemirrorNode, json: { [key: string]: any }): Selection {
    if (typeof json.pos != "number") {
      throw new RangeError("Invalid input for MathCursor.fromJSON");
    }
    return new MathCursor(doc.resolve(json.pos))
  }

  override getBookmark(): SelectionBookmark {
    return new MathBookmark(this.anchor)
  }

}

Selection.jsonID("mathcursor", MathCursor)

class MathBookmark implements SelectionBookmark {

  constructor(private pos: number) { }

  map(mapping: Mapping): SelectionBookmark {
    return new MathBookmark(mapping.map(this.pos));
  }

  resolve(doc: ProsemirrorNode): Selection {
    const $pos = doc.resolve(this.pos);
    return Selection.near($pos);
  }
}
