angular.module('app').factory('FourSquareService', function($http, $q, UtilsService) {
  return {
      explore: function(offset, nearQuery, whatQuery){
        var promise = $http.get(this.buildExploreURL(offset, nearQuery, whatQuery));
        return promise.then(function(data) {
          var items = []
          if(data.status === 200 && data.data.meta.code === 200){
            data.data.response.groups.every(function(group){
              if(group.name === 'recommended'){
                items = group.items;
                return false;
              }
              return true;
            });
          }
          items.forEach(function(item){
            if(item.venue.featuredPhotos.items){
              var photo = item.venue.featuredPhotos.items[0];
              item.photoURL = photo.prefix + '500x375' + photo.suffix;
            }
          });
          return items;
        });
      },
      tips: function(venueId){
          return $http.get(this.buildTipsURL(venueId)).then(function(data){
            if(data.status === 200){
              return data.data.response.tips.items;
            } else {
              return []; //Error, return empty array
            }
          }, function(){
            return []; //Error, return empty array
          });
      },
      buildTipsURL: function(venueId){
          var obj = {
            limit: 5,
            sort: 'popular'
          }
          obj = UtilsService.mergeObj(obj, FOURSQUARE_API_BASE);
          return FOURSQUARE_TIPS_API.replace("{{VENUE_ID}}", venueId) + "?" + UtilsService.objToQueryString(obj);
      },
      buildExploreURL: function(offsetNb, nearQuery, whatQuery){
        var obj = {
          limit: 20,
          offset: offsetNb,
          venuePhotos: 1
        }

        obj = UtilsService.mergeObj(obj, FOURSQUARE_API_BASE);
        if(!nearQuery && !this.lastNear){
          obj.ll = localStorage.getItem('currentIpLocation');
        } else {
          obj.near = nearQuery || this.lastNear || "";
          this.lastNear = obj.near;
        }
        if(whatQuery){
          obj.query = whatQuery;
        }
        return FOURSQUARE_EXPLORE_API + "?" + UtilsService.objToQueryString(obj);
      }
  };
});
