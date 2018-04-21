import axios from "axios";

const config = {
  headers: {'api_key': 'a2a6cab6a2104b0a95bef74fa2c62b52'}
};

export default {
  searchAll: function() {
    return axios.get("https://api.wmata.com/Bus.svc/json/jRoutes", config);
  },
  busPositions: function(query) {
    return axios.get("https://api.wmata.com/Bus.svc/json/jBusPositions?RouteID="+ query, config);
  },
  routeSearch: function(query) {
    return axios.get("https://api.wmata.com/Bus.svc/json/jRouteDetails?RouteID="+ query, config);
  },
  saveUser: function(userData) {
    return axios.post("/api/users", userData);
  }
};
