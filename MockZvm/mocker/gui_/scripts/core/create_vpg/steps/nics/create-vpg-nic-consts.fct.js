'use strict';

angular.module('zvmApp.core')
    .factory('createVpgNicConstants', function ($translate) {
        return {
            IP_CFG_VALUES: {
                DHCP: '0',
                STATIC: '1',
                NO: '2'
            },
            GRID: {
                IDS: {
                    VC: 'create-vpg-nics',
                    VCvVCD: 'create-vpg-nics-vc-to-vcd',
                    VCDvVCD: 'create-vpg-nics-vcd-to-vcd'
                },
                VIEW_BY_VALUES: [
                    {
                        id: 'Failover/Move',
                        text: 'Failover/Move'
                    },
                    {
                        id: 'Test',
                        text: 'Test'
                    }
                ],
                GROUP_BY_VALUES: [
                    {
                        id: '',
                        text: $translate.instant('GROUP_BY_LIST.NONE')
                    },
                    {
                        id: 'vmName',
                        text: $translate.instant('GROUP_BY_LIST.VM_NAME')
                    }]
            },
            EDITOR_CLASSES: {
                NETWORK: {
                    VC: 'nic-network-inline-dropdown',
                    VCD: 'nic-network-inline-dropdown'
                },
                MAC: 'nic-network-inline-dropdown'

            },
            EDITOR_SETTINGS: {
                FAILOVER_SETTINGS: 'FailoverSettings',
                TEST_SETTINGS: 'TestSettings'
            },
            COLUMNS: {
                VM_NAME: 'vmName',
                FAILOVER_NETWORK: 'FailoverNetwork',
                TEST_NETWORK: 'TestNetwork',
                FAILOVER_IP: 'FailoverIp',
                TEST_IP: 'TestIP',
                VC: {
                    NIC_NAME: 'nicName',
                    PROTECTED_NETWORK: 'ProtectedNetwork'
                },
                VCD: {
                    INDEX: 'index',
                    FAILOVER_CONNECTED: 'FailoverConnected',
                    TEST_CONNECTED: 'TestConnected',
                    FAILOVER_PRIMARY: 'FailoverPrimary',
                    TEST_PRIMARY: 'TestPrimary',
                    FAILOVER_MAC: 'FailoverMac',
                    TEST_MAC: 'TestMac'
                }
            }
        };
    });

