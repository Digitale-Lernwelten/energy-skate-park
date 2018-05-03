// Copyright 2013-2017, University of Colorado Boulder

/**
 * A single screen for the Energy Skate Park: Basics sim.
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  // modules
  var energySkateParkBasics = require( 'ENERGY_SKATE_PARK/energySkateParkBasics' );
  var EnergySkateParkBasicsModel = require( 'ENERGY_SKATE_PARK/energy-skate-park-basics/model/EnergySkateParkBasicsModel' );
  var EnergySkateParkBasicsScreenView = require( 'ENERGY_SKATE_PARK/energy-skate-park-basics/view/EnergySkateParkBasicsScreenView' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Screen = require( 'JOIST/Screen' );

  /**
   *
   * @param name
   * @param homescreenIcon
   * @param navbarIcon
   * @param draggableTracks
   * @param friction
   * @param {Tandem} tandem
   * @constructor
   */
  function EnergySkateParkBasicsScreen( name, homescreenIcon, navbarIcon, draggableTracks, friction, tandem ) {

    var options = {
      name: name,
      homeScreenIcon: new Image( homescreenIcon, {
        tandem: tandem.createTandem( 'homescreenIcon' )
      } ),
      navigationBarIcon: new Image( navbarIcon, {
        tandem: tandem.createTandem( 'navbarIcon' )
      } ),
      tandem: tandem
    };

    Screen.call( this,
      function() {
        return new EnergySkateParkBasicsModel( draggableTracks, friction, tandem.createTandem( 'model' ) );
      },
      function( model ) {
        return new EnergySkateParkBasicsScreenView( model, tandem.createTandem( 'view' ) );
      },
      options );
  }

  energySkateParkBasics.register( 'EnergySkateParkBasicsScreen', EnergySkateParkBasicsScreen );

  return inherit( Screen, EnergySkateParkBasicsScreen );
} );