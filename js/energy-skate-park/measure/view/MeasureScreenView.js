// Copyright 2018, University of Colorado Boulder

/**
 * Energ
 * @author Jesse Greenberg
 */

define( function( require ) {
  'use strict';

  // modules
  var energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  var EnergySkateParkScreenView = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/EnergySkateParkScreenView' );
  var inherit = require( 'PHET_CORE/inherit' );


  /**
   * @constructor
   * @param {EnergySkateParkTrackSetModel} model
   * @param {Tandem} tandem
   */
  function MeasureScreenView( model, tandem ) {
    EnergySkateParkScreenView.call( this, model, tandem );
  }

  energySkatePark.register( 'MeasureScreenView', MeasureScreenView );

  return inherit( EnergySkateParkScreenView, MeasureScreenView, {} );
} );
