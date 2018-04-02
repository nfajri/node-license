var nodeMachineId = require('node-machine-id'),
    licenseKey = require('licensekey');

module.exports = function ({ company, appVersion, osType, key, prodCode }) {
    var machineId = nodeMachineId.machineIdSync();
    var licenseData  = {
        info: {
            company: company
        },
        prodCode: prodCode + machineId,
        appVersion: appVersion,
        osType: osType
    };

    try {
        var license = licenseKey.validateLicense(licenseData, key);
        return {
            success: true,
            data: {
                machineId,
                prodCode,
                company,
                appVersion,
                osType
            },
            message: 'License valid'
        };
    } catch (err) {
        return {
            success: false,
            data: {
                machineId,
                prodCode,
                company,
                appVersion,
                osType
            },
            message: err
        }
    }
};