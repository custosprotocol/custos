use crate::state::*;
use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct CreateDelegate<'info> {
    pub authority: Signer<'info>,
}

pub fn handler(ctx: Context<CreateDelegate>) -> Result<()> {
    Ok(())
}
