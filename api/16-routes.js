var XLSX = require('xlsx');

//XCEL PARSER STUFF
var basicWorkbook = XLSX.readFile('./data/twenty-16/CRWB.xlsx');
var basicSheet = basicWorkbook.SheetNames[0];
/* Get worksheet */
var basicCells = basicWorkbook.Sheets[basicSheet];
/* Find desired cell */
var cellValue = ( basicCells['B7'] ?  basicCells['B7'].v : undefined);

function makeBasicData(){
  let basicData = [];
  let cityData = [];


  for (var i = 6; i <= 3738; i++) {
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



// DONT CURRENTLY HAVE STATE RATE DATA
// var stateRateWorkBook = XLSX.readFile('./data/twenty-16/stateRates17.xlsx');
// var stateRatesSheet = stateRateWorkBook.SheetNames[0];
// /* Get worksheet */
// var stateRateCells = stateRateWorkBook.Sheets[stateRatesSheet];
// /* Find desired cell */
// var cellValue = ( stateRateCells['A2'] ?  stateRateCells['A2'].v : undefined);
//
// function makeStateRates() {
//   var stateRates = [];
//
//   for (var i = 2; i <= 51; i++) {
//       const obj = {
//         city: ( stateRateCells[`A${i}`] ?  stateRateCells[`A${i}`].v : undefined),
//         rate: ( stateRateCells[`B${i}`] ?  (stateRateCells[`B${i}`].v * 100) : undefined)
//       }
//       stateRates.push(obj);
//     }
//   return stateRates;
// }
//
//

var tophalfWorkbook = XLSX.readFile('./data/twenty-16/topHalf.xls');

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

exports.basic = (req, res) => {
  var data = makeBasicData();
  if(!data){
    res.send("Something is wrong");
  } else {
    res.json(data);
  }
};


exports.basicCityByKey = (req,res) => {
  var data = makeBasicData();
  if(!data){
    res.send("Something is wrong");
  } else {
    var city = data.basicCities.find((item) => {
      return item.key === req.params.key
    });
    res.json(city)
  }
};

exports.basicByKey = (req,res) => {
  var data = makeBasicData();
  var oneData = data.basicInfo.find(function(item){
    return item.key === req.params.key
  });
  if(!oneData){
    var lastData = data.basicInfo.filter(function(item){
      return String(item.key).substring(0,3) === String(req.params.key).substring(0,3)
    });
    res.json(lastData[lastData.length - 1])
  } else {
    res.json(oneData);
  }
};
//
// exports.getState = (req,res) => {
//   var data = makeStateRates();
//   if(!data){
//     res.send("Something is wrong");
//   } else {
//     res.json(data);
//   }
// };

// exports.getCityFromStates = (req,res) => {
//   var data = makeStateRates();
//   if(!data){
//     res.send("Something is wrong");
//   } else {
//   var foundItem = data.find((item) => {
//       return item.city === req.params.city
//     })
//     if(!foundItem) {
//       res.json({msg: "No rate for this city"})
//     }
//     res.json(foundItem);
//   }
// };

exports.getTopHalf = (req,res) => {
  var data = makeTopHalfData();
  if(!data){
    res.send("Something is wrong");
  } else {
    res.json(data);
  }
};
