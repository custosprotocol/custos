use crate::state::*;
use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct RevokeTokenDelegate<'info> {
    pub authority: Signer<'info>,

    #[account(mut,has_one = authority,close = authority)]
    pub delegate_token_account: Account<'info, DelegateTokenAccount>,
}

pub fn handler(ctx: Context<RevokeTokenDelegate>) -> Result<()> {
    Ok(())
}
