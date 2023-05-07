# Custos Protocol
Securely delegate your Solana assets without compromising your cold wallet's security

## Background
Proof of ownership is one of the more critical yet highly neglected problems in the Solana ecosystem. In its current form, it's highly insecure 🚨 - users must connect their cold wallets to unverified websites or transfer their valuable assets to warm wallets.

![Unsafe|642x500](https://github.com/custosprotocol/custos/blob/main/assets/unsafe.png)

Custos Protocol aims to remedy this and much more! 🚀

Custos provides a seamless and secure way to delegate assets from cold to warm wallets. This allows users to prove ownership of their assets without risking them by connecting to insecure websites or moving them around.

## How to integrate: Custos JS SDK
Custos Javascript SDK that can be used readily by developers to interact with the Custos Protocol.

The SDK can be used by:
1. **Wallets** to allow users to delegate a cold wallet and its assets to a hot wallet
2. **Dapps** to fetch the all delegates for a given hot wallet

#### NPM Package: https://www.npmjs.com/package/custos-js-sdk
Install SDK:
```
// Yarn
yarn add custos-js-sdk

// npm
npm install custos-js-sdk
```

For more info, checkout the guide here: https://github.com/custosprotocol/custos-js-sdk

## Features
### Full control of asset delegation
Users can choose what assets they want to delegate to their hot wallet of choice. These assets can be anything: NFTs or liquid fungibles. Users can also choose the number of tokens they would like to delegate.

### Fully on-chain
Custos Protocol is a fully on-chain Solana program and does not involve storing data off-chain and performing backend operations on unverified and insecure centralized cloud servers.

## Actions
There are two main actions that can be performed on Custos Protocol:
1. Delegation
2. Revoking delegation

## Delegation Types
For delegating assets, we provide users three options to allow users to be in full control of what gets delegated:
1. Full Wallet Delegation: The entire wallet gets delegated, including all assets that are owned by the wallet.
2. NFT Delegation: Single or multiple NFTs can be selected to be delegated to one or more wallets.
3. Liquid Token Delegation: Liquid Tokens or fungible SPL-tokens can be delegated to multiple wallets. 

## Delegated Wallet Options
The following types of wallets can be used to be delegated using Custos Protocol:
1. Hardware Wallets [recommended]
2. Hot Wallets
3. Multisig Wallets [soon]

## What is Delegation
If an asset in your cold wallet is delegated to your hot wallet:
- The hot wallet is simply “shadowing” as the owner of the asset
- The hot wallet does not own any write / transfer rights over this asset, not has the ability to transfer these rights to anyone else.
- The cold wallet remains the owner of this asset on-chain. With our delegation standard however, the hot wallet can be proven to be a shadow-owner of this asset, and hence the hot wallet owner can prove ownership of that given asset.

## Under-the-hood
We are using PDAs to to derive *delegation* accounts for full wallet or token delegation.

### DelegationAccount
To delegate wallet A to another wallet B, a `DelegationAccount` can be derived using the address of wallet A. 

```
#[account]
pub struct DelegateAccount {
    // Cold Wallet
    pub authority: Pubkey,
    pub hot_wallet: Pubkey,
}

where seeds for DelegateAccount:
[
    DelegateAccount::PREFIX.as_bytes(),
    authority.key().as_ref(),
]
```

### TokenDelegationAccount
In the case of token Delegation, i.e., delegating a token in wallet A with ATA (associated token account) T to wallet B, a `TokenDelegationAccount` can be derived using the address of wallet A and the ATA T.

```rs
#[account]
pub struct DelegateTokenAccount {
    pub authority: Pubkey,
    pub hot_wallet: Pubkey,
    pub token_account: Pubkey,
}

where seeds for DelegateTokenAccount:
[
    DelegateTokenAccount::PREFIX.as_bytes(),
    authority.key().as_ref(),
    token_account.key().as_ref(),
]
```
![Safe|642x500](https://github.com/custosprotocol/custos/blob/main/assets/safe.png)

### Revoking Delegations
The authority of the Delegation can revoke delegations by closing the PDA.

```rs
#[derive(Accounts)]
pub struct RevokeDelegate<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,
    #[account(mut, has_one=authority, close=authority)]
    pub delegate_account: Account<'info, DelegateAccount>,
}

#[derive(Accounts)]
pub struct RevokeTokenDelegate<'info> {
    pub authority: Signer<'info>,

    #[account(mut, has_one=authority, close=authority)]
    pub delegate_token_account: Account<'info, DelegateTokenAccount>,
}
```

### Fetching Delegations
This standard would require an SDK for client-side fetching delegated wallets. When a user connects their wallet, the SDK can fetch all the assets delegated to the given (connected) hot wallet. Here is a reference implementation of the SDK:

```ts
getUserDelegates = async (hotWallet: PublicKey) => {
  const data = await this.delegationProgram.account.DelegateAccount.all([
    {
      memcmp: {
        offset: 8 + 32,
        bytes: hotWallet.toBase58(),
      },
    },
  ]);

  return data;
};

getTokenDelegates = async (hotWallet: PublicKey) => {
  const data = await this.delegationProgram.account.DelegateAccount.all([
    {
      memcmp: {
        offset: 8 + 32,
        bytes: hotWallet.toBase58(),
      },
    },
  ]);

  return data;
};
```

## Some Potential Use-Cases
- Claiming Airdrops
- Claiming Allowlists
- Token-gated mints
- Token-gated games
- DAO Governance
- On-chain reputation
- Verifiable Wallet aggregation

## Ongoing Investigation
* **Supporting Programmable Wallets**: Smart contract wallets like Multisigs are not system accounts; hence, the current implementation for the standard can be changed to support PDAs that represent programmable wallets.
* **Allowing tightly scoped rights** to the delegated hot wallet for making transactions on behalf of the cold wallet.
* **Delegation Expiration**: Current implementation requires users to manually revoke a delegation if they no longer want a given hot wallet to be the Delegation for a cold wallet. Automatic expiration could be introduced to let users set a dedicated interval, after which the `Delegation/TokenDelegationAccount` will be closed.
