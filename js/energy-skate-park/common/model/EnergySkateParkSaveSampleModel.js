// Copyright 2019-2020, University of Colorado Boulder

/**
 * An EnergySkateParkTrackSetModel that can save SkaterSamples. SkaterSamples contain information about the physical
 * state of the skater at a point in time.
 *
 * Generally, it is up to the subtype of EnergySkateParkSaveSampleModel to clear data at the correct time, as different
 * presentations of this data need to persist in different cases. But maxNumberOfSamples can be specified to keep
 * at most that number of samples at a time.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../../axon/js/BooleanProperty.js';
import Emitter from '../../../../../axon/js/Emitter.js';
import NumberProperty from '../../../../../axon/js/NumberProperty.js';
import ObservableArray from '../../../../../axon/js/ObservableArray.js';
import Property from '../../../../../axon/js/Property.js';
import merge from '../../../../../phet-core/js/merge.js';
import energySkatePark from '../../../energySkatePark.js';
import EnergySkateParkModel from './EnergySkateParkModel.js';
import SkaterSample from './SkaterSample.js';

class EnergySkateParkSaveSampleModel extends EnergySkateParkModel {

  /**
   * @param {Tandem} tandem
   * @param {Object} [options]
   */
  constructor( tandem, options ) {
    options = merge( {

      // {number} - the interval at which we save SkaterSamples, in seconds
      saveSampleInterval: 0.1,

      // {number} skater samples which are being removed will fade away at this rate every animation frame
      // like opacity = opacity * sampleFadeDecay
      sampleFadeDecay: 0.95,

      // {number} - the maximum number of SkaterSamples saved by this model, to prevent from saving too many if we
      // run without encountering a case that clears old samples
      maxNumberOfSamples: 50
    }, options );

    super( tandem, options );

    // @private {number}
    this.saveSampleInterval = options.saveSampleInterval;
    this.maxNumberOfSamples = options.maxNumberOfSamples;
    this.sampleFadeDecay = options.sampleFadeDecay;

    // @private {number} - amount of time that has elapsed since a skater sample has been saved
    this.timeSinceSampleSave = 0;

    // @public {boolean} - whether or not to limit the number of samples to be saved - if false, which
    // can be done if you are ok with saving limitless samples, options.maxNumberOfSamples has no impact
    this.limitNumberOfSamples = true;

    // @public {BooleanProperty} - controls whether or not samples are saved as the model steps through time
    this.saveSkaterSamplesProperty = new BooleanProperty( true, { tandem: tandem.createTandem( 'saveSkaterSamplesProperty' ) } );

    // @public {boolean} - set to true to prevent the model from saving any more samples, even if
    // saveSkaterSamplesProperty is true - this can be used instead of (or in combination with) maxNumberOfSamples\
    // to prevent the model from saving too many samples for reasons other than array length
    this.preventSampleSave = false;

    // @public - in seconds, how much time has passed since beginning to record skater states
    this.sampleTimeProperty = new NumberProperty( 0 );

    // @protected {ObservableArray.<SkaterSample>} - observable list of all saved SkaterSamples
    this.skaterSamples = new ObservableArray();

    // @public (read-only) - an array of SkaterSamples that have just been removed from the model. Necessary
    // for performance so that we can update once after removing many samples rather than every time
    // a single sample is removed
    this.batchRemoveSamplesEmitter = new Emitter( {
      parameters: [ {
        arrayElementType: SkaterSample
      } ]
    } );
  }

  /**
   * Clear all saved data immediately and prepare to save data again.
   * @public
   */
  clearEnergyData() {
    this.batchRemoveSamples( this.skaterSamples.getArray().slice() );
    this.sampleTimeProperty.reset();
  }

  /**
   * SkaterSamples are removed from the model in batches for performance. This way we can remove many
   * SkaterSamples and then update the view once after several are removed. The behavior of this sim
   * is such that hundreds of SkaterSamples are frequently removed at a time.
   *
   * Assumes that samplesToRemove is a sub-array of this.skaterSamples, in the right order.
   * @public
   *
   * @param {SkaterSample[]} samplesToRemove
   */
  batchRemoveSamples( samplesToRemove ) {

    const indexOfFirstSample = this.skaterSamples.indexOf( samplesToRemove[ 0 ] );
    this.skaterSamples.splice( indexOfFirstSample, samplesToRemove.length );

    // broadcast that this batch of samples has been removed
    this.batchRemoveSamplesEmitter.emit( samplesToRemove );
  }

  /**
   * Begin to remove all samples, indicating that all existing samples should fade away.
   * @protected
   */
  initiateSampleRemoval() {
    for ( let i = 0; i < this.skaterSamples.length; i++ ) {
      this.skaterSamples.get( i ).initiateRemove();
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
        const newSample = new SkaterSample( updatedState, this.sampleTimeProperty.get(), this.sampleFadeDecay );
        this.skaterSamples.add( newSample );
        this.timeSinceSampleSave = 0;
        this.sampleTimeProperty.set( this.sampleTimeProperty.get() + dt );
      }
    }

    // old samples fade out if we have collected too many
    if ( this.limitNumberOfSamples && this.skaterSamples.length > this.maxNumberOfSamples ) {
      const numberToRemove = this.skaterSamples.length - this.maxNumberOfSamples;
      for ( let i = 0; i < numberToRemove; i++ ) {
        this.skaterSamples.get( i ).initiateRemove();
      }
    }

    // update opacity of SkaterSamples and determine if it is time for them to be removed from model
    const samplesToRemove = [];
    this.skaterSamples.forEach( sample => {
      sample.step( dt );
      if ( sample.opacityProperty.get() < SkaterSample.MIN_OPACITY ) {
        samplesToRemove.push( sample );
      }
    } );

    // for performance, we batch removal of SkaterSamples so that we can update once after many have been removed
    // rather than on each data point, see https://github.com/phetsims/energy-skate-park/issues/198
    if ( samplesToRemove.length > 0 ) {

      // BatchRemoveSamples requires that samplesToRemove is a sub array of this.skaterSamples, in the same order.
      // We can guarantee this is the case because we built samplesToRemove as we iterated through this.skaterSamples
      // so it must be in the right order. And as soon as we find one sample to remove, the rest in this.skaterSamples
      // will be ready for removal since they are even older and therefore less opaque.
      this.batchRemoveSamples( samplesToRemove );
    }

    return updatedState;
  }

  /**
   * Attach listeners that will remove and clear samples in response to Skater and model Properties. These are attached
   * for some EnergySkateParkSaveSampleModels but not all of them. They are generally useful when SkaterSamples are
   * used to draw the skater path.
   */
  attachPathRemovalListeners() {

    // existing data fades away before removal when the skater direction changes
    this.skater.directionProperty.link( direction => {
      this.initiateSampleRemoval();
    } );

    // existing data is removed immediately when any of these Properties change
    const boundClearSamples = this.clearEnergyData.bind( this );
    Property.multilink( [ this.saveSkaterSamplesProperty, this.skater.draggingProperty, this.sceneProperty ], boundClearSamples );
    this.skater.returnedEmitter.addListener( boundClearSamples );
    this.trackChangedEmitter.addListener( boundClearSamples );
  }

  /**
   * @public
   * @override
   */
  reset() {
    super.reset();
    this.clearEnergyData();

    this.sampleTimeProperty.reset();
    this.saveSkaterSamplesProperty.reset();
  }
}

energySkatePark.register( 'EnergySkateParkSaveSampleModel', EnergySkateParkSaveSampleModel );
export default EnergySkateParkSaveSampleModel;