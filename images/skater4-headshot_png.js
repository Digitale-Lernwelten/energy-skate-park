/* eslint-disable */
import SimLauncher from '../../joist/js/SimLauncher.js';
const image = new Image();
const unlock = SimLauncher.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,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';
export default image;