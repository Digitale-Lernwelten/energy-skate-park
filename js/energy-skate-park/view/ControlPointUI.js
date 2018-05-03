// Copyright 2014-2017, University of Colorado Boulder

/**
 * Node that shows the delete and cut buttons for track control points.  Created each time a control point is dragged.
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  // modules
  var Color = require( 'SCENERY/util/Color' );
  var energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  var FontAwesomeNode = require( 'SUN/FontAwesomeNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LinearFunction = require( 'DOT/LinearFunction' );
  var Node = require( 'SCENERY/nodes/Node' );
  var RoundPushButton = require( 'SUN/buttons/RoundPushButton' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * Constructor for the ControlPointUI for a single control point.
   * @param {EnergySkateParkBasicsModel} model the main model
   * @param {Track} track the track associated with the control point
   * @param {number} controlPointIndex the 0-based index of the control point
   * @param {ModelViewTransform2} modelViewTransform the main model-view transform
   * @param {Node} parentNode
   * @param {Tandem} tandem
   * @constructor
   */
  function ControlPointUI( model, track, controlPointIndex, modelViewTransform, parentNode, tandem ) {

    var self = this;

    // See ComboxBox.js
    var enableClickToDismissListener = true;

    // listener for 'click outside to dismiss'
    this.clickToDismissListener = {
      down: function() {
        if ( enableClickToDismissListener ) {
          if ( _.indexOf( phet.joist.display.getInputListeners(), self.clickToDismissListener ) !== -1 ) {
            phet.joist.display.removeInputListener( self.clickToDismissListener );
          }
          self.detach();
        }
        else {
          enableClickToDismissListener = true;
        }
      }
    };
    phet.joist.display.addInputListener( this.clickToDismissListener );

    Node.call( this, {
      tandem: tandem,
      phetioState: false
    } );

    var isEndPoint = controlPointIndex === 0 || controlPointIndex === track.controlPoints.length - 1;
    var alpha = new LinearFunction( 0, track.controlPoints.length - 1, track.minPoint, track.maxPoint )( controlPointIndex );
    var position = track.getPoint( alpha );
    var angle = track.getViewAngleAt( alpha );
    var modelAngle = track.getModelAngleAt( alpha );

    var disableDismissAction = { down: function() { enableClickToDismissListener = false; } };

    // Add a scissors cut button, but only for interior points and only if there aren't too many control points already
    if ( !isEndPoint && model.canCutTrackControlPoint() ) {
      var scissorNode = new FontAwesomeNode( 'cut', { fill: 'black', scale: 0.6, rotation: Math.PI / 2 - angle } );
      var cutButton = new RoundPushButton( {
        tandem: tandem.createTandem( 'cutButton' ),
        phetioState: false,
        content: scissorNode,
        listener: function() {
          model.splitControlPoint( track, controlPointIndex, modelAngle );
        },
        center: modelViewTransform.modelToViewPosition( position ).plus( Vector2.createPolar( 40, angle + Math.PI / 2 ) ),
        radius: 20,
        touchAreaRadius: 20 * 1.3,

        // yellow color scheme
        baseColor: new Color( '#fefd53' )
      } );
      cutButton.addInputListener( disableDismissAction );
      this.addChild( cutButton );
    }

    // Show the delete button.
    var deleteNode = new FontAwesomeNode( 'times_circle', { fill: 'red', scale: 0.6 } );
    var deleteButton = new RoundPushButton( {
      tandem: tandem.createTandem( 'deleteButton' ),
      phetioState: false,
      listener: function() {
        model.deleteControlPoint( track, controlPointIndex );
      },
      content: deleteNode,
      center: modelViewTransform.modelToViewPosition( position ).plus( Vector2.createPolar( 40, angle - Math.PI / 2 ) ),
      radius: 20,
      touchAreaRadius: 20 * 1.3,

      // Doesn't look exactly centered due to button shading, so adjust it slightly
      xContentOffset: -0.5,

      // yellow color scheme
      baseColor: new Color( '#fefd53' )
    } );
    deleteButton.addInputListener( disableDismissAction );
    this.addChild( deleteButton );

    this.disposeControlPointUI = function() {
      cutButton && cutButton.dispose();
      deleteButton.dispose();
    };
  }

  energySkatePark.register( 'ControlPointUI', ControlPointUI );

  return inherit( Node, ControlPointUI, {

    dispose: function() {
      this.disposeControlPointUI();
      Node.prototype.dispose.call( this );
    },

    //Override to additionally remove the attached input listener
    detach: function() {
      Node.prototype.detach.call( this );
      if ( _.indexOf( phet.joist.display.getInputListeners(), this.clickToDismissListener ) !== -1 ) {
        phet.joist.display.removeInputListener( this.clickToDismissListener );
      }
    }
  } );
} );