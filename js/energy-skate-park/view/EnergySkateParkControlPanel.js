// Copyright 2013-2018, University of Colorado Boulder

/**
 * Scenery node for the control panel, with view settings and controls.
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  // modules
  var Constants = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/Constants' );
  var energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  var EnergySkateParkColorScheme = require( 'ENERGY_SKATE_PARK/energy-skate-park/view/EnergySkateParkColorScheme' );
  var EnergySkateParkVisibilityControls = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/EnergySkateParkVisibilityControls' );
  var HSeparator = require( 'SUN/HSeparator' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Panel = require( 'SUN/Panel' );
  var PhysicalSlider = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/PhysicalSlider' );
  var Range = require( 'DOT/Range' );
  var SceneSelectionRadioButtonGroup = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/SceneSelectionRadioButtonGroup' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  var controlsFrictionTitleString = require( 'string!ENERGY_SKATE_PARK/controls.friction.title' );
  var controlsGravityString = require( 'string!ENERGY_SKATE_PARK/controls.gravity' );
  var controlsMassString = require( 'string!ENERGY_SKATE_PARK/controls.mass' );
  var controlsValueTinyString = require( 'string!ENERGY_SKATE_PARK/controls.value.tiny' );
  var smallString = require( 'string!ENERGY_SKATE_PARK/small' );

  /**
   * @param {EnergySkateParkModel} model
   * @param {EnergySkateParkScreenView} screenView
   * @param {Tandem} tandem
   * @constructor
   */
  function EnergySkateParkControlPanel( model, screenView, modelViewTransform, tandem, options ) {

    options = _.extend( {
      includeMassSlider: false, // include a slider that changes mass?
      includeGravitySlider: true, // include a slider that changes gravity?
      includeFrictionSlider: false, // include a slider that changes friction?
      includeTrackSelection: false,

      // passed to EnergySkateParkVisibilityControls, see that type for supported options
      visibilityControlsOptions: {}
    }, options );

    options.visibilityControlsOptions = _.extend( {}, options.visibilityControlsOptions );

    // controls that change visibility of items in the screen
    var visibilityControls = new EnergySkateParkVisibilityControls( model, tandem.createTandem( 'visibilityControls' ), options.visibilityControlsOptions );
    var children = [ visibilityControls ];

    // separator between visibility controls and track selection buttons
    var separatorWidth = visibilityControls.width - 10;
    children.push( new HSeparator( separatorWidth ) );

    if ( options.includeTrackSelection ) {
      children.push( new SceneSelectionRadioButtonGroup( model, screenView, modelViewTransform, tandem.createTandem( 'sceneSelectionRadioButtonGroup' ) ) );
      children.push( new HSeparator( separatorWidth ) );
    }

    if ( options.includeMassSlider ) {
      children.push( new PhysicalSlider(
        model.skater.massProperty,
        model.skater.massRange,
        controlsMassString,
        tandem.createTandem( 'massPhysicalSlider' ), {
          minLabel: smallString
        }
      ) );
    }

    if ( options.includeFrictionSlider ) {
      assert && assert( model.frictionProperty.value > 0, 'if including friction, it must have non-zero initial value' );

      children.push( new PhysicalSlider(
        model.frictionProperty,
        new Range( 0, model.frictionProperty.value * 2 ),
        controlsFrictionTitleString,
        tandem.createTandem( 'frictionPhysicalSlider' )
      ) );
    }

    if ( options.includeGravitySlider ) {
      children.push( new PhysicalSlider(
        model.skater.gravityMagnitudeProperty,
        new Range( Math.abs( Constants.MIN_GRAVITY ), Math.abs( Constants.MAX_GRAVITY ) ),
        controlsGravityString,
        tandem.createTandem( 'gravityPhysicalSlider' ), {
          minLabel: controlsValueTinyString
        }
      ) );
    }

    var content = new VBox( { resize: false, spacing: 10, children: children } );

    Panel.call( this, content, {
      xMargin: 10,
      yMargin: 5,
      fill: EnergySkateParkColorScheme.panelFill,
      stroke: null,
      resize: false,
      tandem: tandem
    } );
  }

  energySkatePark.register( 'EnergySkateParkControlPanel', EnergySkateParkControlPanel );

  return inherit( Panel, EnergySkateParkControlPanel );
} );