// Copyright 2019, University of Colorado Boulder

/**
 * An EnergySkateParkTrackSetModel that can save SkaterSamples. SkaterSamples contain information about the physical
 * state of the skater at a point in time.
 *
 * Generally, it is up to the subtype to clear data at the correct time, as different presentations of this
 * data need to persist in different cases. But maxNumberOfSamples can be specified to keep things simple, and this
 * will only keep at most that number of samples at a time.
 *
 * @author Jesse Greenberg
 */
define( require => {
  'use strict';

  // modules
  const BooleanProperty = require( 'AXON/BooleanProperty' );
  const energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  const EnergySkateParkTrackSetModel = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/model/EnergySkateParkTrackSetModel' );
  const merge = require( 'PHET_CORE/merge' );
  const NumberProperty = require( 'AXON/NumberProperty' );
  const ObservableArray = require( 'AXON/ObservableArray' );
  const SkaterSample = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/model/SkaterSample' );

  class EnergySkateParkSaveSampleModel extends EnergySkateParkTrackSetModel {

    /**
     * @param {boolean} includeFriction
     * @param {Tandem} tandem
     * @param {object} options
     */
    constructor( includeFriction, tandem, options ) {
      options = merge( {

        // the interval at which we save SkaterSamples, in seconds
        saveSampleInterval: 0.1,

        // the maximum number of SkaterSamples saved by this model, to prevent from saving too many if we run without
        // encountering a case that clears old samples
        maxNumberOfSamples: 50
      }, options );

      super( includeFriction, tandem, options );

      // @private {number}
      this.saveSampleInterval = options.saveSampleInterval;
      this.maxNumberOfSamples = options.maxNumberOfSamples;

      // @private {number} - amount of time that has elapsed since a skater sample has been saved
      this.timeSinceSampleSave = 0;

      // @public {boolean} - whether or not to limit the number of samples to be saved - if false, which
      // can be disabled if you are ok with limitless samples, setting to false means that options.maxNumberOfSamples
      // has no impact
      this.limitNumberOfSamples = true;

      // @public {boolean} - set to true to prevent the model from saving any more samples - this can be used
      // instead of (or in combination with) maxNumberOfSamples to prevent the model from saving too many
      // samples for reasons other than array length
      this.preventSampleSave = false;

      // @public {BooleanProperty} - controls whether or not samples are saved as the model steps through time
      this.saveSkaterSamplesProperty = new BooleanProperty( true, { tandem: tandem.createTandem( 'saveSkaterSamplesProperty' ) } );

      // @public - in seconds, how much time has passed since beginning to record skater states
      this.sampleTimeProperty = new NumberProperty( 0 );

      // @protected {ObservableArray.<SkaterSample>} - observable list of all saved SkaterSamples
      this.skaterSamples = new ObservableArray();
    }

    /**
     * Clear all saved data immediately and prepare to save data again.
     * @public
     * @returns {}
     */
    clearEnergyData() {
      this.skaterSamples.clear();
      this.sampleTimeProperty.reset();
    }

    /**
     * Begin to remove all samples, indicating that all existing samples should fade away.
     * @private
     */
    initiateSampleRemoval() {
      for ( let i = 0; i < this.skaterSamples.length; i++ ) {
        if ( !this.skaterSamples.get( i ).removeInitiated ) {
          this.skaterSamples.get( i ).initiateRemove();
        }
      }
    }

    /**
     * @override
     * @public
     *
     * @param {number} dt - in seconds
     * @param {SkaterState} skaterState
     * @returns {SkaterState}
     */
    stepModel( dt, skaterState ) {
      const updatedState = super.stepModel( dt, skaterState );

      if ( this.saveSkaterSamplesProperty.get() ) {
        this.timeSinceSampleSave = this.timeSinceSampleSave + dt;

        if ( !this.preventSampleSave && this.timeSinceSampleSave > this.saveSampleInterval ) {
          const newSample = new SkaterSample( updatedState, this.sampleTimeProperty.get() );

          // listener that removes sample from list when it it time
          const removalListener = () => {
            newSample.removalEmitter.removeListener( removalListener );
            this.skaterSamples.remove( newSample );
          };
          newSample.removalEmitter.addListener( removalListener );

          this.skaterSamples.add( newSample );

          this.timeSinceSampleSave = 0;
          this.sampleTimeProperty.set( this.sampleTimeProperty.get() + dt );
        }
      }

      // remove oldest samples if we have collected too many
      if ( this.limitNumberOfSamples && this.skaterSamples.length > this.maxNumberOfSamples ) {
        const numberToRemove = this.skaterSamples.length - this.maxNumberOfSamples;
        for ( let i = 0; i < numberToRemove; i++ ) {
          const sample = this.skaterSamples.get( i );
          if ( !sample.removeInitiated ) {
            sample.initiateRemove();
          }
        }
      }

      // step all samples - use ObservableArray.forEach to do on a copy of the array because this may involve array
      // modification
      this.skaterSamples.forEach( sample => {
        sample.step( dt );
      } );

      return updatedState;
    }

    /**
     * @public
     */
    reset() {
      super.reset();
      this.clearEnergyData();

      this.sampleTimeProperty.reset();
      this.saveSkaterSamplesProperty.reset();
    }
  }

  return energySkatePark.register( 'EnergySkateParkSaveSampleModel', EnergySkateParkSaveSampleModel );
} );