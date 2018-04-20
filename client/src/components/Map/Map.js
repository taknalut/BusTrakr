import React, {Component} from "react";
import { compose, withProps, withState, withHandlers } from "recompose";
import { withGoogleMap, GoogleMap, Marker, Polyline } from "react-google-maps";
// const BusStopPic = require("../components/Images/bus-stop.png");
// const BusPic = require("../components/Images/bus.png");


const google = window.google;

//------------------------------Working Polyline On Load------------------------------//
const MapRender = compose(
  withProps({
    // googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCOyZQ_jUpH1-rnOCDRlbZGCAWtyRU2lXw&v=3.exp&libraries=geometry,drawing,places",
    // loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  // withState('zoom', 'onZoomChange', 8, 'pathBounds'),
  withHandlers(() => {
    const refs = {
      map: undefined,
    }
    return {
      onMapMounted: () => ref => {
        refs.map = ref
      },
      onZoomChanged: ({ onZoomChange }) => () => {
        onZoomChange(refs.map.getZoom())
      }
      // ,
      // fitBounds: ({ pathBounds }) => () => {
      //   pathBounds(refs.map.fitBounds(Polyline.getBounds()))
      //   console.log("working?")

      // {map.fitBounds({props.test2}.getBounds())}
      // }
    }
  }),
  withGoogleMap
)(props =>
  <GoogleMap
    ref={props.onMapMounted}
    defaultZoom={props.defaultZoom}
    center={props.center}
    defaultCenter={{ lat: 38.9072, lng: -77.0369 }} >
  {props.markers.map((bus,i) => (
    <Marker key={i} position={bus.position} animation={google.maps.Animation.DROP}
      icon={{
        url:"../Images/bus.png",
        size: new google.maps.Size(300, 300),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)}}
    />
  ))}
  <Polyline path={props.test} options={{strokeColor:'black',strokeWeight: 4}} />
  </GoogleMap>
);
export default MapRender;


//------------------------------Working Polyline------------------------------//
