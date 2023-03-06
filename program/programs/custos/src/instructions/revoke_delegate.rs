use crate::state::*;
use anchor_lang::prelude::*;
use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct RevokeDelegate<'info> {
    pub authority: Signer<'info>,
    #[account(mut,has_one= authority,close = authority)]
    pub delegate_account: Account<'info, DelegateAccount>,
}

pub fn handler(ctx: Context<RevokeDelegate>) -> Result<()> {
    Ok(())
}
