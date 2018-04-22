import React, {Component} from "react";
import { compose, withProps, withState, withHandlers, withStateHandlers} from "recompose";
import { withGoogleMap, GoogleMap, Marker, Polyline, InfoWindow } from "react-google-maps";
import Search from "../Search";

const google = window.google;

//------------------------------Working Polyline On Load------------------------------//
const MapRender = compose(
  withProps({
    // googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCOyZQ_jUpH1-rnOCDRlbZGCAWtyRU2lXw&v=3.exp&libraries=geometry,drawing,places",
    // loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withState('selectedStopPlace', 'updateSelectedStopPlace', null),
  withState('selectedBusPlace', 'updateSelectedBusPlace', null),
  withHandlers(() => {
  const refs = {
    map: undefined,
  }

  return {
    onMapMounted: () => ref => {
        refs.map = ref
    },
    onStopToggleOpen: ({ updateSelectedStopPlace }) => key => {
        updateSelectedStopPlace(key);
    },
    onBusToggleOpen: ({ updateSelectedBusPlace }) => key => {
        updateSelectedBusPlace(key);
    }
  }
}),
  withGoogleMap
)(props =>
    <GoogleMap
      ref={props.onMapMounted}
      defaultZoom={props.defaultZoom}
      center={props.center}
      defaultCenter={{ lat: 38.9072, lng: -77.0369 }} >
      {props.markers.map((bus,index) => (
        <Marker key={index} position={bus.position} animation={google.maps.Animation.BOUNCE} onClick={() => props.onBusToggleOpen(index)}
          icon={{
            url:"../Images/bus.png",
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 17),
            scaledSize: new google.maps.Size(25, 25)
          }}
          z-index={100}
      >
        {props.selectedBusPlace === index && <InfoWindow onCloseClick={props.onBusToggleOpen} position={bus.location}>
          <div>
              <p>Destination: {bus.tripHeadSign}</p>
              <p>Direction: {bus.directionText}</p>
              <p>Deviation: {bus.deviation}</p>
          </div>
        </InfoWindow>}
      </Marker>
    ))}
    {props.stops.map((stop,index) => (
      <Marker key={index} position={stop.location} stopID={stop.StopID} name={stop.Name} routes={stop.Routes} animation={google.maps.Animation.DROP} opacity={0.8} onClick={() => props.onStopToggleOpen(index)}
        icon={{
          url:"../Images/bus-stop.png",
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 17),
          scaledSize: new google.maps.Size(25, 25)
        }}
        z-index={2}
        >
            {props.selectedStopPlace === index && <InfoWindow onCloseClick={props.onStopToggleOpen} position={stop.location}>
                <div>
                    <p>Name: {stop.Name}</p>
                    <p>StopID: {stop.StopID}</p>
                    <p>Routes: {stop.Routes}</p>
                </div>
            </InfoWindow>}
        </Marker>
    ))}
    <Polyline path={props.path} options={{strokeColor:'black',strokeWeight: 2.5}} z-index={1} />
  </GoogleMap>
);
export default MapRender;


//------------------------------Working Polyline------------------------------//
