const Client = require('bitcoin-core');

const client = new Client({
  host: 'localhost',
  port: 10001, // lokalny port z tunelowania
  username: 'bartek',
  password: 'barteks',
  wallet: 'mywallet' 
});

client.command([
  {
    method: 'getnewaddress',
    parameters: []
  },
  {
    method: 'getbalance',
    parameters: []
  },
  {
    method: 'sendtoaddress',
    parameters: ['tb1qwf3375l4fnkn8pzrxg4c5wkrwrwaphha3huvvx', 0.00001]
  }
]).then(([newAddress, balance, txid]) => {
  console.log('New address:', newAddress);
  console.log('Balance:', balance);
  console.log('Transaction ID:', txid);
}).catch((err) => {
  console.error(err);
});