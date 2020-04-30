/* eslint-disable */
import SimLauncher from '../../joist/js/SimLauncher.js';
const image = new Image();
const unlock = SimLauncher.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,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';
export default image;