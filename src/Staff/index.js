class Staff {
  constructor(ctx, x, y, lineGap = 10, lineLength = 500) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.lineGap = lineGap;
    this.lineLength = lineLength;
    this.noteOffset = 10;
  }
  
  draw() {
    for (let i = 0; i < 5; i++) {
      this.ctx.beginPath();
      this.ctx.moveTo(this.x, this.y + i * this.lineGap);
      this.ctx.lineTo(this.x + this.lineLength, this.y + i * this.lineGap);
      this.ctx.stroke();
    }
    
    return this;
  }
  
  
  drawNote(y, width = 4) {
    const noteX = this.x + this.noteOffset;
    this.ctx.moveTo(noteX, y);
    this.ctx.arc(noteX, y, width, 0, Math.PI * 2, true);
    this.ctx.fill();
    this.ctx.beginPath();
    this.ctx.moveTo(noteX + width, y)
    this.ctx.lineTo(noteX + width, y - 25);
    this.ctx.closePath();
    this.ctx.stroke();
    
    this.noteOffset += 20;
  }
  
  re() {
    this.drawNote(this.y + 4.5 * this.lineGap);
    return this;
  }
  mi() {
    this.drawNote(this.y + 4 * this.lineGap);
    return this;
  }
}

export default Staff;
