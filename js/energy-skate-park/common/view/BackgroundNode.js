// Copyright 2013-2020, University of Colorado Boulder

/**
 * Scenery node that shows the background, including the mountains, sky, ground and grass.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Image from '../../../../../scenery/js/nodes/Image.js';
import Node from '../../../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../../../scenery/js/nodes/Rectangle.js';
import LinearGradient from '../../../../../scenery/js/util/LinearGradient.js';
import Pattern from '../../../../../scenery/js/util/Pattern.js';
import cementImg from '../../../../images/cement-texture-dark_jpg.js';
import mountainImage from '../../../../images/mountains_png.js';
import energySkatePark from '../../../energySkatePark.js';

// constants
const earthHeight = 70;
const cementWidth = 4;

class BackgroundNode extends Node {

  /**
   * @param {Bounds2} layoutBounds
   * @param {Property.<Bounds2>} visibleBoundsProperty
   * @param {Tandem} tandem
   * @param {Object} [options]
   */
  constructor( layoutBounds, visibleBoundsProperty, tandem, options ) {
    super( {
      pickable: false,
      tandem: tandem
    } );

    // @private
    this.sky = new Rectangle( 0, 0, 0, 0 );
    this.addChild( this.sky );

    // @private - wait for bounds to fill in the grass
    this.earth = new Rectangle( 0, 0, 0, 0, { fill: '#93774c' } );
    this.addChild( this.earth );

    // @private {number}
    this.cementY = layoutBounds.height - earthHeight;

    // @private
    this.mountain = new Image( mountainImage, {
      bottom: this.cementY,
      tandem: tandem.createTandem( 'mountainImage' )
    } );
    this.addChild( this.mountain );

    // @private
    this.cement = new Rectangle( 0, 0, 0, cementWidth, { fill: new Pattern( cementImg ) } );
    this.addChild( this.cement );

    if ( options ) {
      this.mutate( options );
    }

    // update layout when visible bounds change
    visibleBoundsProperty.link( bounds => this.layout( bounds ) );
  }

  /**
   * Exactly fit the geometry to the screen so no matter what aspect ratio it will always show something.
   * Perhaps it will improve performance too? // REVIEW: How might this improve performance?
   * @public
   *
   * @param {Bounds2} bounds
   */
  layout( bounds ) {
    const cementY = this.cementY;
    this.earth.setRect( bounds.minX, cementY, bounds.width, earthHeight );

    // Work around scenery horizontal line pattern problem, see https:// github.com/phetsims/scenery/issues/196
    this.cement.setRect( bounds.minX, cementY, bounds.width, cementWidth );
    this.sky.setRect( bounds.minX, bounds.minY, bounds.width, bounds.height );
    this.sky.fill = new LinearGradient( 0, 0, 0, bounds.height / 2 ).addColorStop( 0, '#02ace4' ).addColorStop( 1, '#cfecfc' );
  }
}

// @static
BackgroundNode.earthHeight = earthHeight;

energySkatePark.register( 'BackgroundNode', BackgroundNode );
export default BackgroundNode;