// Copyright 2013-2019, University of Colorado Boulder

/**
 * Scenery node that shows the legend for the pie chart, and a reset button for thermal energy.
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  // modules
  var energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  var EnergySkateParkColorScheme = require( 'ENERGY_SKATE_PARK/energy-skate-park/view/EnergySkateParkColorScheme' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var HStrut = require( 'SCENERY/nodes/HStrut' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MoveToTrashButton = require( 'SCENERY_PHET/MoveToTrashButton' );
  var Panel = require( 'SUN/Panel' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Text = require( 'SCENERY/nodes/Text' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var VStrut = require( 'SCENERY/nodes/VStrut' );

  // strings
  var energyEnergyString = require( 'string!ENERGY_SKATE_PARK/energy.energy' );
  var energyKineticString = require( 'string!ENERGY_SKATE_PARK/energy.kinetic' );
  var energyPotentialString = require( 'string!ENERGY_SKATE_PARK/energy.potential' );
  var energyThermalString = require( 'string!ENERGY_SKATE_PARK/energy.thermal' );
  var energyTotalString = require( 'string!ENERGY_SKATE_PARK/energy.total' );

  /**
   * @param {Skater} skater the model for the skater
   * @param {Function} clearThermal function to be called when the user presses the clear thermal button
   * @param {Property.<boolean>} pieChartVisibleProperty axon Property indicating whether the pie chart is visible
   * @param {Tandem} tandem
   * @constructor
   */
  function PieChartLegend( skater, clearThermal, pieChartVisibleProperty, tandem, options ) {

    options = _.extend( {

      // {boolean} - whether or not to include total energy in the legend, will the pie chart show total energy?
      includeTotal: true
    }, options );

    // The x-coordinate of a bar chart bar
    var createLabel = function( index, title, color, tandemName ) {
      return new Text( title, {
        tandem: tandem.createTandem( tandemName ),
        fill: color,
        font: new PhetFont( 12 ),
        pickable: false,
        maxWidth: 97 // selected by choosing the length of widest English string in ?stringTest=double
      } );
    };

    var createBar = function( index, color ) {
      return new Rectangle( 0, 0, 16.5, 16.5, {
        fill: color,
        stroke: 'black',
        lineWidth: 1
      } );
    };

    var kineticBar = createBar( 0, EnergySkateParkColorScheme.kineticEnergy );
    var potentialBar = createBar( 1, EnergySkateParkColorScheme.potentialEnergy );
    var thermalBar = createBar( 2, EnergySkateParkColorScheme.thermalEnergy );
    var totalBar = createBar( 3, EnergySkateParkColorScheme.totalEnergy );

    var kineticLabel = createLabel( 0, energyKineticString, EnergySkateParkColorScheme.kineticEnergy, 'kineticEnergyLabel' );
    var potentialLabel = createLabel( 1, energyPotentialString, EnergySkateParkColorScheme.potentialEnergy, 'potentialEnergyLabel' );
    var thermalLabel = createLabel( 2, energyThermalString, EnergySkateParkColorScheme.thermalEnergy, 'thermalEnergyLabel' );
    var totalLabel = createLabel( 3, energyTotalString, EnergySkateParkColorScheme.totalEnergy, 'totalEnergyLabel' );

    var clearThermalButton = new MoveToTrashButton( {
      arrowColor: EnergySkateParkColorScheme.thermalEnergy,
      tandem: tandem.createTandem( 'clearThermalButton' ),
      listener: clearThermal,
      centerX: thermalLabel.centerX,
      y: thermalLabel.bottom + 15,
      scale: 0.65
    } );
    skater.allowClearingThermalEnergyProperty.link( function( allowClearingThermalEnergy ) {
      clearThermalButton.enabled = allowClearingThermalEnergy;
    } );

    // Don't let the MoveToTrashButton participate in the layout since it is too big vertically.  Just use a strut to
    // get the width right, then add the undo button later
    var clearThermalButtonStrut = new Rectangle( 0, 0, clearThermalButton.width, 1, {} );

    var children = [
      new HBox( { spacing: 4, children: [ kineticBar, kineticLabel ] } ),
      new HBox( { spacing: 4, children: [ potentialBar, potentialLabel ] } ),
      new HBox( {
        spacing: 4,
        children: [ thermalBar, thermalLabel, new HStrut( 1 ), clearThermalButtonStrut, new HStrut( 3 ) ]
      } )
    ];

    if ( options.includeTotal ) {
      children.push( new HBox( { spacing: 4, children: [ totalBar, totalLabel ] } ) );
    }

    children.push( new VStrut( 1 ) );

    var contentNode = new VBox( { spacing: 5, align: 'left', children: children } );

    var titleNode = new Text( energyEnergyString, {
      tandem: tandem.createTandem( 'titleNode' ),
      fill: 'black',
      font: new PhetFont( 14 ),
      pickable: false,
      maxWidth: 93 // selected by choosing the length of widest English string in ?stringTest=double
    } );
    var contentWithTitle = new VBox( {
      spacing: 5, align: 'center', children: [
        titleNode,
        contentNode
      ]
    } );

    Panel.call( this, contentWithTitle,
      {
        x: 4,
        y: 4,
        xMargin: 6,
        yMargin: 5,
        fill: 'white',
        stroke: 'gray',
        lineWidth: 1,
        resize: false,
        tandem: tandem
      } );

    this.addChild( clearThermalButton );
    var strutGlobal = clearThermalButtonStrut.parentToGlobalPoint( clearThermalButtonStrut.center );
    var buttonLocal = clearThermalButton.globalToParentPoint( strutGlobal );
    clearThermalButton.center = buttonLocal;

    pieChartVisibleProperty.linkAttribute( this, 'visible' );
  }

  energySkatePark.register( 'PieChartLegend', PieChartLegend );

  return inherit( Panel, PieChartLegend );
} );