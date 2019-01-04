var util = require('util');

var bleno = require('bleno');

var BlenoPrimaryService = bleno.PrimaryService;

var BatteryCharacteristic = require('./battery-characteristic');
var ReadCharacteristic = require('./read-characteristic');
var WriteCharacteristic = require('./write-characteristic');
var NotifyCharacteristic = require('./notify-characteristic');
var FirmwareCharacteristic = require('./firmware-characteristic');

function BatteryService() {
  BatteryService.super_.call(this, {
      uuid: 'e625601e-9e55-4597-a598-76018a0d293d',
      characteristics: [
          new ReadCharacteristic(),
          new WriteCharacteristic(),
          new NotifyCharacteristic(),
          new BatteryCharacteristic(),
          new FirmwareCharacteristic(),
      ]
  });
}

util.inherits(BatteryService, BlenoPrimaryService);

module.exports = BatteryService;
