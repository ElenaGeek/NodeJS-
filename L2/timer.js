const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

const [time1, time2] = process.argv.slice(2);
console.log(time1, time2);

var h1 = time1.slice(0,2);
var d1 = time1.slice(3,5);
var m1 = time1.slice(6,8);
var y1 = time1.slice(9);
//console.log(h1, d1, m1, y1);
setInterval(print1, 1000);

var h2 = time2.slice(0,2);
var d2 = time2.slice(3,5);
var m2 = time2.slice(6,8);
var y2 = time2.slice(9);
setInterval(print2, 1000);

//current - Date(year, month, date, hours, minutes, seconds, ms);
//any - new Date(year, month, date, hours, minutes, seconds, ms);

function print1(){
  var curdate = Date();
  var inputdate = new Date(y1, m1, d1, h1);

  var timedif = Date.parse(inputdate) - Date.parse(curdate);
  var timedif = new Date(timedif);

  console.log(timedif.getDate()+" days "+timedif.getHours()+" hours "+timedif.getMinutes()+" minutes "+timedif.getSeconds()+" seconds left");
}
function print2(){
  var curdate = Date();
  var inputdate = new Date(y2, m2, d2, h2);
 
  var timedif = Date.parse(inputdate) - Date.parse(curdate);
  var timedif = new Date(timedif);
  
  console.log(timedif.getDate()+" days "+timedif.getHours()+" hours "+timedif.getMinutes()+" minutes "+timedif.getSeconds()+" seconds left");
}

console.log('---------------------------');




