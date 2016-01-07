'use strict';

jpsPassbookManagerApp.controller('DetailCtrl', function($scope, $rootScope, Api, pass) {
  $scope.pass = pass;
  var db = Api;
  $(document).ready(function() {
    $('.datepicker').datepicker();
    $('.timepicker').timepicker();
    $('.colorpicker').colorpicker();
    $('#pass-qrcode')
      .empty()
      .qrcode({
        width: 200,
        height: 200,
        text: pass.webServiceURL + '/v1/export/' + pass._id
      });
  });

  $scope.loadSchema = function() {
    console.log($scope.pass.type);
    $http.get('/passes/schemas/' + $scope.pass.type + '.json').success(function(data) {
      $scope.pass = data;

      console.log('loadSchema', $scope.pass.type, data);
    });
  };

  $scope.savePass = function(p) {
    p = p || {};
    console.log('savePass', p);
    if (p._id) {
      db.put(p).then(function(data) {
        console.log('response', data);
        if (data) {
          $scope.SmartPass.pass = null;
          $scope.SmartPass.getPasses();
          $scope.SmartPass.clearPass();
        }
      }).catch(function(err) {
        console.error('savePass', err);
      });
    } else {
      db.post(p).then(function(data) {
        if (data) {
          $scope.SmartPass.pass = data;
          $scope.SmartPass.getPasses();
        }
        console.log('createPass', data);
      });
    }
  };
});
