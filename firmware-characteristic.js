var util = require('util');
var os = require('os');
var exec = require('child_process').exec;

var bleno = require('bleno');

var Descriptor = bleno.Descriptor;
var Characteristic = bleno.Characteristic;

var FWLevelCharacteristic = function() {
  FWLevelCharacteristic.super_.call(this, {
    uuid: '8AFA153E611744389299F71FB4892885',
    properties: ['read'],
    descriptors: [
      new Descriptor({
        uuid: '2901',
        value: 'firmware version'
      })
    ],
    value: '0.0.1'
  });
  this._value = new Buffer(0);
};

util.inherits(FWLevelCharacteristic, Characteristic);

FWLevelCharacteristic.prototype.onReadRequest = function(offset, callback) {
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

module.exports = FWLevelCharacteristic;
