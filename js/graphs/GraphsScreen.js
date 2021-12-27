// Copyright 2018-2021, University of Colorado Boulder

/**
 * The "Graphs" screen.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Screen from '../../../joist/js/Screen.js';
import ScreenIcon from '../../../joist/js/ScreenIcon.js';
import { Image } from '../../../scenery/js/imports.js';
import graphsScreenIcon_png from '../../images/graphsScreenIcon_png.js';
import energySkatePark from '../energySkatePark.js';
import energySkateParkStrings from '../energySkateParkStrings.js';
import GraphsModel from './model/GraphsModel.js';
import GraphsScreenView from './view/GraphsScreenView.js';

const screenGraphsString = energySkateParkStrings.screens.graphs;

class GraphsScreen extends Screen {

  /**
   * @param {Tandem} tandem
   */
  constructor( tandem ) {
    super(
      () => new GraphsModel( tandem.createTandem( 'model' ) ),
      model => new GraphsScreenView( model, tandem.createTandem( 'view' ) ),
      {
        name: screenGraphsString,
        homeScreenIcon: new ScreenIcon( new Image( graphsScreenIcon_png ), {
          maxIconWidthProportion: 1,
          maxIconHeightProportion: 1
        } ),
        tandem: tandem
      }
    );
  }
}

energySkatePark.register( 'GraphsScreen', GraphsScreen );
export default GraphsScreen;