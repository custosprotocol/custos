import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { Custos } from "../target/types/custos";

describe("custos", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Custos as Program<Custos>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
});
