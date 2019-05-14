//difine global variables
var featureGroup;
var filterSelection;
var customSelection;

//default settings
var activeStyle={
  "background-color": "#11799F",
  "border-radius": "5px"
};

var normalStyle={
  "background-color": "rgba(0,0,0,0.2)",
  "color":"rgba(255, 255, 255, 0.8)",
  "border-radius": "5px"
};

//default page
var defaultPage = function(event) {
  featureGroup = L.geoJson(parsedData, {
    style: {color: "#50EBEC",
            radius: 4,
            fillColor: "#50EBEC",
            weight: 4,
            opacity: 0.4,
            fillOpacity: 0.8},
    onEachFeature:onEachFeature,
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng);
    }
  }).addTo(map);
  map.setView([41.0131,-77.6184],8);
};

var defaultBoundary = function(event) {
  var boundaryStyle = {
    color:"white",
    opacity:0.4,
    weight:1,
    fillOpacity:0,
    dashArray: '5',
  };
  featureGroup = L.geoJson(boundary, {
    style: boundaryStyle,
  }).addTo(map);
};


//start page
$('#start').click(function(){
  $('.bg').animate({
      opacity: 'hide', // animate fadeOut
      right: '200px',  // slide left
    }, 'slow', 'linear', function() {
      $(this).remove();
      // Show navigation sidebar and map
      $(".navsidebar").fadeIn();
      $("#map").fadeIn();
      // Crucial step to make sure the map load correcly
      map.invalidateSize();
    });
});

//Navigation bar
$('#maps').click(function(e){
  reset();
  $('.intsidebar').fadeIn();
  $('#maps-page').fadeIn();
  $('#info-page').hide();
  $('#filter-page').hide();
  $('#route-page').hide();
  $('#filter-choice1').css(normalStyle);
  $('#filter-choice2').css(normalStyle);
  removeLine();
});

$('#info').click(function(e){
  reset();
  $('.intsidebar').fadeIn();
  $('#info-page').fadeIn();
  $('#maps-page').hide();
  $('#filter-page').hide();
  $('#route-page').hide();
  $('#filter-choice1').css(normalStyle);
  $('#filter-choice2').css(normalStyle);
  removeLine();
});

$('#filter').click(function(e){
  reset();
  $('.intsidebar').fadeIn();
  $('#filter-page').fadeIn();
  $('#maps-page').hide();
  $('#info-page').hide();
  $('#route-page').hide();
  $('#filter-choice1').css(normalStyle);
  $('#filter-choice2').css(normalStyle);
  removeLine();
});

//two search choices
$('#filter-choice1').click(function(e){
  $('#filter-expand1').fadeIn();
  $('#filter-expand2').hide();
  $('#filter-custom1').hide();
  $('#filter-custom2').hide();
  $('#generateButton-filter').hide();
  $('#filter-choice1').css(activeStyle);
  $('#filter-choice2').css(normalStyle);
});

$('#filter-choice2').click(function(e){
  $('#filter-expand1').hide();
  $('#filter-expand2').fadeIn();
  $('#filter-custom1').hide();
  $('#filter-custom2').hide();
  $('#generateButton-filter').hide();
  $('#filter-choice1').css(normalStyle);
  $('#filter-choice2').css(activeStyle);
});

$('#filter-choice1-custom').click(function() {
    $('#filter-custom2').hide();
    $('#filter-custom1').fadeToggle();
    $('#generateButton-filter').fadeToggle();
});

$('#filter-choice2-custom').click(function() {
    $('#filter-custom1').hide();
    $('#filter-custom2').fadeToggle();
    $('#generateButton-filter').fadeToggle();
});

$('#filter-choice1-above').click(function() {
    $('#filter-custom1').hide();
    $('#filter-custom2').hide();
    $('#generateButton-filter').hide();
});

$('#filter-choice1-below').click(function() {
    $('#filter-custom1').hide();
    $('#filter-custom2').hide();
    $('#generateButton-filter').hide();
});

$('#filter-choice2-above').click(function() {
    $('#filter-custom1').hide();
    $('#filter-custom2').hide();
    $('#generateButton-filter').hide();
});

$('#filter-choice2-below').click(function() {
    $('#filter-custom1').hide();
    $('#filter-custom2').hide();
    $('#generateButton-filter').hide();
});


//close sidebar
$('#hideit1').on('mouseover',function(e){
  $('#hideit1').css("color","white");
});
$('#hideit1').on('mouseout',function(e){
  $('#hideit1').css("color","#B33951");
});
$('#hideit1').click(function(e){
  $('.intsidebar').fadeOut();
});

$('#hideit2').on('mouseover',function(e){
  $('#hideit2').css("color","white");
});
$('#hideit2').on('mouseout',function(e){
  $('#hideit2').css("color","#B33951");
});
$('#hideit2').click(function(e){
  $('.intsidebar').fadeOut();
});

$('#hideit3').on('mouseover',function(e){
  $('#hideit3').css("color","white");
});
$('#hideit3').on('mouseout',function(e){
  $('#hideit3').css("color","#B33951");
});
$('#hideit3').click(function(e){
  $('.intsidebar').fadeOut();
  $('#filter-choice1').css(normalStyle);
  $('#filter-choice2').css(normalStyle);
});


// Default interacive feature
var highlightFeature = function(feature) {
    var layer = feature.target;
    layer.setStyle({radius: 12,
                    color: "white",
                    opacity: 0.5,
                    fillColor: "white",
                    fillOpacity: 0.8,
    });
    bindtext = "<dt>" + "Store ID: " + layer.feature.properties.LOCNUM + "</dt>" +
              "<dt>" + "Store Name: " + layer.feature.properties.CONAME + "</dt>" +
               "<dt>" + "Address: " + layer.feature.properties.ADDR + "</dt>" ;
    layer.bindTooltip(bindtext,{opacity: 0.7, offset:[-10,0], direction:'left'}).openTooltip();
};

var resetHighlight = function(feature) {
    featureGroup.resetStyle(feature.target);
};

var clickEachFeature = function(feature) {
    $('#maps-page').hide();
    $('#filter-page').hide();
    $('#route-page').hide();
    $('.intsidebar').fadeIn();
    $('#info-page').fadeIn();
    var layer = feature.target;
    fillInfo(layer);
};

var onEachFeature = function(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: clickEachFeature,
    });
};

var fillInfo = function(layer) {
  $('#store_id').val("Store Name: " + layer.feature.properties.CONAME);
  $('#county').val("County: " + layer.feature.properties.COUNTY_NAM)
  $('#address').val("Address: " + layer.feature.properties.ADDR);
  $('#zipcode').val("Zipcode: " + layer.feature.properties.ZIP);
  $('#salesvol').val("Sales Volume: " + layer.feature.properties.SALES_VOL);
  $('#employees').val("# of Employees: " + layer.feature.properties.NUMBER_EMP);
  $('#bstatus').val("Business Status: " + layer.feature.properties.HDBRCH);
  $('#sq').val("Square Footage: " + layer.feature.properties.SQFT);

  $('#population').val("Population: " + layer.feature.properties.POP);
  $('#households').val("Households: " + layer.feature.properties.HHs);
  $('#income').val("Median Income ($): " + layer.feature.properties.Med_Inc);
  $('#housevalue').val("Median House Value ($): " + layer.feature.properties.Med_Value);

  $('#dhighway').val("Highway: " + layer.feature.properties.distHwy);
  $('#dshop').val("Other Coffee Shops: " + layer.feature.properties.CoffeeDist);
  $('#demploy').val("Employment Center: " + layer.feature.properties.distEmpC);
};


var reset = function() {
  removeMarker();
  defaultPage();
  $('.info1').hide();
  $('.legend1').hide();
  $('.info2').hide();
  $('.legend2').hide();
};

$('#hideit1').click(function(e){
  reset();
});
$('#hideit2').click(function(e){
  reset();
});
$('#hideit3').click(function(e){
  reset();
});
$('#hideit4').click(function(e){
  reset();
});



// Remove markers
var removeMarker = function(){
  if (typeof featureGroup !== 'undefined') {
    map.removeLayer(featureGroup);
  }
};

//maps
//business Status
var getColor1 = function(data) {
    return data =="B"  ? '#238A8D' :
                      '#481567';
};

var getRadius1 = function(data) {
    return data == "B"  ? 6 :
                      3;
};

var getStyle1 = function(feature) {
    return {color: "white",
            weight: 0,
            radius: getRadius1(feature.properties.SQFT),
            fillColor: getColor1(feature.properties.SQFT),
            opacity: 0.5,
            fillOpacity: 1,
    };
};

// Interactive feature
var highlightFeature1 = function(e) {
    var layer = e.target;
    layer.setStyle({radius: 14,
                    fillColor: "white",
                    fillOpacity: 1,
    });
    info1.update(layer.feature.properties);
};

var resetHighlight1 = function(e) {
    featureGroup.resetStyle(e.target);
    info1.update();
};

var onEachFeature1 = function(feature, layer) {
    layer.on({
        mouseover: highlightFeature1,
        mouseout: resetHighlight1,
    });
};

var info1 = L.control();

info1.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info1'); // create a div with a class "info"
    this.update();
    return this._div;
};
// method that we will use to update the control based on feature properties passed
info1.update = function (props) {
    this._div.innerHTML = '<h4>Square Footage</h4>' +  (props ?
        '<strong>' + props.SQFT + '</strong>'
        : 'Hover over a store');
};

// Legend
var legend1 = L.control({position: 'bottomright'});

legend1.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info1 legend1'),
        grades = ["","A","B"],
        labels = [];
    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor1(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }
    return div;
};


//map
var map1 = function(event) {
  map.setView([41.0131,-77.6184],8);

  featureGroup = L.geoJson(parsedData, {
    style: getStyle1,
    onEachFeature:onEachFeature1,
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng).bindPopup(feature.properties.ADDR);
    }
  }).addTo(map);
  info1.addTo(map);
  legend1.addTo(map);
};

$('#mapsChoice1').click(function(e){
  removeMarker();
  $('.info2').hide();
  $('.legend2').hide();
  map1();
});

// Map 2: Number of Employees
var getColor2 = function(d) {
    return d > 14  ? '#FCF8B6' :
           d > 10  ? '#FF9864' :
           d > 7  ?  '#E74E62' :
           d > 5  ?  '#771B83' :
           d > 2  ?  '#34086B' :
                     '#150C3A';
};

var getRadius2 = function(d) {
    return d > 14  ? 12 :
           d > 10  ? 10 :
           d > 7   ? 8 :
           d > 5   ? 6 :
           d > 2   ? 4 :
                     3;
};

var getStyle2 = function(feature) {
    return {color: "white",
            weight: 0,
            radius: getRadius2(feature.properties.NUMBER_EMP),
            fillColor: getColor2(feature.properties.NUMBER_EMP),
            opacity: 0.5,
            fillOpacity: 1,
    };
};

// Interactive feature
var highlightFeature2 = function(e) {
    var layer = e.target;
    layer.setStyle({radius: 14,
                    fillColor: "white",
                    fillOpacity: 1,
    });
    info2.update(layer.feature.properties);
};

var resetHighlight2 = function(e) {
    featureGroup.resetStyle(e.target);
    info2.update();
};

var onEachFeature2 = function(feature, layer) {
    layer.on({
        mouseover: highlightFeature2,
        mouseout: resetHighlight2,
    });
};

var info2 = L.control();

info2.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info2'); // create a div with a class "info"
    this.update();
    return this._div;
};
// method that we will use to update the control based on feature properties passed
info2.update = function (props) {
    this._div.innerHTML = '<h4># of Employees</h4>' +  (props ?
        '<strong>' + props.NUMBER_EMP + '</strong>'
        : 'Hover over a store');
};

// Legend
var legend2 = L.control({position: 'bottomright'});

legend2.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info2 legend2'),
        grades = [0, 2, 5, 7, 10, 14],
        labels = [];
    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor2(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }
    return div;
};

var map2 = function(event) {
  map.setView([41.0131,-77.6184],8);

  featureGroup = L.geoJson(parsedData, {
    style: getStyle2,
    onEachFeature:onEachFeature2,
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng).bindPopup(feature.properties.ADDR);
    }
  }).addTo(map);
  info2.addTo(map);
  legend2.addTo(map);
};

$('#mapsChoice2').click(function(e){
  removeMarker();
  $('.info1').hide();
  $('.legend1').hide();
  map2();
});

//Search by criterion

var filterStyle = function(feature) {
  if (filterSelection === 1){
    if(feature.properties.SALES_VOL >= 522) {
      return {color:"#FCE205", fillColor:"#FCE205",
      radius: getRadius1(feature.properties.SALES_VOL)}; }}
  else if (filterSelection === 2){
    if(feature.properties.SALES_VOL < 522) {
      return {color:"#FCF4A3", fillColor:"#FCF4A3",
      radius: getRadius1(feature.properties.SALES_VOL)}; }}
  else if (filterSelection === 3){
    if(feature.properties.NUMBER_EMP >= 9) {
      return {color:"#FF0090", fillColor:"#FF0090",
      radius: getRadius2(feature.properties.NUMBER_EMP)}; }}
  else if (filterSelection === 4){
    if(feature.properties.NUMBER_EMP < 9) {
      return {color:"#FCA3B7", fillColor:"#FCA3B7",
      radius: getRadius2(feature.properties.NUMBER_EMP)}; }}
};

var myFilter = function(feature){
  if (filterSelection === 1){
    if(feature.properties.SALES_VOL >= 522) {
      return true; }}
  else if (filterSelection === 2){
    if(feature.properties.SALES_VOL < 522) {
      return true; }}
  else if (filterSelection === 3){
    if(feature.properties.NUMBER_EMP >= 9) {
      return true; }}
  else if (filterSelection === 4){
    if(feature.properties.NUMBER_EMP < 9) {
      return true; }}
};

var highlightFeature3 = function(feature) {
    var layer = feature.target;
    layer.setStyle({radius: 14,
                    color: "white",
                    opacity: 0.5,
                    fillColor: "white",
                    fillOpacity: 0.8,
    });
    if (filterSelection === 1 || filterSelection === 2 || customSelection === 1) {
      bindtext = "<dt>" + "Store ID: " + layer.feature.properties.LOCNUM + "</dt>" +
                 "<dt>" + "Address: " + layer.feature.properties.ADDR + "</dt>" +
                 "<dt>" + "Sales Volume: " + layer.feature.properties.SALES_VOL + "</dt>";
    }else if (filterSelection === 3 || filterSelection === 4 || customSelection === 2) {
      bindtext = "<dt>" + "Store ID: " + layer.feature.properties.LOCNUM + "</dt>" +
                 "<dt>" + "Address: " + layer.feature.properties.ADDR + "</dt>" +
                 "<dt>" + "# of Employees: " + layer.feature.properties.NUMBER_EMP + "</dt>";
    }
    layer.bindTooltip(bindtext,
    {opacity: 0.7, offset:[-10,0], direction:'left'}).openTooltip();
};

var resetHighlight3 = function(feature) {
    featureGroup.resetStyle(feature.target);
};

var onEachFeature3 = function(feature, layer) {
    layer.on({
        mouseover: highlightFeature3,
        mouseout: resetHighlight3,
    });
};

var filteredMap = function(event) {
  removeMarker();
  featureGroup = L.geoJson(parsedData, {
    style: filterStyle,
    onEachFeature:onEachFeature3,
    filter: myFilter,
    pointToLayer: function (feature, latlng) { return L.circleMarker(latlng,{weight: 4,opacity: 0.4,fillOpacity: 0.8});}
  }).addTo(map);
  map.setView([41.0131,-77.6184],8);
};

$('#filter-choice1-above').click(function(e){
  filterSelection = 1;
  customSelection = 1;
  removeFilterInput();
  filteredMap();
});

$('#filter-choice1-below').click(function(e){
  filterSelection = 2;
  customSelection = 1;
  removeFilterInput();
  filteredMap();
});

$('#filter-choice2-above').click(function(e){
  filterSelection = 3;
  customSelection = 2;
  removeFilterInput();
  filteredMap();
});

$('#filter-choice2-below').click(function(e){
  filterSelection = 4;
  customSelection = 2;
  removeFilterInput();
  filteredMap();
});

// Customized filter option
$('#filter-choice1-custom').click(function(e){
  customSelection = 1;
  filterSelection = 1;
});
$('#filter-choice2-custom').click(function(e){
  customSelection = 2;
  filterSelection = 3;
});

$('#search-go').click(function(e){
  // Set view
  map.setView([41.0131,-77.6184],8);
  // Get user input
  var min;
  var max;
  if(customSelection === 1){
    min = $('#low_salesvol').val();
    max = $('#high_salesovol').val();
  }else if(customSelection === 2){
    min = $('#low_emp').val();
    max = $('#high_emp').val();
  }
  // Remove current marker
  removeMarker();
  // Filter
  var customFilter = function(feature){
    if (customSelection === 1){
      if(feature.properties.SALES_VOL>=min & feature.properties.SALES_VOL<=max ){
        return true;
      }}
    else if (customSelection === 2){
      if(feature.properties.NUMBER_EMP>=min & feature.properties.NUMBER_EMP<=max ){
        return true;
      }}
  };
  var customStyle = function(feature) {
    if (customSelection === 1){
      return {radius: getRadius1(feature.properties.SALES_VOL)}; }
    else if (customSelection === 2){
      return {radius: getRadius2(feature.properties.NUMBER_EMP)}; }
  };
  // Plot new map
  featureGroup = L.geoJson(parsedData, {
    style: customStyle,
    onEachFeature:onEachFeature3,
    filter: customFilter,
    pointToLayer: function (feature, latlng) { return L.circleMarker(latlng,{color:"#7FFF00",fillColor:"#7FFF00",weight: 4,opacity: 0.4,fillOpacity: 0.8});}
  }).addTo(map);
});

var removeFilterInput = function(){
  if(customSelection === 1){
    $('#low_salesvol').val("");
    $('#high_salesovol').val("");
  }else if(customSelection === 2){
    $('#low_emp').val("");
    $('#high_emp').val("");
  }
};

$('#search-clear').click(function(e){
  removeFilterInput();
  removeMarker();
});
