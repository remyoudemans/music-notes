import { fabric } from 'fabric';

const range = x => [...Array(x).keys()]

class Staff {
  constructor(canvas, x, y, lineGap = 10, lineLength = 500) {
    this.canvas = canvas;
    this.x = x;
    this.y = y;
    this.lineGap = lineGap;
    this.lineLength = lineLength;
    this.noteOffset = 10;
  }
  
  lines() {
    this.canvas.add(new fabric.Group(range(5).map(i => 
      new fabric.Line(
        [
          this.x,
          this.y + i * this.lineGap,
          this.x + this.lineLength,
          this.y + i * this.lineGap
        ],
        {
          stroke: 'black',
          hasControls: false,
        }
      )
    )))
  }
  
  
  drawNote(y, width = 4) {
    const noteX = this.x + this.noteOffset;
    const circle = new fabric.Circle({
      left: noteX,
      top: y,
      radius: width,
    });

    const line = new fabric.Line(
      [
        noteX + width * 2,
        y + width,
        noteX + width * 2,
        y - 25
      ],
      { stroke: 'black'}
    );

    this.canvas.add(new fabric.Group([circle, line]));

    this.noteOffset += 20;
  }
  
  re() {
    this.drawNote(this.y + 4 * this.lineGap);
    return this;
  }
  mi() {
    this.drawNote(this.y + 3.5 * this.lineGap);
    return this;
  }
  fa() {
    this.drawNote(this.y + 3 * this.lineGap);
    return this;
  }
  sol() {
    this.drawNote(this.y + 2.5 * this.lineGap);
    return this;
  }
  la() {
    this.drawNote(this.y + 2 * this.lineGap);
    return this;
  }
  si() {
    this.drawNote(this.y + 1.5 * this.lineGap);
    return this;
  }
  do() {
    this.drawNote(this.y + 1 * this.lineGap);
    return this;
  }
}

export default Staff;
