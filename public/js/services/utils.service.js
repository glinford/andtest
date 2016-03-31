angular.module('app').factory('UtilsService', function($http, $q) {
  return {
    getLocalizationByIP: function(){
      localStorage.removeItem('currentIpLocation');
      return $http.get(IP_API).then(function(data){
        if(data.status === 200){
          localStorage.setItem('currentIpLocation', data.data.lat + "," + data.data.lon);
          return data.data.lat + "," + data.data.lon;
        } else {
          // Should Not Happen .. but well we have 2 fallbacks
          return this.geoFallbacks();
        }
      }, function(){
        // Should Not Happen .. but well we have 2 fallbacks
        return this.geoFallbacks();
      }.bind(this));
    },
    geoFallbacks: function(){
      d = $q.defer();
      navigator.geolocation.getCurrentPosition(function(position) { //(fallback 1)
        if(position.coords.latitude && position.coords.longitude){
          localStorage.setItem('currentIpLocation', position.coords.latitude + ',' + position.coords.longitude);
          d.resolve(position.coords.latitude + ',' + position.coords.longitude);
        } else {
          localStorage.setItem('currentIpLocation', CENTRAL_LONDON_GEO);
          d.resolve(CENTRAL_LONDON_GEO);
        }
      }, function(){
        // the dude don't want share geolocation, so will target him to london center (fallback 2)
        localStorage.setItem('currentIpLocation', CENTRAL_LONDON_GEO);
        d.resolve(CENTRAL_LONDON_GEO);
      });
      return d.promise;
    },
    objToQueryString: function(obj) {
      var parts = [];
      for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
          parts.push(encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]));
        }
      }
      return parts.join("&");
    },
    mergeObj: function(obj, src) {
        for (var key in src) {
          if (src.hasOwnProperty(key)){
            obj[key] = src[key];
          }
        }
        return obj;
    }

  }
});
