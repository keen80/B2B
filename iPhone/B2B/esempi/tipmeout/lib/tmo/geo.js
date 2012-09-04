var Tmo = Tmo || {};

Tmo.Geo = function()
{
  this.locations = {
      'Paris':   {
          'lat': 48.85161367977706,
          'lng': 2.3781967163085938
      },
      'Bielsko':   {
          'lat': 49.8139312,
          'lng': 19.0356774
      }
  };
  
  this.loadDefinedLocation('Bielsko');
};

Tmo.Geo.prototype.setPosition = function(lat,lng)
{
  this.lat = lat;
  this.lng = lng;
  this.position = new google.maps.LatLng(lat, lng);
};

Tmo.Geo.prototype.loadDefinedLocation = function(name)
{
  this.setPosition( this.locations[name].lat, this.locations[name].lng );
};

Tmo.Geo.prototype.load = function(success,failure)
{
  var onSuccess = function(position) {
    Tmo.LoadMask.hide();
    Tmo.geo.setPosition( position.coords.latitude, position.coords.longitude );
    if (!Ext.isEmpty(success)) {
      success.call();
    }
    if (!Ext.isEmpty(failure)) {
      failure.call();
    }
  };

  var onError = function(error) {
    Tmo.LoadMask.hide();
    if (error.code == PositionError.PERMISSION_DENIED)
        Ext.Msg.alert(I18n.t('support.geolocation.error_title'), I18n.t('support.geolocation.permission_denied'));
    else if (error.code == PositionError.POSITION_UNAVAILABLE)
        Ext.Msg.alert(I18n.t('support.geolocation.error_title'), I18n.t('support.geolocation.position_unavailable'));
    else
        Ext.Msg.alert(I18n.t('support.geolocation.error_title'), I18n.t('support.geolocation.timeout'));
  };

  var getPositionHighAccuracyOptions = {
      maximumAge: 300000, // 5 minutes
      timeout: 5000,
      enableHighAccuracy: true
  };

  if ( Ext.is.Desktop ) {
      getPositionHighAccuracyOptions = {
          maximumAge: 10000,
          timeout: 1000
      };
  }

  Tmo.LoadMask.show();
  navigator.geolocation.getCurrentPosition(onSuccess, onError, getPositionHighAccuracyOptions);
};

Tmo.geo = new Tmo.Geo();
