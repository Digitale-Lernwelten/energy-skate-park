/* eslint-disable */
import asyncLoader from '../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,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';
export default image;