// Copyright 2017-2018, University of Colorado Boulder

/**
 * IO type for ControlPoint
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Andrew Adare (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  var ObjectIO = require( 'TANDEM/types/ObjectIO' );
  var phetioInherit = require( 'TANDEM/phetioInherit' );

  // ifphetio
  var assertInstanceOf = require( 'ifphetio!PHET_IO/assertInstanceOf' );
  var phetioEngine = require( 'ifphetio!PHET_IO/phetioEngine' );

  /**
   * @param {ControlPoint} controlPoint
   * @param {string} phetioID
   * @constructor
   */
  function ControlPointIO( controlPoint, phetioID ) {
    assert && assertInstanceOf( controlPoint, phet.energySkatePark.ControlPoint );
    ObjectIO.call( this, controlPoint, phetioID );
  }

  phetioInherit( ObjectIO, 'ControlPointIO', ControlPointIO, {}, {
    documentation: 'A control point that can manipulate the track.',

    /**
     * Encodes a ControlPoint instance to a state.
     * @param {ControlPoint} controlPoint
     * @returns {Object}
     * @override
     */
    toStateObject: function( controlPoint ) {
      assert && assertInstanceOf( controlPoint, phet.energySkatePark.ControlPoint );
      return controlPoint ? controlPoint.tandem.phetioID : 'null';
    },

    /**
     * Decodes a ControlPoint from a state object. Supports null.
     *
     * @param {Object} stateObject
     * @returns {ControlPoint}
     * @override
     */
    fromStateObject: function( stateObject ) {
      if ( stateObject === 'null' ) {
        return null;
      }
      else {
        return phetioEngine.getInstance( stateObject );
      }
    }
  } );

  energySkatePark.register( 'ControlPointIO', ControlPointIO );

  return ControlPointIO;
} );