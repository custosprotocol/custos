use crate::state::*;
use anchor_lang::prelude::*;
use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct RevokeDelegate<'info> {
    pub authority: Signer<'info>,
}

pub fn handler(ctx: Context<RevokeDelegate>) -> Result<()> {
    Ok(())
}
