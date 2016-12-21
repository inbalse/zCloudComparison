module.exports = function GetPortalInitialSitesInfoForVpgCreation() {
    return {
        'LocalVCDVapps': [{
            'Vapp': {
                'DisplayName': 'vcd-vApp-zeto-org-2-vms',
                'VcdVappIdentifier': {
                    'Id': '00000000-0000-0000-0000-000000000000',
                    'VCDId': 'urn:vcloud:vapp:547e82c3-d5e2-4f6c-8a4d-10e48466db76'
                },
                'ProtectedVCDVappVpgsInfo': {'KnownProtectedVCDVappVpgsInfo': [], 'TotalNumberOfVpgs': 0}
            }, 'OwningVirtualDataCenterName': 'zerto-vdc', 'ProvisionedSizeInMB': 0.427734375
        }, {
            'Vapp': {
                'DisplayName': 'vApp_system_3_vms',
                'VcdVappIdentifier': {
                    'Id': '00000000-0000-0000-0000-000000000000',
                    'VCDId': 'urn:vcloud:vapp:258a671d-a31b-4729-a3e0-b8bebd55cee5'
                },
                'ProtectedVCDVappVpgsInfo': {'KnownProtectedVCDVappVpgsInfo': [], 'TotalNumberOfVpgs': 0}
            }, 'OwningVirtualDataCenterName': 'OrgVDC', 'ProvisionedSizeInMB': 0.333984375
        }, {
            'Vapp': {
                'DisplayName': 'vcd-vApp_2_vms',
                'VcdVappIdentifier': {
                    'Id': '00000000-0000-0000-0000-000000000000',
                    'VCDId': 'urn:vcloud:vapp:6bb89e98-e6e8-4b9d-8216-a82ee6588519'
                },
                'ProtectedVCDVappVpgsInfo': {'KnownProtectedVCDVappVpgsInfo': [], 'TotalNumberOfVpgs': 0}
            }, 'OwningVirtualDataCenterName': 'OrgVDC', 'ProvisionedSizeInMB': 0.427734375
        }, {
            'Vapp': {
                'DisplayName': 'vcd-vApp-1-vm',
                'VcdVappIdentifier': {
                    'Id': '00000000-0000-0000-0000-000000000000',
                    'VCDId': 'urn:vcloud:vapp:f990fcf3-7877-44e0-ab36-222796066732'
                },
                'ProtectedVCDVappVpgsInfo': {'KnownProtectedVCDVappVpgsInfo': [], 'TotalNumberOfVpgs': 0}
            }, 'OwningVirtualDataCenterName': 'OrgVDC', 'ProvisionedSizeInMB': 4.248046875
        }],
        "LocalVCVms": [{
            "DisplayName": "SD02 (2fe91d4b-e0a3-443d-89f9-5132002d47b6)",
            "Id": {
                "InternalVmName": "vm-3276",
                "ServerIdentifier": {"ServerGuid": "cda0a2d8-8a4d-41c9-860c-493cfa19c544"}
            },
            "SizeInMb": 0
        }, {
            "DisplayName": "Z1 (5649e64d-5d33-42e0-adc3-6e3eb139326f)",
            "Id": {
                "InternalVmName": "vm-3254",
                "ServerIdentifier": {"ServerGuid": "cda0a2d8-8a4d-41c9-860c-493cfa19c544"}
            },
            "SizeInMb": 0
        }, {
            "DisplayName": "sd13",
            "Id": {
                "InternalVmName": "vm-3418",
                "ServerIdentifier": {"ServerGuid": "cda0a2d8-8a4d-41c9-860c-493cfa19c544"}
            },
            "SizeInMb": 1645
        }, {
            "DisplayName": "winVM (55d94741-8dc8-4fa0-b88c-77ffc67ac824)",
            "Id": {
                "InternalVmName": "vm-3746",
                "ServerIdentifier": {"ServerGuid": "cda0a2d8-8a4d-41c9-860c-493cfa19c544"}
            },
            "SizeInMb": 11594
        }, {
            "DisplayName": "Win2008R2Base",
            "Id": {
                "InternalVmName": "vm-3501",
                "ServerIdentifier": {"ServerGuid": "cda0a2d8-8a4d-41c9-860c-493cfa19c544"}
            },
            "SizeInMb": 11423
        }, {
            "DisplayName": "Ziva1 (cd3e4be6-5beb-4aa8-acba-011f8fb9f3f0)",
            "Id": {
                "InternalVmName": "vm-3176",
                "ServerIdentifier": {"ServerGuid": "cda0a2d8-8a4d-41c9-860c-493cfa19c544"}
            },
            "SizeInMb": 0
        }, {
            "DisplayName": "SDVApp (70c783ff-97c0-40ea-b688-5a7b4ac42ff2)",
            "Id": {
                "InternalVmName": "vm-3748",
                "ServerIdentifier": {"ServerGuid": "cda0a2d8-8a4d-41c9-860c-493cfa19c544"}
            },
            "SizeInMb": 1544
        }],
        'TargetSites': [{
            'OwnersId': {
                'Id': {'OwnersGuid': 'ef570834-c183-47f0-a569-3f11a3fbbc6f'},
                'DisplayName': 'gui_local_vcd at Zerto (Local)',
                'IsLocal': true
            },
            'SiteId': {'SiteGuid': 'afa3c22f-2599-4b9d-aba9-3b8b539c78ae'},
            'IsConnected': true,
            'IsVCDEnabled': true,
            'VirtualizationProviderType': 0,
            'IsCustomerSite': false
        }]
    };
};
