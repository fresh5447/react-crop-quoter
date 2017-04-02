var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var XLSX = require('xlsx');



if (process.env.NODE_ENV === 'production') {
  console.log('Running in production mode');
  app.use('/static', express.static(__dirname + '/static'));
} else {
  // When not in production, enable hot reloading

  var chokidar = require('chokidar');
  var webpack = require('webpack');
  var webpackConfig = require('./webpack.config.dev');
  var compiler = webpack(webpackConfig);
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }));
  app.use(require('webpack-hot-middleware')(compiler));
}

//XCEL PARSER STUFF
var basicWorkbook = XLSX.readFile('./data/basic.xlsx');
var basicSheet = basicWorkbook.SheetNames[0];
/* Get worksheet */
var basicCells = basicWorkbook.Sheets[basicSheet];
/* Find desired cell */
var cellValue = ( basicCells['B7'] ?  basicCells['B7'].v : undefined);

function makeBasicData(){
  let basicData = [];
  let cityData = [];


  for (var i = 7; i <= 3738; i++) {
    // first check if row is City Header Row

    // check if cty header is not all other or value/ then make city.
    if(basicCells[`E${i}`] &&  basicCells[`E${i}`].v[0] !== "0" && basicCells[`E${i}`].v !== "All Other" ){
      var ctyObj = {
        city: basicCells[`E${i}`].v,
        key: basicCells[`D${i}`].v
      }
      cityData.push(ctyObj);
    }


    if(basicCells[`H${i}`] && basicCells[`H${i}`].v  !== ''){
      let obj = {
        key: ( basicCells[`B${i}`] ?  basicCells[`B${i}`].v : undefined),
        wheat: {
          basic: ( basicCells[`H${i}`] ?  basicCells[`H${i}`].v : undefined),
          dxs5: ( basicCells[`I${i}`] ?  basicCells[`I${i}`].v : undefined),
          dda: ( basicCells[`J${i}`] ?  basicCells[`J${i}`].v : undefined),
          dxs10: ( basicCells[`K${i}`] ?  basicCells[`K${i}`].v : undefined),
          dd20: ( basicCells[`L${i}`] ?  basicCells[`L${i}`].v : undefined),
          xs20ip: ( basicCells[`M${i}`] ?  basicCells[`M${i}`].v : undefined),
          eightyMin: ( basicCells[`N${i}`] ?  basicCells[`N${i}`].v : undefined),
        },
        barley: {
          basic: ( basicCells[`P${i}`] ?  basicCells[`P${i}`].v : undefined),
          dxs5: ( basicCells[`Q${i}`] ?  basicCells[`Q${i}`].v : undefined),
          dda: ( basicCells[`R${i}`] ?  basicCells[`R${i}`].v : undefined),
          dxs10: ( basicCells[`S${i}`] ?  basicCells[`S${i}`].v : undefined),
          dd20: ( basicCells[`T${i}`] ?  basicCells[`T${i}`].v : undefined),
          xs20ip: ( basicCells[`U${i}`] ?  basicCells[`U${i}`].v : undefined),
          eightyMin: ( basicCells[`V${i}`] ?  basicCells[`V${i}`].v : undefined),
        },

      };
      basicData.push(obj);
    }
  }
  return { basicInfo: basicData, basicCities: cityData }
}

var tophalfWorkbook = XLSX.readFile('./data/tophalfRate.xlsx');
var tophalfSheet = tophalfWorkbook.SheetNames[0];
/* Get worksheet */
var tophalfCells = tophalfWorkbook.Sheets[tophalfSheet];
/* Find desired cell */
var topcellValue = ( tophalfCells['A18'] ?  tophalfCells['A18'].v : undefined);

function makeTopHalfData() {
  var topHalfs = [];

  for (var i = 0; i <= 367; i++) {
    //return a cell value or undefined
    var th = tophalfCells[`A${i}`] ?  tophalfCells[`A${i}`].v : undefined;

    // make sure cell values are actual data we care about
    // weed out stuff that is not a number
    if(typeof th === 'number'){
      const obj = {
        baseKey: ( tophalfCells[`A${i}`] ?  tophalfCells[`A${i}`].v : undefined),
        topRate: ( tophalfCells[`G${i}`] ?  tophalfCells[`G${i}`].v : undefined)
      }
      topHalfs.push(obj);
    }

  }
  return topHalfs;
}

app.get('/api/v2/basic', function(req,res){
  var data = makeBasicData();
  if(!data){
    res.send("Something is wrong");
  } else {
    res.json(data);
  }
});

app.get('/api/v2/basic/:key', function(req,res){
  var data = makeBasicData();
  var oneData = data.basicInfo.find(function(item){
    return item.key === req.params.key
  });
  if(!oneData){
    res.send("Somethign is wrong");
  } else {
    res.json(oneData);
  }
});

app.get('/api/v2/tophalf', function(req,res){
  var data = makeTopHalfData();
  if(!data){
    res.send("Something is wrong");
  } else {
    res.json(data);
  }
});

app.use('/img', express.static('img'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

var port = process.env.PORT || 3000;

app.listen(port, function(){
  console.log("🔥🔥🔥🔥\n🔥🔥🔥🔥🔥🔥 fired up 🔥🔥🔥🔥🔥 \n🔥🔥🔥🔥🔥🔥 on " + port + " 🔥🔥🔥\n🔥🔥🔥🔥🔥")
});
