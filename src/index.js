import contractABI from "./app/components/SubscriptionManagerABI.json";

let Web3 = new Web3(window.ethereum);
const contractAddress = "0x750F160C5187e77A1E79C04Df9bF97b7E898aA62"; //Replace when deployed
let contract = new web3.eth.Contract(contractABI, contractAddress);
import SubscriptionManagerArtifact from "./build/contracts/SubscriptionManager.json";

// Connect to the Ethereum network

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

// Create a contract instance

const SubscriptionManager = contract(SubscriptionManagerArtifact);
SubscriptionManager.setProvider(web3.currentProvider);

// Function to add a subscription

async function addSubscription(
  benficiary,
  comapanyName,
  domainName,
  amount,
  interval
) {
  const accounts = await getAccounts();
  //const instance = await SubscriptionManager.deployed();

  // Call the addSubscription function from the contract
  try {
    const result = await contract.methods.addSubscription(
      benficiary,
      comapanyName,
      domainName,
      amount,
      interval,
      { from: accounts[0] }
    );
    console.log(result);
  } catch (error) {
    console.error("User rejected request:", error);
  }
}

// Function to delete a subscription

async function deleteSubscription(subscriptionId) {
  const accounts = await getAccounts();

  // Call the deleteSubscription function from the contract
  try {
    const result = await contract.methods
      .deleteSubscription(subscriptionId)
      .send({ from: accounts[0] });
    console.log(result);
  } catch (error) {
    console.error("User rejected request:", error);
  }
}

// Function to retrieve all subscriptions

async function getAllSubscriptions() {
  const accounts = await getAccounts();

  // Call the getAllSubscriptions function from the contract
  try {
    const result = await contract.methods
      .getAllSubscriptions()
      .call({ from: accounts[0] });
    console.log(result);
    return result;
  } catch (error) {
    console.error("Error retrieving subscriptions:", error);
  }
}

// Function to get the accounts

async function getAccounts() {
  const accounts = await web3.eth.getAccounts();
  return accounts;
}

// Function to interact with the contract

async function interactWithContract() {
  const accounts = await getAccounts();
  const instance = await SubscriptionManager.deployed();

  // Example interaction: Call a function from the contract

  const result = await instance.someFunction({ from: accounts[0] });
  console.log(result);
}

// Call the function to interact with the contract
interactWithContract().catch(console.error);
// Export the web3 instance and the contract instance for use in other files
module.exports = {
  web3,
  SubscriptionManager,
};
