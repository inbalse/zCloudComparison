'use strict';

angular.module('zvmApp.services')
    .factory('zSaveAs', function ($http, $window, $sce, busyOverlayService) {
        var zSaveAs = {};
        
        zSaveAs.post = function (url, data) {
            busyOverlayService.addOperation('zSaveAs');
            $http({
                url: url,
                method: 'POST',
                data: data,
                headers: {
                    'Content-type': 'application/json'
                },
                responseType: 'arraybuffer'
            }).success(function (data, status, headers) {
                var fName = headers('Content-Disposition');
                fName = fName.substring(fName.lastIndexOf('=') + 1, fName.length);
                var blob = new Blob([data], {type: headers('Content-Type')});
                saveAs(blob, fName);
            }).finally(function () {
                busyOverlayService.removeOperation('zSaveAs');
            });
        };

        zSaveAs.file = function (data, fileName, format) {
            var blob;
            switch (format) {
                case 'csv':
                    blob = new Blob([zSaveAs._bin2String(data)], {type: 'application/' + format});
                    saveAs(blob, fileName + '.' + format);
                    break;
                case 'zip':
                    blob = new Blob([data], {type: 'application/' + format});
                    $window.open(URL.createObjectURL(blob));
                    break;
                case 'pdf':
                    blob = new Blob([data], {type: 'application/' + format});
                    var file = $sce.trustAsUrl(URL.createObjectURL(blob));
                    $window.open(file);
                    break;
            }
        };

        zSaveAs._bin2String = function (array) {
            return String.fromCharCode.apply(String, array);
        };

        zSaveAs.download = function (downloadFileName, httpPath) {
            $('#downloadFrame').remove();
            $('body').append('<iframe id="downloadFrame" src="' + httpPath + '"/>');
        };

        return {self: zSaveAs, post: zSaveAs.post, file: zSaveAs.file, download: zSaveAs.download};
    });

