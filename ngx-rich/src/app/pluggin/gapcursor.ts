import { Selection, NodeSelection } from "prosemirror-state"
import { Slice, ResolvedPos } from "prosemirror-model"

// ::- Gap cursor selections are represented using this class. Its
// `$anchor` and `$head` properties both point at the cursor position.
export class GapCursor2 extends Selection {
  // :: (ResolvedPos)
  // Create a gap cursor.
  constructor($pos: ResolvedPos) {
    super($pos, $pos)
  }

  override map(doc, mapping) {
    let $pos = doc.resolve(mapping.map(this.head))
    return GapCursor2.valid($pos) ? new GapCursor2($pos) : Selection.near($pos)
  }

  override content() { return Slice.empty }

  override eq(other) {
    return other instanceof GapCursor2 && other.head == this.head
  }

  override toJSON() {
    return { type: "gapcursor", pos: this.head }
  }

  static override fromJSON(doc, json) {
    if (typeof json.pos != "number") throw new RangeError("Invalid input for GapCursor.fromJSON")
    return new GapCursor2(doc.resolve(json.pos))
  }

  override getBookmark() { return new GapBookmark(this.anchor) }

  static valid($pos: ResolvedPos) {

    // let parent = $pos.parent
    // if (parent.isTextblock || !closedBefore($pos) || !closedAfter($pos)) return false
    // let override = parent.type.spec.allowGapCursor
    // if (override != null) return override
    // let deflt = parent.contentMatchAt($pos.index()).defaultType
    // return deflt && deflt.isTextblock

    if ($pos.depth <= 4) {
      return false;
    }

    // console.log('vv');

    return false;
  }

  static override findFrom($pos, dir, mustMove) {
    search: for (; ;) {
      if (!mustMove && GapCursor2.valid($pos)) return $pos
      let pos = $pos.pos, next = null
      // Scan up from this position
      for (let d = $pos.depth; ; d--) {
        let parent = $pos.node(d)
        if (dir > 0 ? $pos.indexAfter(d) < parent.childCount : $pos.index(d) > 0) {
          next = parent.child(dir > 0 ? $pos.indexAfter(d) : $pos.index(d) - 1)
          break
        } else if (d == 0) {
          return null
        }
        pos += dir
        let $cur = $pos.doc.resolve(pos)
        if (GapCursor2.valid($cur)) return $cur
      }

      // And then down into the next node
      for (; ;) {
        let inside = dir > 0 ? next.firstChild : next.lastChild
        if (!inside) {
          if (next.isAtom && !next.isText && !NodeSelection.isSelectable(next)) {
            $pos = $pos.doc.resolve(pos + next.nodeSize * dir)
            mustMove = false
            continue search
          }
          break
        }
        next = inside
        pos += dir
        let $cur = $pos.doc.resolve(pos)
        if (GapCursor2.valid($cur)) return $cur
      }

      return null
    }
  }
}

GapCursor2.prototype.visible = false

Selection.jsonID("gapcursor", GapCursor2)

class GapBookmark {
  pos: any;
  constructor(pos) {
    this.pos = pos
  }
  map(mapping) {
    return new GapBookmark(mapping.map(this.pos))
  }
  resolve(doc) {
    let $pos = doc.resolve(this.pos)
    return GapCursor2.valid($pos) ? new GapCursor2($pos) : Selection.near($pos)
  }
}

function closedBefore($pos) {
  for (let d = $pos.depth; d >= 0; d--) {
    let index = $pos.index(d), parent = $pos.node(d)
    // At the start of this parent, look at next one
    if (index == 0) {
      if (parent.type.spec.isolating) return true
      continue
    }
    // See if the node before (or its first ancestor) is closed
    for (let before = parent.child(index - 1); ; before = before.lastChild) {
      if ((before.childCount == 0 && !before.inlineContent) || before.isAtom || before.type.spec.isolating) return true
      if (before.inlineContent) return false
    }
  }
  // Hit start of document
  return true
}

function closedAfter($pos) {
  for (let d = $pos.depth; d >= 0; d--) {
    let index = $pos.indexAfter(d), parent = $pos.node(d)
    if (index == parent.childCount) {
      if (parent.type.spec.isolating) return true
      continue
    }
    for (let after = parent.child(index); ; after = after.firstChild) {
      if ((after.childCount == 0 && !after.inlineContent) || after.isAtom || after.type.spec.isolating) return true
      if (after.inlineContent) return false
    }
  }
  return true
}
