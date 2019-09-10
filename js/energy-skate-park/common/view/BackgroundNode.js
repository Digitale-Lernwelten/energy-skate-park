// Copyright 2013-2018, University of Colorado Boulder

/**
 * Scenery node that shows the background, including the mountains, sky, ground and grass.
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  // modules
  var energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LinearGradient = require( 'SCENERY/util/LinearGradient' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Pattern = require( 'SCENERY/util/Pattern' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );

  // images
  var cementImg = require( 'image!ENERGY_SKATE_PARK/cement-texture-dark.jpg' );
  var mountainImage = require( 'image!ENERGY_SKATE_PARK/mountains.png' );

  // constants
  var earthHeight = 70;
  var cementWidth = 4;

  /**
   * @param {Bounds2} layoutBounds the ScreenView layoutBounds
   * @param {Tandem} tandem
   * @param {Object} [options]
   * @constructor
   */
  function BackgroundNode( layoutBounds, tandem, options ) {
    Node.call( this, {
      pickable: false,
      tandem: tandem
    } );

    this.sky = new Rectangle( 0, 0, 0, 0 );
    this.addChild( this.sky );

    // Wait for bounds to fill in the grass
    this.earth = new Rectangle( 0, 0, 0, 0, { fill: '#93774c' } );
    this.addChild( this.earth );

    this.cementY = layoutBounds.height - earthHeight;

    this.mountain = new Image( mountainImage, {
      bottom: this.cementY,
      tandem: tandem.createTandem( 'mountainImage' )
    } );
    this.addChild( this.mountain );

    this.cement = new Rectangle( 0, 0, 0, cementWidth, { fill: new Pattern( cementImg ) } );
    this.addChild( this.cement );

    if ( options ) {
      this.mutate( options );
    }
  }

  energySkatePark.register( 'BackgroundNode', BackgroundNode );

  return inherit( Node, BackgroundNode, {

      // Exactly fit the geometry to the screen so no matter what aspect ratio it will always show something.
      // Perhaps it will improve performance too?
      layout: function( offsetX, offsetY, width, height, layoutScale ) {
        var cementY = this.cementY;
        this.earth.setRect( -offsetX, cementY, width / layoutScale, earthHeight );

        // Work around scenery horizontal line pattern problem, see https:// github.com/phetsims/scenery/issues/196
        this.cement.setRect( -offsetX, cementY, width / layoutScale, cementWidth );
        this.sky.setRect( -offsetX, -offsetY, width / layoutScale, height / layoutScale - earthHeight );
        this.sky.fill = new LinearGradient( 0, 0, 0, height / 2 ).addColorStop( 0, '#02ace4' ).addColorStop( 1, '#cfecfc' );
      }
    },

    // Statics
    {
      earthHeight: earthHeight
    } );
} );