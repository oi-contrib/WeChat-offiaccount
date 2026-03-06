module.exports = function () {

    let infomation = {
        IPv4: [],
        IPv6: []
    };

    let networks = require('os').networkInterfaces()
    for (let typeName in networks) {
        let network = networks[typeName]
        for (let index = 0; index < network.length; index++) {
            if (network[index].family == 'IPv4' && network[index].address != '127.0.0.1') {
                infomation.IPv4.push({
                    address: network[index].address,
                    mac: network[index].mac
                });
            } else if (network[index].family == 'IPv6' && network[index].address != '::1') {
                infomation.IPv6.push({
                    address: network[index].address,
                    mac: network[index].mac
                });
            }
        }
    }

    return infomation;
};