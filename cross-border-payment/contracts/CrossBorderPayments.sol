// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../../node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract CrossBorderPayment {
    address public owner;
    uint256 public feePercentage;
    mapping(address => uint256) public balances;

    event PaymentSent(address indexed sender, address indexed receiver, uint256 amount, string currency);
    event FeeUpdated(uint256 newFee);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    constructor(uint256 _feePercentage) {
        owner = msg.sender;
        feePercentage = _feePercentage;
    }

    function updateFee(uint256 _newFeePercentage) external onlyOwner {
        feePercentage = _newFeePercentage;
        emit FeeUpdated(_newFeePercentage);
    }

    function convertAndSend(
        address _tokenAddress,
        address payable _receiver,
        uint256 _amount
    ) external payable {
        require(msg.value > 0, "Must send ETH for conversion");

        // Conversion logic with DEX (e.g., Uniswap)
        uint256 fee = (msg.value * feePercentage) / 100;
        uint256 amountAfterFee = msg.value - fee;

        // Transfer converted tokens to the receiver
        IERC20(_tokenAddress).transfer(_receiver, amountAfterFee);

        balances[owner] += fee;

        emit PaymentSent(msg.sender, _receiver, amountAfterFee, "USDT/BUSD");
    }

    function withdrawFees() external onlyOwner {
        uint256 amount = balances[owner];
        balances[owner] = 0;
        payable(owner).transfer(amount);
    }
}
