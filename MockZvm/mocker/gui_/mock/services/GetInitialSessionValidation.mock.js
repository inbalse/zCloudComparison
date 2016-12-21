Mocker.GetInitialSessionValidation = function (sessionIdentifier) {
//            return invoke('GetInitialSessionValidation', [sessionIdentifier]);

    var isSessionValid = sessionIdentifier[0].InternalIdentifier === '52ef6c73-092d-250e-2bcd-21bf5823cdc5';

    var result = {
        IsSessionValid: isSessionValid,
        HasLicence: isSessionValid,
        IsPortal: false,
        VirtualizationProviderType: 0,
        SiteKey: 'hashedLicenseMocked',
        SiteIdentifier: {
            SiteGuid: 'site-identifier'
        }
    };

    //ZSSP -----------------
    // var result = {
    //     'IsSessionValid': true,
    //     'HasLicence': true,
    //     'IsPortal': true,
    //     'VirtualizationProviderType': 0,
    //     'IsCreateSupportTicketEnabled': false
    // };

    return result;
};
