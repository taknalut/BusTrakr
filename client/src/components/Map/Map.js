import React, {Component} from "react";
import { compose, withProps, withState, withHandlers, withStateHandlers} from "recompose";
import { withGoogleMap, GoogleMap, Marker, Polyline, InfoWindow } from "react-google-maps";
import Search from "../Search";
import API from "../../utils/API";

const google = window.google;

const MapRender = compose(
  withProps({
    // googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCOyZQ_jUpH1-rnOCDRlbZGCAWtyRU2lXw&v=3.exp&libraries=geometry,drawing,places",
    // loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withState('selectedStopPlace0', 'updateSelectedStopPlace0', null),
  withState('selectedStopPlace1', 'updateSelectedStopPlace1', null),
  withState('selectedBusPlace', 'updateSelectedBusPlace', null),
  withHandlers(() => {
  const refs = {
    map: undefined,
  }

  return {
    onMapMounted: () => ref => {
        refs.map = ref
    },
    onStop0ToggleOpen: ({ updateSelectedStopPlace0 }) => key => {
        updateSelectedStopPlace0(key);
    },
    onStop1ToggleOpen: ({ updateSelectedStopPlace1 }) => key => {
        updateSelectedStopPlace1(key);
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
            size: new google.maps.Size(25, 25),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(0, 0),
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
    {props.stops0.map((stop,i) => (
      <Marker key={i} position={stop.location} stopID={stop.StopID} name={stop.Name} routes={stop.Routes} animation={google.maps.Animation.DROP} opacity={0.8} onClick={() => props.onStop0ToggleOpen(i)}
        icon={{
          url:"../Images/bus-stop.png",
          size: new google.maps.Size(25, 25),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(0, 0),
          scaledSize: new google.maps.Size(25, 25)
        }}
        z-index={2}
        >
            {props.selectedStopPlace0 === i && <InfoWindow key={i} onCloseClick={props.onStop0ToggleOpen} position={stop.location} onClick={props.predictions0(stop.StopID)}>
                <div>
                    <p><strong>Bus Stop Name:</strong> {stop.Name}</p>
                    {props.predictionInfo0.map((arrivalTime) => (
                        <p key={arrivalTime.TripID}> <strong>Minutes Away:</strong> {arrivalTime.MinutesAwayPrediction}, <strong>Route:</strong> {arrivalTime.RouteID}, {arrivalTime.DirectionText} </p>
                  ))}
                  <p>StopID: {stop.StopID}</p>
                  <p>All Possible Routes: {stop.Routes}</p>
                </div>
            </InfoWindow>}
        </Marker>
    ))}
    {props.stops1.map((stop,id) => (
      <Marker key={id} position={stop.location} stopID={stop.StopID} name={stop.Name} routes={stop.Routes} animation={google.maps.Animation.DROP} opacity={0.8} onClick={() => props.onStop1ToggleOpen(id)}
        icon={{
          url:"../Images/bus-stop.png",
          size: new google.maps.Size(25, 25),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(0, 0),
          scaledSize: new google.maps.Size(25, 25)
        }}
        z-index={2}
        >
            {props.selectedStopPlace1 === id && <InfoWindow key={id} onCloseClick={props.onStop1ToggleOpen} position={stop.location} onClick={props.predictions1(stop.StopID)}>
                <div>
                    <p><strong>Bus Stop Name:</strong> {stop.Name}</p>
                    {props.predictionInfo1.map((arrivalTime) => (
                        <p key={arrivalTime.TripID}> <strong>Minutes Away:</strong> {arrivalTime.MinutesAwayPrediction}, <strong>Route:</strong> {arrivalTime.RouteID}, {arrivalTime.DirectionText} </p>
                  ))}
                  <p>StopID: {stop.StopID}</p>
                  <p>All Possible Routes: {stop.Routes}</p>
                </div>
            </InfoWindow>}
        </Marker>
    ))}
    <Polyline path={props.path0} options={{strokeColor:'red',strokeWeight: 4.5}} z-index={0} />
    <Polyline path={props.path1} options={{strokeColor:'black',strokeWeight: 2.5}} z-index={1} />
  </GoogleMap>
);

export default MapRender;
