import {
  airdropIfRequired,
  getKeypairFromEnvironment,
} from "@solana-developers/helpers";
import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  clusterApiUrl,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import "dotenv/config";

// establishing the connection
const connection = new Connection(clusterApiUrl("devnet"));
console.log("connected")
// getting the keypair from .env
const sender = getKeypairFromEnvironment("SECRET_KEY");
const reciever = Keypair.generate();

// creating the transaction
const transaction = new Transaction();
console.log("starting the transaction....")
// transfer instruction
const sendSol = SystemProgram.transfer({
  fromPubkey: sender.publicKey,
  toPubkey: reciever.publicKey,
  lamports: 2 * LAMPORTS_PER_SOL,
});
console.log("preforming the instruction")

// adding the instruction to the transaction
transaction.add(sendSol);

// sending the transaction
const signature = await sendAndConfirmTransaction(connection, transaction, [
  sender,
]);

console.log(`the transaction signature is ${signature}`);
