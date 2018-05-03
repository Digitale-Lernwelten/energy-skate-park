// Copyright 2013-2017, University of Colorado Boulder

/**
 * Scenery node for the mass slider, which changes the skater's mass (and correspondingly, the height)
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  // modules
  var Constants = require( 'ENERGY_SKATE_PARK/energy-skate-park-basics/Constants' );
  var energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  var HSlider = require( 'SUN/HSlider' );
  var inherit = require( 'PHET_CORE/inherit' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Range = require( 'DOT/Range' );
  var Text = require( 'SCENERY/nodes/Text' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  var controlsMassString = require( 'string!ENERGY_SKATE_PARK/controls.mass' );
  var largeString = require( 'string!ENERGY_SKATE_PARK/large' );
  var smallString = require( 'string!ENERGY_SKATE_PARK/small' );

  /**
   * @param {Property.<number>} massProperty axon Property indicating the skater mass
   * @param {Tandem} tandem
   * @constructor
   */
  function MassControlPanel( massProperty, tandem ) {
    var range = new Range( Constants.MIN_MASS, Constants.MAX_MASS );
    var slider = new HSlider( massProperty, range, _.extend( {
      tandem: tandem.createTandem( 'slider' )
    }, Constants.SLIDER_OPTIONS ) );
    var tickFont = new PhetFont( 10 );

    var textOptions = {
      font: tickFont,
      maxWidth: 54 // selected by choosing the length of widest English string in ?stringTest=double
    };
    slider.addMajorTick( Constants.MIN_MASS, new Text( smallString, _.extend( { tandem: tandem.createTandem( 'smallTextNode' ) }, textOptions ) ) );
    slider.addMajorTick( Constants.MAX_MASS, new Text( largeString, _.extend( { tandem: tandem.createTandem( 'largeTextNode' ) }, textOptions ) ) );

    // Space the label above the tick labels so that it won't overlap for i18n
    var text = new Text( controlsMassString, {
      tandem: tandem.createTandem( 'massStringTextNode' ),
      font: new PhetFont( { weight: 'bold', size: 13 } ),
      maxWidth: 100 // selected by choosing the length of widest English string in ?stringTest=double
    } );
    VBox.call( this, {
      resize: false,
      spacing: -3,
      children: [ text, slider ]
    } );
  }

  energySkatePark.register( 'MassControlPanel', MassControlPanel );

  return inherit( VBox, MassControlPanel );
} );