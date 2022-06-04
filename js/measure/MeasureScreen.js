// Copyright 2018-2022, University of Colorado Boulder

/**
 * The "Measure" screen.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Screen from '../../../joist/js/Screen.js';
import ScreenIcon from '../../../joist/js/ScreenIcon.js';
import { Image } from '../../../scenery/js/imports.js';
import measureScreenIcon_png from '../../images/measureScreenIcon_png.js';
import energySkateParkStrings from '../energySkateParkStrings.js';
import energySkatePark from '../energySkatePark.js';
import MeasureModel from './model/MeasureModel.js';
import MeasureScreenView from './view/MeasureScreenView.js';

const screenMeasureString = energySkateParkStrings.screens.measure;

class MeasureScreen extends Screen {

  /**
   * @param {EnergySkateParkPreferencesModel} preferencesModel
   * @param {Tandem} tandem
   */
  constructor( preferencesModel, tandem ) {
    const options = {
      name: screenMeasureString,
      homeScreenIcon: new ScreenIcon( new Image( measureScreenIcon_png ), {
        maxIconWidthProportion: 1,
        maxIconHeightProportion: 1
      } ),
      tandem: tandem
    };

    super(
      () => new MeasureModel( preferencesModel, tandem.createTandem( 'model' ) ),
      model => new MeasureScreenView( model, tandem.createTandem( 'view' ) ),
      options
    );

  }
}

energySkatePark.register( 'MeasureScreen', MeasureScreen );
export default MeasureScreen;