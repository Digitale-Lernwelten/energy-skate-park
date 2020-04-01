/* eslint-disable */
const img = new Image();
window.phetImages.push( img );
img.src = 'data:image/png;base64,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';
export default img;
