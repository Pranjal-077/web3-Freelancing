// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Escrow {
    address public client;
    address public freelancer;
    uint public amount;
    bool public funded;

    constructor(address _freelancer) payable {
        require(msg.value > 0, "Must send ETH");
        client = msg.sender;
        freelancer = _freelancer;
        amount = msg.value;
        funded = true;
    }

    function release() external {
        require(msg.sender == client, "Only client can release");
        require(funded, "Not funded");

        funded = false;
        payable(freelancer).transfer(amount);
    }

    function refund() external {
        require(msg.sender == client, "Only client can refund");
        require(funded, "Not funded");

        funded = false;
        payable(client).transfer(amount);
    }
}
