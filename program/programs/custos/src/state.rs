use anchor_lang::prelude::*;

#[account]
pub struct DelegateAccount {
    // Cold Wallet
    pub authority: Pubkey,
    pub hot_wallet: Pubkey,
}

impl DelegateAccount {
    pub const LEN: usize = 8 + std::mem::size_of::<Self>();

    pub const PREFIX: &'static str = "custos";
}

#[account]
pub struct DelegateTokenAccount {
    pub authority: Pubkey,
    pub hot_wallet: Pubkey,
    pub token_account: Pubkey,
}

impl DelegateTokenAccount {
    pub const LEN: usize = 8 + std::mem::size_of::<Self>();

    pub const PREFIX: &'static str = "custos_token";
}
