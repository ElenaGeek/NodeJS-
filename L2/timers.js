const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

evtimer = [];
h =[];
d =[];
m =[];
y =[];
var evtimer= process.argv.slice(2);

for(let i = 0; i < evtimer.length; i++ ){
    console.log(evtimer[i]);
}

console.log('-------------');

for(let i = 0; i < evtimer.length; i++ ){
  h[i] = evtimer[i].slice(0,2);
  d[i] = evtimer[i].slice(3,5);
  m[i] = evtimer[i].slice(6,8);
  y[i] = evtimer[i].slice(9);
  setInterval(print, 1000, h[i], d[i], m[i], y[i]);
}

//current - Date(year, month, date, hours, minutes, seconds, ms);
//any - new Date(year, month, date, hours, minutes, seconds, ms);

function print(h, d, m, y){
  var curdate = Date();
  var inputdate = new Date(y, m, d, h);

  var timedif = Date.parse(inputdate) - Date.parse(curdate);
  var timedif = new Date(timedif);

  console.log(timedif.getDate()+" days "+timedif.getHours()+" hours "+timedif.getMinutes()+" minutes "+timedif.getSeconds()+" seconds left");
}

clearInterval(print);
//Promise.resolve().then(() => console.log('This is finished'));

