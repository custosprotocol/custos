use anchor_lang::prelude::*;

#[account]
pub struct CustosAccount {
    // Cold Wallet
    pub authority: Pubkey,
    pub hot_wallet: Pubkey,
}
