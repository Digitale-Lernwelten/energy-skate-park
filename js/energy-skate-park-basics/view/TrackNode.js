// Copyright 2002-2013, University of Colorado Boulder

/**
 * Scenery node for the track, which can be translated by dragging the track, or manipulated by dragging its control points.
 *
 * TODO: Link tracks together by connecting them.
 * TODO: Depict 'open' control points as a different color so you know they can be connected
 * TODO: Show a dotted line along the track in 'roller coaster' mode.
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Circle = require( 'SCENERY/nodes/Circle' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  var Vector2 = require( 'DOT/Vector2' );
  var Shape = require( 'KITE/Shape' );
  var LineStyles = require( 'KITE/util/LineStyles' );

  function TrackNode( model, track, modelViewTransform ) {
    var trackNode = this;
    Node.call( this, { renderer: 'svg' } );
    var road = new Path( null, {fill: 'black', cursor: track.interactive ? 'pointer' : 'default'} );
    this.addChild( road );
    var clickOffset = null;

    var dragHandler = new SimpleDragHandler( {
        allowTouchSnag: true,
        translate: function( options ) {
          var delta = options.delta;
          var modelDelta = modelViewTransform.viewToModelDelta( delta );
          track.translate( modelDelta.x, modelDelta.y );

          //If the user moved it out of the toolbox, then make it physically interactive
          track.physical = true;
        }

        //TODO: When dropping the track in the toolbox, make nonphysical and reset coordinates
      }
    );

    //TODO: KITE currently reports the wrong interaction bounds for the cubic splines.  Why?  Create a scenery ticket.  If necessary, we could build an adapter that uses svg listeners?
    //TODO: Or we could employ a workaround (piecewise segments for example)
    //TODO: Another workaround would be to put a giant rectangle around the entire track and use that for picking bounds (maybe even highlight it on mouseover so it is clear what is happening)
    if ( track.interactive ) {
      road.addInputListener( dragHandler );
    }

    //Reuse arrays to save allocations and prevent garbage collections
    var x = [];
    var y = [];

    //Store for performance
    var lastPt = (track.length - 1) / track.length;

    //Sample space, which is recomputed if the track gets longer, to keep it looking smooth no matter how many control points
    var linSpace = numeric.linspace( 0, lastPt, 20 * (track.length - 1) );
    var lengthForLinSpace = track.length;

    var updateTrackShape = function() {

      var i = 0;
      //Update the sample range when the number of control points has changed
      if ( lengthForLinSpace !== track.length ) {
        lastPt = (track.length - 1) / track.length;
        linSpace = numeric.linspace( 0, lastPt, 20 * (track.length - 1) );
        lengthForLinSpace = track.length;
      }

      //clear arrays, reusing them to save on garbage
      x.length = 0;
      y.length = 0;

      for ( i = 0; i < track.length; i++ ) {
        x.push( track.get( i ).value.x );
        y.push( track.get( i ).value.y );
      }

      //Compute points for lineTo
      //TODO: See if there is a way to use the KITE SVG/Canvas curve APIs to render this
      var xPoints = track.xSpline.at( linSpace );
      var yPoints = track.ySpline.at( linSpace );

      var tx = trackNode.getTranslation();
      var shape = new Shape().moveTo( modelViewTransform.modelToViewX( xPoints[0] ) - tx.x, modelViewTransform.modelToViewY( yPoints[0] ) - tx.y );
      for ( i = 1; i < xPoints.length; i++ ) {
        shape.lineTo( modelViewTransform.modelToViewX( xPoints[i] ) - tx.x, modelViewTransform.modelToViewY( yPoints[i] ) - tx.y );
      }

      var strokeStyles = new LineStyles( {
        lineWidth: 10,
        lineCap: 'butt',
        lineJoin: 'miter',
        miterLimit: 10
      } );
      road.shape = shape.getStrokedShape( strokeStyles );
    };

    if ( track.interactive ) {
      for ( var i = 0; i < track.length; i++ ) {
        (function() {
          var controlPoint = track.get( i );
          var controlPointNode = new Circle( 14, {pickable: false, opacity: 0.7, stroke: 'black', lineWidth: 2, fill: 'red', cursor: 'pointer', translation: modelViewTransform.modelToViewPosition( controlPoint.value )} );

          //Make it so you can only translate the track to bring it out of the toolbox, but once it is out of the toolbox it can be reshaped
          track.physicalProperty.link( function( physical ) { controlPointNode.pickable = physical; } );

          controlPoint.link( function( position ) {
            controlPointNode.translation = modelViewTransform.modelToViewPosition( position );
          } );
          controlPointNode.addInputListener( new SimpleDragHandler(
            {
              allowTouchSnag: true,
              start: function( event ) {
              },
              drag: function( event ) {

                var globalPoint = controlPointNode.globalToParentPoint( event.pointer.point );

                //trigger reconstruction of the track shape based on the control points
                controlPoint.value = modelViewTransform.viewToModelPosition( globalPoint );

                //If the user moved it out of the toolbox, then make it physically interactive
                track.physical = true;
              },
              translate: function() {

              },
              end: function( event ) {
              }
            } ) );
          trackNode.addChild( controlPointNode );
        })();
      }
    }
    //If any control point dragged, update the track
    for ( var index = 0; index < track.length; index++ ) {
      track.get( index ).link( updateTrackShape );
    }

    track.addItemAddedListener( function( item ) {
      item.link( updateTrackShape );
      updateTrackShape();
    } );

    track.addItemRemovedListener( function( item ) {
      item.unlink( updateTrackShape );
      updateTrackShape();
    } );

    track.addTranslationListener( function( dx, dy ) {
      trackNode.translate( modelViewTransform.modelToViewDelta( {x: dx, y: dy} ) );
    } );
  }

  return inherit( Node, TrackNode );
} );