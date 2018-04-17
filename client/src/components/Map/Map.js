//Working basic Map
//
// import React from "react";
//
// import { compose, withProps, withHandlers } from "recompose";
// import { withScriptjs, withGoogleMap, GoogleMap, Marker, Polyline } from "react-google-maps";
//
// const MapWithAMarker = compose(
//   withProps({
//     googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places",
//     loadingElement: <div style={{ height: `100%` }} />,
//     containerElement: <div style={{ height: `400px` }} />,
//     mapElement: <div style={{ height: `100%` }} />,
//   }),
//   withScriptjs,
//   withGoogleMap)(props =>
//   <GoogleMap
//     defaultZoom={props.defaultZoom}
//     defaultCenter={{ lat: 38.9072, lng: -77.0369 }} >
//   <Marker position={{ lat: 38.9072, lng: -77.0369 }}  />
//   <Polyline>{props.path}</Polyline>
//
//   </GoogleMap>
// );
//
//
// export default MapWithAMarker;


import React, {Component} from "react";

import { compose, withProps, withHandlers } from "recompose";
// import { withGoogleMap, GoogleMap, Marker, Polyline } from "react-google-maps";

import { withScriptjs, withGoogleMap, GoogleMap, Marker, Polyline } from "react-google-maps";

// class Map extends Component {
//
//     render() {
//       return (
//             <GoogleMap
//               defaultZoom={props.defaultZoom}
//               defaultCenter={{ lat: 38.9072, lng: -77.0369 }} >
//               // {props.markers.map((marker,index) => (
//               //   <Marker {...marker} />
//               //   )
//               // )}
//               <Marker position={{ lat: 38.9072, lng: -77.0369}} />
//
//             </GoogleMap>
//           )
//     }
//   }
//
//
// export default withGoogleMap(Map);

//------------------------------Working Polyline On Load------------------------------//
const MapRender = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCOyZQ_jUpH1-rnOCDRlbZGCAWtyRU2lXw&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
//   lifecycle({
//     componentDidMount() {
//       const Polyline = new google.maps.Polyline();
//
//       Polyline.setPath({
//         path: {props.path}
//     })
//   }
// })
)(props =>
  <GoogleMap
    defaultZoom={props.defaultZoom}
    defaultCenter={{ lat: 38.9072, lng: -77.0369 }} >
  {props.markers.map((bus,i) => (
    <Marker key={i} position={bus} />
  ))}
  <Polyline path={props.test} />

  </GoogleMap>
);
export default MapRender;
//------------------------------Working Polyline------------------------------//
