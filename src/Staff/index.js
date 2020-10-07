import { fabric } from 'fabric';
import { Synth } from 'tone';

const range = x => [...Array(x).keys()];

class Staff {
  constructor(canvas, x, y, lineGap = 10, lineLength = 500) {
    this.canvas = canvas;
    this.x = x;
    this.y = y;
    this.lineGap = lineGap;
    this.lineLength = lineLength;
    this.noteOffset = 10;
    this.synth = new Synth()
    this.synth.oscillator.type = 'sine';
    this.synth.toDestination();
    this.octave = 4;
  }

  lines() {
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

  drawNote(y, note) {
    const noteX = this.x + this.noteOffset;
    const width = this.lineGap / 2;
    const circle = new fabric.Circle({
      left: noteX,
      top: y,
      radius: width,
    });

    const line = new fabric.Line(
      [noteX + width * 2, y + width, noteX + width * 2, y - 25],
      { stroke: 'black' }
    );

    this.canvas.add(new fabric.Group([circle, line]));
    this.synth.triggerAttackRelease(`${note}${this.octave}`, "32n");

    this.noteOffset += 20;
  }

  re() {
    this.drawNote(this.y + 4 * this.lineGap, 'D');
    return this;
  }
  mi() {
    this.drawNote(this.y + 3.5 * this.lineGap, 'E');
    return this;
  }
  fa() {
    this.drawNote(this.y + 3 * this.lineGap, 'F');
    return this;
  }
  sol() {
    this.drawNote(this.y + 2.5 * this.lineGap, 'G');
    return this;
  }
  la() {
    this.drawNote(this.y + 2 * this.lineGap, 'A');
    return this;
  }
  si() {
    this.drawNote(this.y + 1.5 * this.lineGap, 'B');
    return this;
  }
  do() {
    this.drawNote(this.y + 4.5 * this.lineGap, 'C');
    return this;
  }
}

export default Staff;
