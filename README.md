
  let cities = {
  name: "Beaverhead",
  ind: "001"
}

let row = {
  key: "001002S010W",
  wheat: {
    basic: "11.20",
    dxs5: "10.90",
    dda: "10.10",
    dxs10: "9.90",
    dd20: "7.60",
    xs20ip: "7.5",
    Eightymin: "5.99"
  },
  barley: {
    basic: "14.60",
    dxs5: "14.20",
    dda: "13.30",
    dxs10: "13.00",
    dd20: "10.40",
    xs20ip: "10.10",
    Eightymin: "7.00"
  }
}

// console.log(row);


// B7 = key;
// H7 = wheat.basic
// I7 = wheat.dxs5
// J7 = wheat.dda
// K7 = wheat.dxs10
// L7 = wheat.dd20
// M7 = wheat.xs20ip
// N7 = wheat.eighty
//
// P7 = wheat.basic
// Q7 = wheat.dxs5
// R7 = wheat.dda
// S7 = wheat.dxs10
// T7 = wheat.dd20
// V7 = wheat.eighty
// U7 = wheat.xs20ip
//
// First: 7
// Last: 3738

var XLSX = require('xlsx');
// var baseFile = require('./basic.xlsx');
// console.log(XLSX.readFile(baseFile));
import basicRates from './basic.xlsx';
// console.log(basicRates);
// const basicWorkbook = XLSX.readFile(basicRates);

// const basicRateSheet = basicWorkbook.SheetNames[0];
// const testCell = basicRateSheet['A7'];
//
// console.log(testCell);

const workbook = XLSX.read(basicRates, {type: 'binary'});

console.log(workbook);

// function handleFile(e) {
//   var files = basicRates;
//   var i,f;
//   for (i = 0; i != files.length; ++i) {
//     f = files[i];
//     var reader = new FileReader();
//     var name = f.name;
//     reader.onload = function(e) {
//       var data = e.target.result;
//
//       var workbook;
//       if(rABS) {
//         /* if binary string, read with type 'binary' */
//         workbook = XLSX.read(data, {type: 'binary'});
//       } else {
//         /* if array buffer, convert to base64 */
//         var arr = fixdata(data);
//         workbook = XLSX.read(btoa(arr), {type: 'base64'});
//       }
//
//       /* DO SOMETHING WITH workbook HERE */
//     };
//     reader.readAsBinaryString(f);
//   }
// }
// input_dom_element.addEventListener('change', handleFile, false);
