import * as anchor from "@coral-xyz/anchor";
import { Program, Wallet } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import { Custos, IDL } from "./idl";
import axios from "axios";

// Constants
const PROGRAM_ID = new anchor.web3.PublicKey(
  "3xZo42jGt8vx9huwx2CXYWEcnuetDvurTAG9PLwRzcZo"
);
const network = "https://api.devnet.solana.com";
const delegateAccountPrefix = "custos";
const delegateTokenAccountPrefix = "custos_token";

const opts = {
  preflightCommitment: "processed" as anchor.web3.ConfirmOptions,
};

export const getConnection = () => {
  const connection = new anchor.web3.Connection(
    network,
    opts.preflightCommitment
  );

  return connection;
};

export const getProvider = (wallet: Wallet) => {
  /* create the provider and return it to the caller */
  /* network set to local network for now */

  const connection = new anchor.web3.Connection(
    network,
    opts.preflightCommitment
  );

  const provider = new anchor.AnchorProvider(
    connection,
    wallet,
    opts.preflightCommitment
  );
  return provider;
};

export const getProgram = (wallet: Wallet) => {
  const idl = IDL as anchor.Idl;
  const provider = getProvider(wallet);
  const program = new anchor.Program(
    idl,
    PROGRAM_ID,
    provider
  ) as unknown as Program<Custos>;

  return program;
};

export const createDelegate = async (
  wallet: Wallet,
  hotWallet: anchor.web3.PublicKey
) => {
  const program = getProgram(wallet);

  // Can add a check if hotWallet is a systemProgram Account

  const [delegateAccount, delegateAccountBump] =
    await anchor.web3.PublicKey.findProgramAddress(
      [
        Buffer.from(delegateAccountPrefix),
        wallet.publicKey.toBuffer(),
        hotWallet.toBuffer(),
      ],
      PROGRAM_ID
    );

  const ix = await program.methods
    .createDelegate()
    .accounts({
      authority: wallet.publicKey,
      systemProgram: anchor.web3.SystemProgram.programId,
      delegateAccount,
      toDelegateAccount: hotWallet,
    })
    .instruction();

  return ix;
};

export const revokeDelegate = async (
  wallet: Wallet,
  hotWallet: anchor.web3.PublicKey
) => {
  const program = getProgram(wallet);

  const [delegateAccount, delegateAccountBump] =
    await anchor.web3.PublicKey.findProgramAddress(
      [
        Buffer.from(delegateAccountPrefix),
        wallet.publicKey.toBuffer(),
        hotWallet.toBuffer(),
      ],
      PROGRAM_ID
    );

  const ix = await program.methods
    .revokeDelegate()
    .accounts({
      authority: wallet.publicKey,
      delegateAccount: delegateAccount,
    })
    .instruction();

  return ix;
};

export const createTokenDelegate = async (
  wallet: Wallet,
  hotWallet: anchor.web3.PublicKey,
  mint: anchor.web3.PublicKey,
  tokenAccount: anchor.web3.PublicKey
) => {
  const program = getProgram(wallet);

  const [delegateTokenAccount, delegateTokenAccountBump] =
    await anchor.web3.PublicKey.findProgramAddress(
      [
        Buffer.from(delegateTokenAccountPrefix),
        wallet.publicKey.toBuffer(),
        hotWallet.toBuffer(),
      ],
      PROGRAM_ID
    );

  const ix = await program.methods
    .createTokenDelegate()
    .accounts({
      authority: wallet.publicKey,
      toDelegateAccount: hotWallet,
      mint: mint,
      tokenAccount: tokenAccount,
      delegateTokenAccount: delegateTokenAccount,
      systemProgram: anchor.web3.SystemProgram.programId,
    })
    .instruction();

  return ix;
};

export const revokeTokenDelegate = async (
  wallet: Wallet,
  hotWallet: PublicKey
) => {
  const program = getProgram(wallet);

  const [delegateTokenAccount, delegateTokenAccountBump] =
    await anchor.web3.PublicKey.findProgramAddress(
      [
        Buffer.from(delegateTokenAccountPrefix),
        wallet.publicKey.toBuffer(),
        hotWallet.toBuffer(),
      ],
      PROGRAM_ID
    );

  const ix = await program.methods
    .revokeTokenDelegate()
    .accounts({
      authority: wallet.publicKey,
      delegateTokenAccount: delegateTokenAccount,
    })
    .instruction();

  return ix;
};

export const getAllTokens = async (wallet: PublicKey) => {
  if (wallet === undefined || wallet === null) {
    return;
  }

  const url = `https://rpc-devnet.helius.xyz/v0/addresses/${wallet.toString()}/balances?api-key=${
    process.env.NEXT_PUBLIC_HELIUS_API
  }`;

  const { data } = await axios.get(url);

  console.log("DATA", data);

  return data;
};
