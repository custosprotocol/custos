use anchor_lang::prelude::*;

#[account]
pub struct DelegateAccount {
    // Cold Wallet
    pub authority: Pubkey,
    pub hot_wallet: Pubkey,
    pub delegate_all: bool,
}

impl DelegateAccount {
    pub const LEN: usize = 8 + std::mem::size_of::<Self>();

    pub const PREFIX: &'static str = "custos";
}
