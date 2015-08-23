'use strict';

angular.module('components.probe.factory', [
	'components.probe.service'])
.factory('Probe', ['ProbeService', '$q',function (ProbeService, $q) {
	function Probe(data){
		var that = this;
		that.name = '';
		that.type = '';
		that.status = 0;
		that.selected = false;
		_.merge(that, data);

		that.getName = function(){
			return that.name;
		};
		that.setName = function(name){
			that.name = name;
		};
		that.isContact = function(){
			return that.type === 'contact'? true:false;
		};
		that.isContactless = function(){
			return that.type === 'contactless'? true:false;
		};
		that.isAvailable = function(){
			return that.status === 1? true:false;
		};
		that.isPending = function(){
			return that.status === 2? true:false;
		};
		that.isUnavailable = function(){
			return that.status === 0? true:false;
		};
		that.getStatus = function(){
			return that.status;
		};
		that.isSelected = function(){
			return that.selected;
		};

		that.getInfo = function(){
			var deferred = $q.defer();
			ProbeService.get({id: that._id}, function(p){
				_.merge(that, p);
			}, deferred.reject);

			return deferred.promise;
		};

		that.update = function(){
			var deferred = $q.defer();
			ProbeService.update(that, function(p){
				_.merge(that, p);
			}, deferred.reject);

			return deferred.promise;
		};


		that.select = function(){
			var deferred = $q.defer();
			ProbeService.select(data, function(p){
				_.merge(that, p);
			}, deferred.reject);

			return deferred.promise;
		};

		that.unselect = function(){
			var deferred = $q.defer();
			ProbeService.unselect(data, function(p){
				_.merge(that, p);
			}, deferred.reject);

			return deferred.promise;
		};
	}

	Probe.query = function(){
		var deferred = $q.defer();
		ProbeService.query(function(data){
			var ps = [];
			_.forEach(data, function(p) {
				ps.push(new Probe(p));
			});

			deferred.resolve(ps);
		}, deferred.reject);

		return deferred.promise;
	};

	Probe.getContactSelected = function(){
		var deferred = $q.defer();
		ProbeService.getContactSelected(function(data){
			var p = data._id?new Probe(data): null;
			deferred.resolve(p);
		}, deferred.reject);

		return deferred.promise;
	};

	Probe.getContactlessSelected = function(){
		var deferred = $q.defer();
		ProbeService.getContactlessSelected(function(data){
			var p = data._id?new Probe(data): null;
			deferred.resolve(p);
		}, deferred.reject);

		return deferred.promise;
	};

	return Probe;
}]);
