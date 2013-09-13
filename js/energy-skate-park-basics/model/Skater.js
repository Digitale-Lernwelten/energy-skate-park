// Copyright 2002-2013, University of Colorado Boulder

define( function( require ) {
  'use strict';

  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );
  var Vector2 = require( 'DOT/Vector2' );

  function Skater() {
    var skater = this;
    PropertySet.call( this, {track: null,

      //Scalar indicating speed and direction (+/-) along the track spline
      trackSpeed: 0,

      //Parameter along the parametric spline
      u: 0,

      //Speed along the parametric spline dimension
      uD: 0.01,

      //Gravity magnitude and direction
      gravity: -9.8,

      position: new Vector2( 0, 0 ), mass: 30, velocity: new Vector2( 0, 0 ), dragging: false} );

    this.draggingProperty.link( function( dragging ) {
      skater.velocity = new Vector2( 0, 0 );
      if ( dragging ) {
        skater.track = null;
      }
    } );
  }

  return inherit( PropertySet, Skater, {
    get energy() { return this.potentialEnergy + this.kineticEnergy; },
    get potentialEnergy() { return this.mass * this.gravity * this.position.y; },
    get kineticEnergy() {return 0.5 * this.mass * this.velocity.magnitudeSquared();}
  } );
} );