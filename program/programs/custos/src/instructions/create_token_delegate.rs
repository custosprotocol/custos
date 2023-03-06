use crate::state::*;
use anchor_lang::prelude::*;
use anchor_spl::token::{Mint, TokenAccount};

#[derive(Accounts)]
pub struct CreateTokenDelegate<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,
    pub to_delegate_account: SystemAccount<'info>,
    #[account(
        init,
        seeds = [DelegateTokenAccount::PREFIX.as_bytes(),authority.key().as_ref(),to_delegate_account.key().as_ref()],
        bump,
        payer = authority,
        space = DelegateTokenAccount::LEN
    )]
    pub delegate_token_account: Account<'info, DelegateTokenAccount>,

    pub mint: Account<'info, Mint>,
    #[account(constraint = token_account.mint == mint.key() && token_account.owner == authority.key() )]
    pub token_account: Account<'info, TokenAccount>,

    pub system_program: Program<'info, System>,
}

pub fn handler(ctx: Context<CreateTokenDelegate>) -> Result<()> {
    let delegate_token_account = &mut ctx.accounts.delegate_token_account;

    delegate_token_account.authority = ctx.accounts.authority.key();
    delegate_token_account.hot_wallet = ctx.accounts.to_delegate_account.key();
    delegate_token_account.token_account = ctx.accounts.token_account.key();

    msg!("Delegation for token Created");

    Ok(())
}
