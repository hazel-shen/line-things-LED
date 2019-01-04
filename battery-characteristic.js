var util = require('util');
var os = require('os');
var exec = require('child_process').exec;

var bleno = require('bleno');

var Descriptor = bleno.Descriptor;
var Characteristic = bleno.Characteristic;

var BatteryLevelCharacteristic = function() {
  BatteryLevelCharacteristic.super_.call(this, {
    uuid: '8AFA153E611744389299F71FB4892884',
    properties: ['read'],
    descriptors: [
      new Descriptor({
        uuid: '2901',
        value: 'Battery level between 0 and 100 percent'
      })
    ],
    value: '0'
  });
  this._value = new Buffer(0);
};

util.inherits(BatteryLevelCharacteristic, Characteristic);

BatteryLevelCharacteristic.prototype.onReadRequest = function(offset, callback) {
  if (os.platform() === 'darwin') {
    exec('pmset -g batt', function (error, stdout, stderr) {
      var data = stdout.toString();
      // data - 'Now drawing from \'Battery Power\'\n -InternalBattery-0\t95%; discharging; 4:11 remaining\n'
      var percent = data.split('\t')[1].split(';')[0];
      console.log(percent);
      percent = parseInt(percent, 10);
      callback(this.RESULT_SUCCESS, new Buffer([percent]));
    });
  } else {
    // return hardcoded value
    callback(this.RESULT_SUCCESS, new Buffer([98]));
  }
};

module.exports = BatteryLevelCharacteristic;
