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
      zoom={props.zoomTo}
      center={props.center}
      defaultCenter={{ lat: 38.9072, lng: -77.0369 }} >
      <Marker position={props.userLocation} />
      {props.markers.map((bus,index) => (
        <Marker key={index} position={bus.position} animation={google.maps.Animation.DROP} onClick={() => props.onBusToggleOpen(index)}
          icon={{
            url:"https://s3.us-east-2.amazonaws.com/bustrakr/busloc.png",
            size: new google.maps.Size(50, 50),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(0, 0),
            scaledSize: new google.maps.Size(50, 50)
          }}
          z-index={20}
      >
        {props.selectedBusPlace === index && <InfoWindow onCloseClick={props.onBusToggleOpen} position={bus.location}>
            <div className="text-black mb-3 mt-3">
              <h5>Current Bus Position</h5>
                <div>
                    <p><strong>Bus Location Update in:</strong> {props.timer}</p>
                    <p><strong>Destination:</strong> {bus.tripHeadSign}</p>
                    <p><strong>Direction:</strong> {bus.directionText}</p>
                    <p><strong>Deviation:</strong> {bus.deviation}</p>
                </div>
              </div>
        </InfoWindow>}
      </Marker>
    ))}
    {props.stops0.map((stop,i) => (
      <Marker key={i} position={stop.location} stopID={stop.StopID} name={stop.Name} routes={stop.Routes} animation={google.maps.Animation.DROP} opacity={0.8} onClick={() => {props.onStop0ToggleOpen(i);props.predictions0(stop.StopID)}}
        icon={{
          url:"https://s3.us-east-2.amazonaws.com/bustrakr/bus-stop.png",
          size: new google.maps.Size(25, 25),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(0, 0),
          scaledSize: new google.maps.Size(25, 25)
        }}
        z-index={2}
        >
            {props.selectedStopPlace0 === i && <InfoWindow key={i} onCloseClick={props.onStop0ToggleOpen} position={stop.location}>
                <div className="text-black mt-3">
                  <h5>Bus Stop: {stop.Name}</h5>
                    <div>
                        {props.predictionInfo0.map((arrivalTime) => (
                          <p key={arrivalTime.TripID}> <strong>Minutes Away:</strong> {arrivalTime.MinutesAwayPrediction}, <strong>Route:</strong> {arrivalTime.RouteID}, {arrivalTime.DirectionText} </p>
                        ))}
                        <p><strong>StopID:</strong> {stop.StopID}</p>
                        <p><strong>All Possible Routes:</strong> {stop.Routes}</p>
                    </div>
                </div>
            </InfoWindow>}
        </Marker>
    ))}
    {props.stops1.map((stop,id) => (
      <Marker key={id} position={stop.location} stopID={stop.StopID} name={stop.Name} routes={stop.Routes} animation={google.maps.Animation.DROP} opacity={0.8} onClick={() => {props.onStop1ToggleOpen(id);props.predictions1(stop.StopID)}}
        icon={{
          url:"https://s3.us-east-2.amazonaws.com/bustrakr/bus-stop.png",
          size: new google.maps.Size(25, 25),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(0, 0),
          scaledSize: new google.maps.Size(25, 25)
        }}
        z-index={2}
        >
          {props.selectedStopPlace1 === id && <InfoWindow key={id} onCloseClick={props.onStop0ToggleOpen} position={stop.location}>
              <div className="text-black mt-3">
                <h5>Bus Stop: {stop.Name}</h5>
                  <div>
                      {props.predictionInfo1.map((arrivalTime) => (
                        <p key={arrivalTime.TripID}> <strong>Minutes Away:</strong> {arrivalTime.MinutesAwayPrediction}, <strong>Route:</strong> {arrivalTime.RouteID}, {arrivalTime.DirectionText} </p>
                      ))}
                      <p><strong>StopID:</strong> {stop.StopID}</p>
                      <p><strong>All Possible Routes:</strong> {stop.Routes}</p>
                  </div>
              </div>
          </InfoWindow>}
        </Marker>
    ))}
    <Polyline path={props.path0} options={{strokeColor:'red',strokeWeight: 4.5}} z-index={0} />
    <Polyline path={props.path1} options={{strokeColor:'black',strokeWeight: 2.5}} z-index={1} />
  </GoogleMap>
);

export default MapRender;
