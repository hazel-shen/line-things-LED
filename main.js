/*
NOTE: This example no longer works on OSX starting in 10.10 (Yosemite). Apple has apparently blacklisted the battery uuid.
*/

var bleno = require('bleno');
var LEDService = require('./LED-service');

var primaryService = new LEDService();

bleno.on('stateChange', function(state) {
  console.log('on -> stateChange: ' + state);

  if (state === 'poweredOn') {
    bleno.startAdvertising('LINE Things test', [process.env.serviceUUID]);
  } else {
    bleno.stopAdvertising();
  }
});

bleno.on('advertisingStart', function(error) {
  console.log('on -> advertisingStart: ' + (error ? 'error ' + error : 'success'));

  if (!error) {
    bleno.setServices([primaryService], function(error){
      console.log('setServices: '  + (error ? 'error ' + error : 'success'));
    });
  }
});


bleno.on('accept', function(clientAddress){
	    console.log("Connected to " + clientAddress)
});

bleno.on('disconnect', function(clientAddress){
	    console.log("Disconnected " + clientAddress)
});

