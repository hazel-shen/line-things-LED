var util = require('util');
var os = require('os');
var exec = require('child_process').exec;
var dataStore = require('./../data-store.js');
var bleno = require('bleno');

var Descriptor = bleno.Descriptor;
var Characteristic = bleno.Characteristic;

var NotifyCharacteristic = function() {
  NotifyCharacteristic.super_.call(this, {
    uuid: '8AFA153E611744389299F71FB4892883',
    properties: ['read','write','notify'],
    descriptors: [
      new Descriptor({
        uuid: '2901',
        value: 'Subscribe'
      }),
    ],
    value: null
  });
  this._value = new Buffer(0);
  this._updateValueCallback = null;
};

util.inherits(NotifyCharacteristic, Characteristic);
NotifyCharacteristic.prototype.onReadRequest = function(offset, callback) {
	  console.log('EchoCharacteristic - onReadRequest: value = ' + this._value.toString('hex'));

	  callback(this.RESULT_SUCCESS, this._value);
};

NotifyCharacteristic.prototype.onWriteRequest = function(data, offset, withoutResponse, callback) {
	  this._value = data;

	  console.log('EchoCharacteristic - onWriteRequest: value = ' + this._value.toString('hex'));

	  if (this._updateValueCallback) {
		      console.log('EchoCharacteristic - onWriteRequest: notifying');

		      this._updateValueCallback(this._value);
		    }

	  callback(this.RESULT_SUCCESS);
};

NotifyCharacteristic.prototype.onSubscribe = function(maxValueSize, updateValueCallback) {
	  var buf = Buffer.alloc(9);
	  for (var i = 0; i < 9; i++){
		      buf[i] = parseInt(dataStore.data[i]);
		    }
	  console.log('NotifyCharacteristic - onSubscribe');
	  console.log('onsubscribe init: ' + dataStore.data);
	  this._updateValueCallback = updateValueCallback;
	  this._updateValueCallback(buf);
};

NotifyCharacteristic.prototype.onUnsubscribe = function() {
	  console.log('NotifyCharacteristic - onUnsubscribe');

	  this._updateValueCallback = null;
};

NotifyCharacteristic.prototype.notify = function(value) {
	  if (this._updateValueCallback){
		   this._updateValueCallback(value);
          }
};

module.exports = NotifyCharacteristic;
