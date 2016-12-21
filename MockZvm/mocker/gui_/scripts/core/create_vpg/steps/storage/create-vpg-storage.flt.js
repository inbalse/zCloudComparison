'use strict';

angular.module('zvmApp.filters')
    .filter('targetAddressFormatter', function (createVPGStorageEvents, dataCollectionFactory) {
        var _template = _.template('<div class="pseudo-editable-cell"><%=text%><a href="#" rel="<%=event%>"></a></div>');

        return function (row, cell, value, columnDef, volume) {

            function getTemplate(text) {
                return _template({text: text, event: createVPGStorageEvents.changeTargetAddress});
            }

            try{
                var volRepDes = volume.InternalVolumeManagementSettings.Settings.VolumeReplicationDestination;

                if (volRepDes.VCDDatastore) {
                    value.display = dataCollectionFactory.REPLICATION_TYPE.VCD_PROFILE.label;
                } else if (volRepDes.ExistingDisk) {
                    value.display = dataCollectionFactory.REPLICATION_TYPE.PRESEED.label;
                } else if (volume.TargetAddress) {
                    value.display = volume.TargetAddress;
                } else {
                    value.display = '&nbsp;';
                }

                return getTemplate(value.display);

            } catch(err) {
                value.display = '&nbsp;';
                return getTemplate(value.display);
            }
        };
    });
