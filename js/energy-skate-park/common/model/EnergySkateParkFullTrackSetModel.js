// Copyright 2018-2020, University of Colorado Boulder

/**
 * A model for track sets in Energy Skate Park "Full", which has a parabola, slope, loop, and double well tracks.
 * Tracks are not draggable, and may support friction.
 *
 * @author Jesse Greenberg
 */

import energySkatePark from '../../../energySkatePark.js';
import EnergySkateParkTrackSetModel from './EnergySkateParkTrackSetModel.js';

class EnergySkateParkFullTrackSetModel extends EnergySkateParkTrackSetModel {

  /**
   * @param {Tandem} tandem
   * @param {Object} [options]
   */
  constructor( tandem, options ) {
    super( tandem, options );

    const trackSet = EnergySkateParkTrackSetModel.createFullTrackSet( this, tandem );
    this.addTrackSet( trackSet );
  }
}

energySkatePark.register( 'EnergySkateParkFullTrackSetModel', EnergySkateParkFullTrackSetModel );
export default EnergySkateParkFullTrackSetModel;