import * as web3 from "@solana/web3.js";
import {
  airdropIfRequired,
  getKeypairFromEnvironment,
} from "@solana-developers/helpers";
import "dotenv/config";

const payer = getKeypairFromEnvironment("SECRET_KEY");

const connection = new web3.Connection(web3.clusterApiUrl("devnet"));

const newBalance = await airdropIfRequired(
  connection,
  payer.publicKey,
  3 * web3.LAMPORTS_PER_SOL,
  0.5 * web3.LAMPORTS_PER_SOL
);
console.log(`the ${newBalance} is airdropped into the wallet`);

const balance = await connection.getBalance(payer.publicKey);
console.log("balance is", balance / web3.LAMPORTS_PER_SOL);

/* 
for the ping program the steps are
    1 - create a transaction
    2 - create an instruction
    3 - add the instruction to the transaction
    4 - send the transaction
*/

const PING_PROGRAM_ADDRESS = "ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa";
const PING_PROGRAM_DATA_ACCOUNT =
  "Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod";

//creating the transaction
const transaction = new web3.Transaction();

const programId = new web3.PublicKey(PING_PROGRAM_ADDRESS);
const programDataId = new web3.PublicKey(PING_PROGRAM_DATA_ACCOUNT);

// creating the instructions
const instruction = new web3.TransactionInstruction({
  programId,
  keys: [
    {
      pubkey: programDataId,
      isSigner: false,
      isWritable: true,
    },
  ],
});
//adding the instructions to the transaction
transaction.add(instruction);

//sending the transaction
const signature = await web3.sendAndConfirmTransaction(
  connection,
  transaction,
  [payer]
);

console.log(`the signature of the transaction is ${signature}`);
