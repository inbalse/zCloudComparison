'use strict';
describe('Offsite backup vpg List Model', function () {
    var model,data;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function(offsiteVpgsListModel){
        model = offsiteVpgsListModel;
        data = {"VpgBackupJobInfoSummaryVisualObjects":[{"BackupProgress":0,"BackupStatus":1,"JobName":"New VPG","JobSizeInMB":222,"LastFullBackup":"2014-09-10T06:26:04.029Z","LastRunResult":0,"NextScheduledBackup":"2014-09-12T21:00:00.000Z","NonFailingRuns":1,"NumberOfVms":1,"NumberOfVolumes":1,"RepositoryName":"guy","StartTime":"2014-09-10T06:26:04.029Z","StartTimeOfLastRun":"2014-09-10T06:26:04.029Z","TotalRuns":1,"VpgIdentifier":{"GroupGuid":"32d35274-5d95-4eb9-a1f5-3f4a3660ffda"},"VpgProtectedSiteName":"Unconfigured site name","VpgRecoverySiteName":"Unconfigured site name","ZorgName":null,"IsBackupEnabled":true,"IsAbortBackupEnabled":false,"LastBackupSizeInMb":8}]};
    }));

    it("should process the data and make a new properties", function(){
        var result = model.processData(data);
        var item =  result.VpgBackupJobInfoSummaryVisualObjects[0];
        expect(item.LastRunResultText).toEqual('ENUM.BACKUP_LAST_RUN_RESULT.0');
        expect(item.StartTimeOfLastRunText).toEqual('09/10/2014 09:26:04');
        expect(item.NextScheduledBackupText).toEqual('09/13/2014 00:00:00');
        expect(item.RestorePoints).toEqual('1/1');
        expect(item.JobSizeInMBObj.display).toEqual('222.0 MB');
        expect(item.LastJobSizeInMBObj.display).toEqual('8.0 MB');
    });

});
