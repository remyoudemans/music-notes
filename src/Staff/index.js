import { fabric } from 'fabric';
import { Synth } from 'tone';

const range = x => [...Array(x).keys()];
const trebleClefPath ="M15.1 65.4c-4.2-.3-8.5-3-11.1-6.1-3-3.7-4.3-8.6-4-12.7 1-12 13.6-19 18.3-24.3 3.1-3.5 3.8-5.2 4.5-7 1.3-3.5 1.6-7.5-1.1-7.8-2.6-.3-4.7 3.8-5.6 6.7-.9 2.5-1.4 5-1 8.9l6.7 50.7c1 7.5-3 10.5-7.3 11.1-9.2 1.2-12.1-8.4-8-12 3.2-2.8 7.7-.4 7.5 4.2-.2 4-4.1 4.2-5.1 4 1.5 2.9 13 4.4 11.2-8.3L14 24.7C13 17 12.7 11 16.5 4c1.5-2.6 3.7-4.3 4.8-4 .2 0 .5 0 .7.3 3 3 3.8 10 3.5 14-.3 4-.5 8.3-4.5 13.2-1.5 2-6.1 6.1-8.8 8.5a28.6 28.6 0 00-8 10A12.6 12.6 0 0014.8 64c8.4 0 10.8-4.2 11-9 0-7.9-9.2-10.8-13-5.4a6.4 6.4 0 00.2 8c.6.6 1.1 1 1.7 1.2.2 0 .6.3.5.6-.1.3-.3.3-.5.3-2.4-.3-5-2.7-5.7-6.7-1-6 4-13 11.3-11.8 4.8.7 9.2 5 8.8 12.7-.4 6.7-5.8 12-13.9 11.5z";

const sharpPath = "M1.9 12.15v-4.7l2-.55v4.68l-2 .57zm3.94-1.13l-1.37.39V6.73l1.37-.38V4.4l-1.37.39V0H3.9v4.93l-2 .58V.86h-.53v4.82L0 6.07v1.95l1.38-.39v4.67L0 12.7v1.94l1.38-.39V19h.53v-4.93l2-.55v4.63h.56v-4.8l1.37-.39v-1.94z";

export const noteNames = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

class Staff {
  constructor(canvas, x, y, lineGap = 10, lineLength = 500) {
    this.canvas = canvas;
    this.x = x;
    this.y = y;
    this.lineGap = lineGap;
    this.lineLength = lineLength;
    this.noteOffset = 40;
    this.synth = new Synth()
    this.synth.oscillator.type = 'sine';
    this.synth.toDestination();
    this.octave = 5;

    this.showCursor = true;
    this.cursor = new fabric.Line([
      x + this.noteOffset,
      y - lineGap,
      x + this.noteOffset, y + 5 * lineGap
    ], {
        stroke: 'black'
    });

    setInterval(() => {
      this.canvas[this.showCursor ? 'add' : 'remove'](this.cursor);
      this.showCursor = !this.showCursor;
    }, 500)
  }

  upOctave() {
    this.octave += 1;
  }

  downOctave() {
    this.octave -= 1;
  }

  drawLines() {
    this.canvas.add(
      new fabric.Group(
        range(5).map(
          i =>
            new fabric.Line(
              [
                this.x,
                this.y + i * this.lineGap,
                this.x + this.lineLength,
                this.y + i * this.lineGap,
              ],
              {
                stroke: 'black',
                hasControls: false,
              }
            )
        )
      )
    );
  }

  drawClef() {
    const trebleClefScale = 0.75;
    this.canvas.add(new fabric.Path(
      trebleClefPath,
      { scaleX: trebleClefScale, scaleY: trebleClefScale, top: this.x, left: this.y }
    ));
  }

  drawNote(note, accidental = '') {
    const noteY = this.getNoteY(note);
    let noteX = this.x + this.noteOffset;

    if (accidental === '#') {
      // TODO: try to get rid of all these magic numbers
      this.canvas.add(
        new fabric.Path(sharpPath, { left: noteX, top: noteY - 5})
      );

      noteX += 10;
      this.noteOffset += 10;
    }

    const width = this.lineGap / 2;
    const circle = new fabric.Circle({
      left: noteX,
      top: noteY,
      radius: width,
    });
    const line = new fabric.Line(
      [noteX + width * 2, noteY + width, noteX + width * 2, noteY - 25],
      { stroke: 'black' }
    );

    this.canvas.add(new fabric.Group([circle, line]));
    this.synth.triggerAttackRelease(`${note}${accidental}${this.octave}`, "32n");

    this.noteOffset += 20;
    this.cursor.left = this.x + this.noteOffset;
  }

  getNoteY(noteName) {
    const octaveOffset = (this.octave - 5) * 3.5 * this.lineGap;
    return this.y + (4.5 - noteNames.indexOf(noteName) * 0.5 ) * this.lineGap - octaveOffset
  }
}

export default Staff;
