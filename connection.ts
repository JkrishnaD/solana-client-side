import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  clusterApiUrl,
} from "@solana/web3.js";

const suppliedPublicKey = process.argv[2];

if (!suppliedPublicKey) {
  throw new Error("Provide the public key to check balance");
}

const connection = new Connection("https://api.devnet.solana.com", "confirmed");
console.log("Connected");

// const key = Keypair.generate();
// const address = new PublicKey(key.publicKey);

const publicKey = new PublicKey(suppliedPublicKey);

const balance = await connection.getBalance(publicKey);
const balanceInSol = balance / LAMPORTS_PER_SOL;

console.log("the total balance is", balance);
console.log("the total balance in sol", balanceInSol);
