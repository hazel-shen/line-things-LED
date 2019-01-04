var util = require('util');
var os = require('os');
var exec = require('child_process').exec;

var bleno = require('bleno');
var encoding = require('text-encoding');
var Descriptor = bleno.Descriptor;
var Characteristic = bleno.Characteristic;

var WriteLevelCharacteristic = function() {
  WriteLevelCharacteristic.super_.call(this, {
    uuid: '8AFA153E611744389299F71FB4892882',
    properties: ['write', 'writeWithoutResponse'],
    descriptors: [
      new Descriptor({
        uuid: '2901',
        value: 'data write'
      })
    ],
    value: null
  });
  this._value = new Buffer(0);
  this._updateValueCallback = null;
};

util.inherits(WriteLevelCharacteristic, Characteristic);

WriteLevelCharacteristic.prototype.onWriteRequest = function(data, offset, withoutResponse, callback) {
  this._value = data;
 let deviceName = new encoding.TextDecoder("utf-8").decode(data)
  console.log(deviceName)
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

    if (this._updateValueCallback) {
      console.log('WriteCharacteristic - onWriteRequest: Forwarding through socket'.underline.cyan);
      this._updateValueCallback(this._value);
    }
    // return hardcoded value
    callback(this.RESULT_SUCCESS);
  }
};
WriteLevelCharacteristic.prototype.setWriteCallback = function(cb){
   this._updateValueCallback = cb;
}
module.exports = WriteLevelCharacteristic;
