var util = require('util');
var os = require('os');
var exec = require('child_process').exec;

var bleno = require('bleno');

var Descriptor = bleno.Descriptor;
var Characteristic = bleno.Characteristic;

var ReadLevelCharacteristic = function() {
  ReadLevelCharacteristic.super_.call(this, {
    uuid: '26e2b12b-85f0-4f3f-9fdd-91d114270e6e',
    properties: ['read'],
    descriptors: [
      new Descriptor({
        uuid: '2901',
        value: 'random data'
      })
    ],
    value: '0'
  });
  this._value = new Buffer(0);
};

util.inherits(ReadLevelCharacteristic, Characteristic);

ReadLevelCharacteristic.prototype.onReadRequest = function(offset, callback) {
  if (os.platform() === 'darwin') {
    exec('pmset -g batt', function (error, stdout, stderr) {
      var data = stdout.toString();
      // data - 'Now drawing from \'Battery Power\'\n -InternalBattery-0\t95%; discharging; 4:11 remaining\n'
      var percent = data.split('\t')[1].split(';')[0];
      console.log(percent + "YA");
      percent = parseInt(percent, 10);
      callback(this.RESULT_SUCCESS, new Buffer([percent]));
    });
  } else {
    // return hardcoded value
    console.log('ThingReadCharacteristic - onReadRequest: value =' + this._value.toString('hex'));
    callback(this.RESULT_SUCCESS, this._value);
  }
};

module.exports = ReadLevelCharacteristic;
