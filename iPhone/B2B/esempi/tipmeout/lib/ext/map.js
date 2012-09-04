/* fix map */
Ext.gesture.Manager.onMouseEventOld = Ext.gesture.Manager.onMouseEvent;
Ext.gesture.Manager.onMouseEvent = function(e) {
    var target = e.target;
    while (target) {
        if (Ext.fly(target) && Ext.fly(target).hasCls('x-map')) {
            return;
        }
        target = target.parentNode;
    }
    this.onMouseEventOld.apply(this, arguments);
};

/* class to sync list with map */
function MapListObserver(card, mapContainer, list) {
    this.markers = [];
    this.card = card;
    this.mapContainer = mapContainer;
    this.map = mapContainer.map;
    this.list = list;
    this.offset = 0;

    var infowindowOptions = {
        alignBottom: true,
        boxClass: 'gm_info_window',
        closeBoxMargin: "2px 2px 2px 2px",
        closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif",
        infoBoxClearance: new google.maps.Size(1, 1),
        isHidden: false,
        pane: "floatPane",
        enableEventPropagation: false,
        zIndex: 999
    };

    this.infowindow = new InfoBox(infowindowOptions);

    /*
     this.myLocationMarker = new google.maps.Marker({
     position: Tmo.geo.position,
     map: this.map,
     icon: new google.maps.MarkerImage('images/icons/map/pin.png')
     });
     */
}

MapListObserver.prototype.rebindList = function(newList) {
    this.list = newList;
    this.clearMarkers();
};

MapListObserver.prototype.clearMarkers = function() {

    MapListObserver.hideInfoWindows();

    if (Ext.isEmpty(this.markers)) {
        return;
    }

    Ext.each(this.markers, function() {
        this.setMap(null);
    });
    this.markers = [];
};

MapListObserver.prototype.renderMarkers = function(options)
{
    var list = this.list;
    var options = options || {};

    if (Ext.isEmpty(this.list.store)) {return;}

    this.clearMarkers();

    Ext.each(this.list.store.data.items, function(item, index, allItems) {
        if (!(item.getPosition().Na == 0 && item.getPosition().Oa == 0))
        {
            var map = this.map;
            var list = this.list;
            var infowindow = this.infowindow;

            var marker = new google.maps.Marker({
                map: this.map,
                position: item.getPosition(),
                icon: new google.maps.MarkerImage( item.getMapIcon(), null, null, null, new google.maps.Size(25, 25) )
            });

            google.maps.event.addListener(marker, 'click', function() {
                infowindow.setContent(item.getInfoWindow(list, index, marker.map));
                infowindow.open(map, this);
            });

            this.markers.push(marker);
        }
    }, this);

    if (options.setCenter == undefined ? true : options.setCenter) {
        this.centerMapToMarkers();
    }
};

MapListObserver.prototype.isEmpty = function() {
    return !(this.list.store.data.length > 0 && this.markers.length > 0);
}

MapListObserver.prototype.centerMapToMarkers = function() {
    if ( this.isEmpty() )
        return false;

    var centerPosition;
    var selectedRecords = this.list.getSelectedRecords();
    if (!Ext.isEmpty(selectedRecords)) {
        centerPosition = selectedRecords[0].getPosition();
    } else {
        centerPosition = App.mapListObserver.markers[0].position;
    }
    this.map.setCenter(centerPosition);

    return true;
};

MapListObserver.prototype.navigateToSpotByOffset = function(offset) {
    if ( this.isEmpty() )
        return false;

    var last = this.markers.length - 1;

    this.offset += offset;

    if ( this.offset < 0 ) {
        this.offset = 0;
    } else if ( this.offset > last ) {
        this.offset = last;
    }

    this.map.setCenter( this.markers[this.offset].position );

    return true;
}

MapListObserver.prototype.getCurrentSpot = function() {
    if ( this.isEmpty() )
        return null;

    if (!this.list.store.getAt(this.offset))
        this.offset = 0;
    return this.list.store.getAt(this.offset);
};

MapListObserver.hideInfoWindows = function()
{
    Ext.select('.gm_info_window').hide();
};




var Tmo = Tmo || {};

/* class to unify markers rendering */
Tmo.MyLocationMarker = function() {
  this.markers = {};
};

Tmo.MyLocationMarker.prototype.renderMarkerAtPositionOnMap = function(map_id, position, options)
{
    var map = Ext.getCmp(map_id).map;

    options = options || {};
    
    if (options.setCenter == undefined ? true : options.setCenter) {
        map.setCenter( position );
    }

    if ( !Ext.isEmpty(this.markers[map_id]) ) {
      this.markers[map_id].setMap(null);
    }

    this.markers[map_id] = new google.maps.Marker({
      position: position,
      map: map,
      icon: new google.maps.MarkerImage('images/icons/map/pin.png')
      //icon: "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=12|FFFF00|000000"
    });
};

Tmo.MyLocationMarker.prototype.clearMarker = function(map_id) {
  if ( this.hasMarker(map_id) ) {
    this.markers[map_id].setMap(null);
    this.markers[map_id] = null;
  }
};

Tmo.MyLocationMarker.prototype.hasMarker = function(map_id)
{
  return !Ext.isEmpty(this.markers[map_id]);
};

Tmo.MyLocationMarker.prototype.renderOnMap = function(map_id, success, failure, options) {
    var myLocationMarker = this;
    options = options || {};
    Tmo.geo.load(
        function()
        {
            myLocationMarker.renderMarkerAtPositionOnMap( map_id, Tmo.geo.position, options );
            if (Ext.isFunction(success)) {
                success.call();
            }
        },
        function()
        {
            if (Ext.isFunction(failure)) {
                failure.call();
            }
        }
    );
};

Tmo.MyLocationMarker.aroundMeButton = function(map_id, storeFilter){
    return {
        cls: 'around_me_button pressed-true',
        iconCls: 'locate',
        handler: this._doAroundMe,
        map_id: map_id,
        storeFilter: storeFilter
    };
};

Tmo.MyLocationMarker.aroundMeButtonId = function(){
    return (Ext.query('.around_me_button')[0].id);
};

Tmo.MyLocationMarker.getAroundMeButton = function(){
    return Ext.getCmp(Tmo.MyLocationMarker.aroundMeButtonId());
};

Tmo.MyLocationMarker.aroundMeButtonIsActive = function() {
    var aroundMeButton = Tmo.MyLocationMarker.getAroundMeButton();
    return aroundMeButton.el.hasCls("x-button-active");
};

Tmo.MyLocationMarker.prototype.rebindStore = function (store) {
    var cmp = Tmo.MyLocationMarker.getAroundMeButton();
    if (cmp) {
        cmp.storeFilter = store;
    }
    this.storeFilter = store;
};

Tmo.MyLocationMarker._doAroundMe = function() {
      var storeFilter = this.storeFilter;
      var aroundMeButton = Tmo.MyLocationMarker.getAroundMeButton();
      var activeClass = "x-button-active";
      Tmo.myLocationMarker.renderOnMap(this.map_id, function(){
          if (!aroundMeButton.el.hasCls(activeClass)) {
              aroundMeButton.addCls(activeClass);
              storeFilter.set('lat', Tmo.geo.lat);
              storeFilter.set('lng', Tmo.geo.lng);
          } else {
              aroundMeButton.removeCls(activeClass);
              storeFilter.unregisterProperty('lat');
              storeFilter.unregisterProperty('lng');
          }
          storeFilter.filter();
      });
};

Tmo.myLocationMarker = new Tmo.MyLocationMarker();

/* class to unify MapLoader */
Tmo.mapLoader = {
    plugin: new Ext.ux.touch.MapLoader({
        units: 'km',
        bufferType: 'ratio',
        buffer: 0.15,
        loadInterval: 1000
    })
};

