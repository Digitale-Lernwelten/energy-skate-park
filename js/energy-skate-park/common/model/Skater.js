// Copyright 2013-2020, University of Colorado Boulder

/**
 * Model for the skater in Energy Skate Park, including position, velocity, energy, etc..
 * All units are in meters.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../../axon/js/BooleanProperty.js';
import DerivedProperty from '../../../../../axon/js/DerivedProperty.js';
import DerivedPropertyIO from '../../../../../axon/js/DerivedPropertyIO.js';
import Emitter from '../../../../../axon/js/Emitter.js';
import NumberProperty from '../../../../../axon/js/NumberProperty.js';
import Property from '../../../../../axon/js/Property.js';
import PropertyIO from '../../../../../axon/js/PropertyIO.js';
import Range from '../../../../../dot/js/Range.js';
import Utils from '../../../../../dot/js/Utils.js';
import Vector2 from '../../../../../dot/js/Vector2.js';
import Vector2Property from '../../../../../dot/js/Vector2Property.js';
import merge from '../../../../../phet-core/js/merge.js';
import BooleanIO from '../../../../../tandem/js/types/BooleanIO.js';
import NullableIO from '../../../../../tandem/js/types/NullableIO.js';
import NumberIO from '../../../../../tandem/js/types/NumberIO.js';
import ReferenceIO from '../../../../../tandem/js/types/ReferenceIO.js';
import StringIO from '../../../../../tandem/js/types/StringIO.js';
import energySkatePark from '../../../energySkatePark.js';
import Constants from '../Constants.js';
import SkaterMasses from '../SkaterMasses.js';

// Compare two arrays, whose elements have 'equals' methods for comparison
// REVIEW: There should be a lodash or built-in JS function for this
const arrayEquals = ( a, b ) => {
  if ( a.length !== b.length ) {
    return false;
  }
  for ( let i = 0; i < a.length; i++ ) {
    const elm1 = a[ i ];
    const elm2 = b[ i ];
    if ( !elm1.equals( elm2 ) ) {
      return false;
    }
  }
  return true;
};

class Skater {

  /**
   * @param {Tandem} tandem
   * @param {Object} [options]
   */
  constructor( tandem, options ) {
    options = merge( {

      // {number} - initial mass for the Skater, in kg
      defaultMass: SkaterMasses.SKATER_1_MASS,

      // {Range} - range for the Skater mass, in kg
      massRange: SkaterMasses.MASS_RANGE,

      // {Range} - Range for the reference height, in meters
      referenceHeightRange: Constants.REFERENCE_HEIGHT_RANGE
    }, options );

    assert && assert( options.referenceHeightRange.min === 0, 'reference height range needs to start from ground' );

    // @private {Range}
    this.massRange = options.massRange;

    // @public - The track the skater is on, or null if free-falling
    this.trackProperty = new Property( null, {
      tandem: tandem.createTandem( 'trackProperty' ),
      phetioType: PropertyIO( NullableIO( ReferenceIO ) )
    } );

    // @public {number} - Parameter along the parametric spline, unitless since it is in parametric space
    this.parametricPositionProperty = new Property( 0, {
      tandem: tandem.createTandem( 'parametricPositionProperty' ),
      phetioType: PropertyIO( NullableIO( NumberIO ) )
    } );

    // @public {number} - Speed along the parametric spline dimension, formally 'u dot', indicating speed and direction
    // (+/-) along the track spline in meters per second.  Not technically the derivative of 'u' since it is the
    // euclidean speed.
    this.parametricSpeedProperty = new NumberProperty( 0, {
      tandem: tandem.createTandem( 'parametricSpeedProperty' ),
      phetioReadOnly: true
    } );

    // @public - True if the skater is pointing up on the track, false if attached to underside of track
    this.onTopSideOfTrackProperty = new BooleanProperty( true, {
      tandem: tandem.createTandem( 'onTopSideOfTrackProperty' )
    } );

    // @public {number} - Gravity magnitude, without direction, which is easier to set with controls (like sliders) because
    // conceptual minimum value is less than maximum value.
    this.gravityMagnitudeProperty = new NumberProperty( 9.8, {
      tandem: tandem.createTandem( 'gravityMagnitudeProperty' ),
      units: 'meters/second/second',
      range: new Range( 1E-6, 100 )
    } );

    // @public {number} - Gravity magnitude and direction
    this.gravityProperty = new DerivedProperty( [ this.gravityMagnitudeProperty ], gravity => {
      const gravityWithDirection = -gravity;
      assert && assert( gravityWithDirection <= 0, 'this sim only supports negative or 0 gravity' );
      return gravityWithDirection;
    }, {
      units: 'meters/second/second',
      range: new Range( -100, 1E-6 )
    } );

    // @public {number} - reference height for potential energy, 0 is at the ground
    this.referenceHeightProperty = new NumberProperty( 0, {
      tandem: tandem.createTandem( 'referenceHeightProperty' ),
      units: 'meters',
      range: options.referenceHeightRange
    } );

    // @public {Vector2} - the position of the skater
    this.positionProperty = new Vector2Property( new Vector2( 3.5, 0 ), {
      tandem: tandem.createTandem( 'positionProperty' )
    } );

    // @private {number} - Start in the middle of the mass PhysicalControl range
    this.massProperty = new NumberProperty( options.defaultMass, {
      range: options.massRange,
      tandem: tandem.createTandem( 'massProperty' ),
      units: 'kilograms'
    } );

    // @public {string} - Which way the skater is facing, right or left.  Coded as strings instead of boolean in case
    // we add other states later like 'forward'
    this.directionProperty = new Property( 'left', {
      tandem: tandem.createTandem( 'directionProperty' ),
      phetioType: PropertyIO( StringIO )
    } );

    // @public {Vector2}
    this.velocityProperty = new Vector2Property( new Vector2( 0, 0 ), {
      tandem: tandem.createTandem( 'velocityProperty' )
    } );

    // @public {boolean} - True if the user is dragging the skater with a pointer
    this.draggingProperty = new BooleanProperty( false, {
      tandem: tandem.createTandem( 'draggingProperty' )
    } );

    // @public {number} - Energies are in Joules
    this.kineticEnergyProperty = new NumberProperty( 0, {
      tandem: tandem.createTandem( 'kineticEnergyProperty' ),
      units: 'joules',
      phetioReadOnly: true
    } );

    // @public {number}
    this.potentialEnergyProperty = new NumberProperty( 0, {
      tandem: tandem.createTandem( 'potentialEnergyProperty' ),
      units: 'joules',
      phetioReadOnly: true
    } );

    // @public {number}
    this.thermalEnergyProperty = new NumberProperty( 0, {
      tandem: tandem.createTandem( 'thermalEnergyProperty' ),
      units: 'joules',
      phetioReadOnly: true
    } );

    // @public {number}
    this.totalEnergyProperty = new NumberProperty( 0, {
      tandem: tandem.createTandem( 'totalEnergyProperty' ),
      units: 'joules',
      phetioReadOnly: true
    } );

    // @public {number} - The skater's angle (about the pivot point at the bottom center), in radians
    this.angleProperty = new NumberProperty( 0, {
      tandem: tandem.createTandem( 'angleProperty' ),
      units: 'radians',
      phetioReadOnly: true
    } );

    // @public {Vector2} - Returns to this point when pressing "return skater"
    this.startingPositionProperty = new Vector2Property( new Vector2( 3.5, 0 ), {
      tandem: tandem.createTandem( 'startingPositionProperty' )
    } );

    // @public {number} - Returns to this parametric position along the track when pressing "return skater"
    this.startingUProperty = new Property( 0, {
      tandem: tandem.createTandem( 'startingUProperty' ),
      phetioType: PropertyIO( NullableIO( NumberIO ) )
    } );

    // @private {boolean} - Tracks whether or not the skater is above or below the track when it is released
    this.startingUpProperty = new BooleanProperty( true, {
      tandem: tandem.createTandem( 'startingUpProperty' )
    } );

    // @public {Track} - Returns to this track when pressing "return skater"
    this.startingTrackProperty = new Property( null );

    // @public {Vector2} - Position of the skater's head, for positioning the pie chart.
    this.headPositionProperty = new Vector2Property( this.getHeadPosition(), {
      tandem: tandem.createTandem( 'headPositionProperty' ),
      phetioReadOnly: true
    } );

    // @public
    this.updatedEmitter = new Emitter();
    this.energyChangedEmitter = new Emitter();

    // @public - emits an event when the skater is returned to a previous position
    this.returnedEmitter = new Emitter();

    // @public {number}
    this.speedProperty = new DerivedProperty( [ this.velocityProperty ], velocity => velocity.magnitude, {
      tandem: tandem.createTandem( 'speedProperty' ),
      units: 'meters/second',
      phetioType: DerivedPropertyIO( NumberIO )
    } );

    // Derived - Zero the kinetic energy when draggingDerived, see #22
    this.draggingProperty.link( dragging => {
      if ( dragging ) {
        this.velocityProperty.value = new Vector2( 0, 0 );
      }
    } );

    this.parametricSpeedProperty.link( parametricSpeed => {

      // Require the skater to overcome a speed threshold so he won't toggle back and forth rapidly at the bottom of a
      // well with friction, see #51
      const speedThreshold = 0.01;

      if ( parametricSpeed > speedThreshold ) {
        this.directionProperty.value = this.onTopSideOfTrackProperty.value ? 'right' : 'left';
      }
      else if ( parametricSpeed < -speedThreshold ) {
        this.directionProperty.value = this.onTopSideOfTrackProperty.value ? 'left' : 'right';
      }
      else {
        // Keep the same direction
      }
    } );

    // @public - Boolean flag that indicates whether the skater has moved from his initial position, and hence can be 'returned',
    // For making the 'return skater' button enabled/disabled
    // If this is a performance concern, perhaps it could just be dropped as a feature
    this.movedProperty = new DerivedProperty( [ this.positionProperty, this.startingPositionProperty, this.draggingProperty ],
      ( x, x0, dragging ) => {
        return !dragging && ( x.x !== x0.x || x.y !== x0.y );
      }, {
        tandem: tandem.createTandem( 'movedProperty' ),
        phetioType: DerivedPropertyIO( BooleanIO )
      } );

    // update energies whenever mass, gravity, or height changes so that energy distribution updates while the sim is paused
    Property.multilink( [ this.massProperty, this.referenceHeightProperty, this.gravityProperty ], ( mass, height, gravity ) => {
      this.updateEnergy();
    } );

    this.updateEnergy();

    this.updatedEmitter.addListener( () => {
      this.updateHeadPosition();
    } );

    // @public - Enable the "Clear Thermal" buttons but only if the thermal energy exceeds a tiny threshold, so there
    // aren't visual "false positives", see #306
    this.allowClearingThermalEnergyProperty = new DerivedProperty( [ this.thermalEnergyProperty ],
      thermalEnergy => {
        return thermalEnergy > 1E-2;
      }, {
        tandem: tandem.createTandem( 'allowClearingThermalEnergyProperty' ),
        phetioType: DerivedPropertyIO( BooleanIO )
      } );

    // In the state wrapper, when the state changes, we must update the skater node
    _.hasIn( window, 'phet.phetIo.phetioEngine' ) && phet.phetIo.phetioEngine.phetioStateEngine.stateSetEmitter.addListener( () => {
      this.updatedEmitter.emit();
    } );
  }

  // Get the vector from feet to head, so that when tracks are joined we can make sure he is still pointing up
  get upVector() { return this.headPositionProperty.value.minus( this.positionProperty.value ); }

  /**
   * Zero the thermal energy, and update energy distribution accordingly.
   * @public
   */
  clearThermal() {
    this.thermalEnergyProperty.value = 0.0;
    this.updateEnergy();
  }

  /**
   * Fully reset this skater.
   * @public
   */
  reset() {
    this.resetPositionProperties();

    this.referenceHeightProperty.reset();

    this.updateEnergy();

    // Notify the graphics to re-render.  See #223
    this.updatedEmitter.emit();
  }

  /**
   * Move the skater to her initial position, but leave the reference height, friction, and mass the same, see #237
   * @public
   */
  resetPosition() {
    const mass = this.massProperty.value;

    this.resetPositionProperties();

    this.massProperty.value = mass;
    this.updateEnergy();

    // Notify the graphics to re-render.  See #223
    this.updatedEmitter.emit();
  }

  /**
   * Reset all Properties of the Skater except for reference height. Useful when resetting skater position only,
   * but reused in a few places when resetting Skater (to be surrounded by resetting reference height too). After
   * calling this, be sure to signify updates with this.updateEnergy() and this.updatedEmitter.emit().
   * @private
   */
  resetPositionProperties() {

    // set the angle to zero first so that the optimization for SkaterNode.updatePosition is maintained, without
    // showing the skater at the wrong angle
    this.angleProperty.value = 0;

    this.trackProperty.reset();
    this.parametricPositionProperty.reset();
    this.parametricSpeedProperty.reset();
    this.onTopSideOfTrackProperty.reset();
    this.gravityMagnitudeProperty.reset();
    this.positionProperty.reset();
    this.massProperty.reset();
    this.directionProperty.reset();
    this.velocityProperty.reset();
    this.draggingProperty.reset();
    this.kineticEnergyProperty.reset();
    this.potentialEnergyProperty.reset();
    this.thermalEnergyProperty.reset();
    this.totalEnergyProperty.reset();
    this.angleProperty.reset();
    this.startingPositionProperty.reset();
    this.startingUProperty.reset();
    this.startingUpProperty.reset();
    this.startingTrackProperty.reset();
    this.headPositionProperty.reset();
  }

  /**
   * When the scene (track) is changed, the skater's position & velocity reset, but the mass and other properties
   * do not reset, see #179
   * @public
   */
  returnToInitialPosition() {

    // Everything needs to be reset except the mass, see #188

    // REVIEW: A better way to do this would be to have a function resetEverythingExceptForMass()
    // REVIEW: which is called from here.  Then reset would call resetEverythingExceptForMass() and also massProperty.reset()
    // REVIEW: Also, the JSDoc says "and other properties", but I can't figure out what they are?
    const mass = this.massProperty.value;
    this.reset();
    this.massProperty.value = mass;
  }

  /**
   * Return the skater to the last position it was released by the user (or its starting position), including the
   * position on a track (if any).
   * @public
   */
  returnSkater() {

    // If the user is on the same track as where he began (and the track hasn't changed), remain on the track,
    // see #143 and #144
    if ( this.startingTrackProperty.value && this.trackProperty.value === this.startingTrackProperty.value && arrayEquals( this.trackProperty.value.copyControlPointSources(), this.startingTrackControlPointSources ) ) {
      this.parametricPositionProperty.value = this.startingUProperty.value;
      this.angleProperty.value = this.startingAngle;
      this.onTopSideOfTrackProperty.value = this.startingUpProperty.value;
      this.parametricSpeedProperty.value = 0;
    }
    else {
      this.trackProperty.value = null;
      this.angleProperty.value = this.startingAngle;
    }
    this.positionProperty.set( this.startingPositionProperty.value.copy() );
    this.velocityProperty.value = new Vector2( 0, 0 );
    this.clearThermal();
    this.updateEnergy();
    this.updatedEmitter.emit();

    this.returnedEmitter.emit();
  }

  /**
   * Update the energies as a batch. This is an explicit method instead of linked to all dependencies so that it can
   * be called in a controlled fashion when multiple dependencies have changed, for performance.
   * @public
   */
  updateEnergy() {
    this.kineticEnergyProperty.value = 0.5 * this.massProperty.value * this.velocityProperty.value.magnitudeSquared;
    this.potentialEnergyProperty.value = -this.massProperty.value * ( this.positionProperty.value.y - this.referenceHeightProperty.value ) * this.gravityProperty.value;
    this.totalEnergyProperty.value = this.kineticEnergyProperty.value + this.potentialEnergyProperty.value + this.thermalEnergyProperty.value;

    // Signal that energies have changed for coarse-grained listeners like PieChartNode that should not get updated
    // 3-4 times per times step
    this.energyChangedEmitter.emit();
  }

  // REVIEW: JSDoc
  getHeadPosition() {

    // Center pie chart over skater's head not his feet so it doesn't look awkward when skating in a parabola
    // Note this has been tuned independently of SkaterNode.massToScale, which also accounts for the image dimensions
    const skaterHeight = Utils.linear( this.massRange.min, this.massRange.max, 1.65, 2.4, this.massProperty.value );

    const vectorX = skaterHeight * Math.cos( this.angleProperty.value - Math.PI / 2 );
    const vectorY = skaterHeight * Math.sin( this.angleProperty.value - Math.PI / 2 );

    return new Vector2( this.positionProperty.value.x + vectorX, this.positionProperty.value.y - vectorY );
  }

  /**
   * Update the head position for showing the pie chart. Doesn't depend on "up" because it already depends on the
   * angle of the skater. Would be better if headPosition were a derived property, but created too many allocations,
   * see #50
   *
   * @private
   */
  updateHeadPosition() {
    const headPosition = this.getHeadPosition();

    // Manually trigger notifications to avoid allocations, see #50
    this.headPositionProperty.value.x = headPosition.x;
    this.headPositionProperty.value.y = headPosition.y;
    this.headPositionProperty.notifyListenersStatic();
  }

  /**
   * If the skater is released, store the initial conditions for when the skater is returned.
   * @param targetTrack The track to start on (if any)
   * @param targetU The parametric position along the track to start on (if any)
   * //REVIEW: @param types and visibility
   */
  released( targetTrack, targetU ) {
    this.draggingProperty.value = false;
    this.velocityProperty.value = new Vector2( 0, 0 );
    this.parametricSpeedProperty.value = 0;
    this.trackProperty.value = targetTrack;
    this.parametricPositionProperty.value = targetU;
    if ( targetTrack ) {
      this.positionProperty.value = targetTrack.getPoint( this.parametricPositionProperty.value );
    }
    this.startingPositionProperty.value = this.positionProperty.value.copy();
    this.startingUProperty.value = targetU;
    this.startingUpProperty.value = this.onTopSideOfTrackProperty.value;
    this.startingTrackProperty.value = targetTrack;

    // Record the starting track control points to make sure the track hasn't changed during return this.
    this.startingTrackControlPointSources = targetTrack ? targetTrack.copyControlPointSources() : [];
    this.startingAngle = this.angleProperty.value;

    // Update the energy on skater release so it won't try to move to a different height to make up for the delta
    this.updateEnergy();
    this.updatedEmitter.emit();
  }
}

energySkatePark.register( 'Skater', Skater );
export default Skater;