var util = require('util');

var bleno = require('bleno');

var BlenoPrimaryService = bleno.PrimaryService;

var ReadCharacteristic = require('./characteristic/read-characteristic');
var WriteCharacteristic = require('./characteristic/write-characteristic');
var NotifyCharacteristic = require('./characteristic/notify-characteristic');

function BatteryService() {
  BatteryService.super_.call(this, {
      uuid: 'e625601e-9e55-4597-a598-76018a0d293d',
      characteristics: [
          new ReadCharacteristic(),
          new WriteCharacteristic(),
          new NotifyCharacteristic(),
      ]
  });
}

util.inherits(BatteryService, BlenoPrimaryService);

module.exports = BatteryService;
