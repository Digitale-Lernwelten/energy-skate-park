// Copyright 2018-2022, University of Colorado Boulder

/**
 * ScreenView for the Intro Screen of Energy Skate Park.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import EnergySkateParkTrackSetScreenView from '../../common/view/EnergySkateParkTrackSetScreenView.js';
import energySkatePark from '../../energySkatePark.js';

class IntroScreenView extends EnergySkateParkTrackSetScreenView {

  /**
   * @param {EnergySkateParkFullTrackSetModel} model
   * @param {Tandem} tandem
   */
  constructor( model, tandem ) {
    super( model, tandem, {
      controlPanelOptions: {
        showMassControls: false,
        gravityControlsOptions: {
          includeGravityNumberControl: false,
          includeGravitySlider: false
        },
        visibilityControlsOptions: {
          showStickToTrackCheckbox: false,
          showSkaterPathCheckbox: false,
          showPieChartCheckbox: false,
          showBarGraph: false
        }
      }
    } );
  }
}

energySkatePark.register( 'IntroScreenView', IntroScreenView );
export default IntroScreenView;