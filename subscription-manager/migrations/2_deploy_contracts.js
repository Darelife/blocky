const SubscriptionManager = artifacts.require("SubscriptionManager");

module.exports = function (deployer) {
    deployer.deploy(SubscriptionManager);
};