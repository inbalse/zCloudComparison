module.exports = function GetCurrentLicenseScreen() {
    return {
        "Details": {
            "LicenseId": 1,
            "Type": "VM",
            "Limit": {
                "Num": 100
            },
            "SitesUsage": [
                {
                    "SiteName": "gui_local_vcd",
                    "Usage": {
                        "Num": 1
                    }
                },
                {
                    "SiteName": "gui_remote_vcd",
                    "Usage": {
                        "Num": 0
                    }
                }
            ],
            "ExpiryDate": null,
            "VersionForLicense": "2",
            "MaxSites": {
                "Num": 2
            },
            "ShowUsage": true
        },
        "Key": {
            "Key": "ZRH5U7H9EWN65HT5YDNWNCK25DWRGX7RVXU4VPS9FWQQ " //"RK7C698QHM6Y4LHBD3AJJLSYD9QHSFMPKZEVCSJSYQ"
        },
        "IsLicenseUpdateEnabled": true,
        "IsLicenseEnableWork": true
    };
};
