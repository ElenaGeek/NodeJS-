//import EventEmitter from "events";
var events = require('events');
const EventEmitter = require("events");
var eventEmitter = new events.EventEmitter();
class MyEmitter extends EventEmitter {}

const moment = require('moment');
moment().format('yyyy-mm-dd:hh:mm:ss');

var md = Date.parse('2022-01-26T13:51:50.417-07:00');
console.log(md);

var end = Date.now() + 5000
while (Date.now() < end) ;
  console.log(Date.now().toString());
  console.log(new Date().toISOString());

const helloWorld = () => console.log('Hello World!');
setTimeout(helloWorld, 1000);

//Create an event handler:
var myEventHandler = function () {
  console.log('I hear a scream!');
}

//Assign the event handler to an event:
eventEmitter.on('scream', myEventHandler);

//Fire the 'scream' event:
eventEmitter.emit('scream');


const myEmitter = new MyEmitter();
let my = 0;
myEmitter.on('event', () => {
  console.log(++my);
});
myEmitter.emit('event');
// Prints: 1
myEmitter.emit('event');
// Prints: 2
