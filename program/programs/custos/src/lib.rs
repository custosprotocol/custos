use anchor_lang::prelude::*;
pub mod errors;
pub mod instructions;
pub mod state;

// pub use errors::ErrorCode;
use instructions::*;
pub use state::*;

declare_id!("CUSto3eB2v7ZbzLTtobb1uwhQQur9gWnWtb3vESvrnwz");

#[program]
pub mod custos {
    use super::*;

    pub fn create_delegate(ctx: Context<CreateDelegate>) -> Result<()> {
        create_delegate::handler(ctx)
    }

    pub fn revoke_delegate(ctx: Context<RevokeDelegate>) -> Result<()> {
        revoke_delegate::handler(ctx)
    }

    pub fn create_token_delegate(ctx: Context<CreateTokenDelegate>) -> Result<()> {
        create_token_delegate::handler(ctx)
    }

    pub fn revoke_token_delegate(ctx: Context<RevokeTokenDelegate>) -> Result<()> {
        revoke_token_delegate::handler(ctx)
    }
}
