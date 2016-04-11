'use strict';

module.exports = {
  text (fontInit) {
    const font = Object.assign({
      family: 'Arial',
      size: 24,
      style: ''
    }, fontInit);

    return `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg xmlns="http://www.w3.org/2000/svg"
     xmlns:xlink="http://www.w3.org/1999/xlink"
     width="600" height="60">
<text id="text-to-resize"
      text-anchor="left"
      x="0" y="50"
      style="${font.style}"
      font-family="${font.family}" font-size="${font.size}">${font.text}</text>
</svg>`;
  }
};
