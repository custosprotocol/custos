use anchor_lang::prelude::*;

declare_id!("3xZo42jGt8vx9huwx2CXYWEcnuetDvurTAG9PLwRzcZo");

#[program]
pub mod custos {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
