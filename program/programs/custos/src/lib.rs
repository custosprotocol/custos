use anchor_lang::prelude::*;
pub mod errors;
pub mod instructions;
pub mod state;

// pub use errors::ErrorCode;
use instructions::*;
pub use state::*;

declare_id!("3xZo42jGt8vx9huwx2CXYWEcnuetDvurTAG9PLwRzcZo");

#[program]
pub mod custos {
    use super::*;

    pub fn create_delegate(ctx: Context<CreateDelegate>) -> Result<()> {
        create_delegate::handler(ctx)
    }

    pub fn revoke_delegate(ctx: Context<RevokeDelegate>) -> Result<()> {
        revoke_delegate::handler(ctx)
    }
}
