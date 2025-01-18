//SPDX-License-Identifier: MIT

pragma solidity ^0.8.26;

contract SubscriptionManager{

    struct Subscription {
        address subscriber;
        address beneficiary;
        uint256 amount; // Payment amount
        uint256 interval; // Time between payments in seconds
        uint256 nextPayment; // Timestamp of the next payment
        bool active; // Subscription status
    }

    uint256 public subscriptionCount; // Total number of subscriptions
    mapping(uint256 => Subscription) public subscriptions; // Map of subscription IDs to subscriptions

    event SubscriptionCreated(
        uint256 indexed subscriptionId,
        address indexed subscriber,
        address indexed beneficiary,
        uint256 amount,
        uint256 interval
    );

    event SubscriptionCancelled(uint256 indexed subscriptionId);
    event PaymentExecuted(uint256 indexed subscriptionId, uint256 amount);

    /**
     * @dev Create a new subscription.
     * @param _beneficiary Address to receive payments.
     * @param _amount Amount to be paid per interval.
     * @param _interval Time interval between payments in seconds.
     */
    function createSubscription(address _beneficiary, uint256 _amount, uint256 _interval) external payable {
        require(_amount > 0, "Amount must be greater than zero");
        require(_interval > 0, "Interval must be greater than zero");
        require(msg.value >= _amount, "Initial payment required");

        subscriptionCount++;
        subscriptions[subscriptionCount] = Subscription({
            subscriber: msg.sender,
            beneficiary: _beneficiary,
            amount: _amount,
            interval: _interval,
            nextPayment: block.timestamp + _interval,
            active: true
        });

        // Transfer the initial payment
        payable(_beneficiary).transfer(_amount);
        emit SubscriptionCreated(subscriptionCount, msg.sender, _beneficiary, _amount, _interval);
    }

    /**
     * @dev Cancel an active subscription.
     * @param _subscriptionId ID of the subscription to cancel.
     */
    function cancelSubscription(uint256 _subscriptionId) external {
        Subscription storage subscription = subscriptions[_subscriptionId];
        require(subscription.subscriber == msg.sender, "Not the subscriber");
        require(subscription.active, "Subscription already inactive");

        subscription.active = false;

        emit SubscriptionCancelled(_subscriptionId);
    }

    /**
     * @dev Execute a payment for an active subscription.
     * @param _subscriptionId ID of the subscription to execute payment for.
     */
    function executePayment(uint256 _subscriptionId) external {
        Subscription storage subscription = subscriptions[_subscriptionId];
        require(subscription.active, "Subscription is not active");
        require(block.timestamp >= subscription.nextPayment, "Payment not due yet");

        // Transfer payment
        require(address(this).balance >= subscription.amount, "Insufficient contract balance");
        payable(subscription.beneficiary).transfer(subscription.amount);

        // Update next payment time
        subscription.nextPayment += subscription.interval;

        emit PaymentExecuted(_subscriptionId, subscription.amount);
    }

    /**
     * @dev Deposit funds to the contract to facilitate payments.
     */
    function deposit() external payable {}


    /**
     * @dev Get details of a subscription.
     * @param _subscriptionId ID of the subscription.
     */
    function getSubscription(uint256 _subscriptionId) external view
        returns (
            address subscriber,
            address beneficiary,
            uint256 amount,
            uint256 interval,
            uint256 nextPayment,
            bool active
        ){
        Subscription storage subscription = subscriptions[_subscriptionId];
        return (
            subscription.subscriber,
            subscription.beneficiary,
            subscription.amount,
            subscription.interval,
            subscription.nextPayment,
            subscription.active
        );
    }
    
}