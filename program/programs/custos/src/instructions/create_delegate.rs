use crate::state::*;
use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct CreateDelegate<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,
    pub to_delegate_account: SystemAccount<'info>,
    #[account(
        init,
        seeds = [DelegateAccount::PREFIX.as_bytes(),authority.key().as_ref()],
        bump,
        payer = authority,
        space = DelegateAccount::LEN,   
    )]
    pub delegate_account: Account<'info,DelegateAccount>,

    
   pub system_program: Program<'info, System>,
}

pub fn handler(ctx: Context<CreateDelegate>) -> Result<()> {
    let delegate_account = &mut ctx.accounts.delegate_account;

    delegate_account.authority = ctx.accounts.authority.key();
    delegate_account.hot_wallet = ctx.accounts.to_delegate_account.key();


    msg!("{} Delegated to {}",ctx.accounts.authority.key(),ctx.accounts.delegate_account.key());

    Ok(())
}
