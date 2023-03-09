import React, { useState } from "react";
import * as anchor from "@coral-xyz/anchor";
import { Box, Text, Input, Button, VStack } from "@chakra-ui/react";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import { createDelegate, getConnection } from "@/solana";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
function WalletTab() {
  const [delegateWalletAddress, setDelegateWalletAddress] =
    useState<string>("");

  const { publicKey } = useWallet();
  const wallet = useAnchorWallet();

  console.log("delegateWalletAddress", delegateWalletAddress);

  const onClickHandler = async () => {
    if (publicKey === undefined || publicKey == null) {
      return;
    }

    const connection = getConnection();
    const { blockhash } = await connection.getLatestBlockhash("finalized");
    const transaction = new anchor.web3.Transaction({
      recentBlockhash: blockhash,
      feePayer: publicKey,
    });

    const ix = await createDelegate(
      wallet as NodeWallet,
      new anchor.web3.PublicKey(delegateWalletAddress)
    );

    transaction.add(ix);

    const signed_tx = await wallet?.signTransaction(transaction);
    if (signed_tx == undefined) {
      return;
    }
    const serialized_transaction = signed_tx.serialize();

    const sig = await connection.sendRawTransaction(serialized_transaction);
    await connection.confirmTransaction(sig, "confirmed");
    console.log("Transaction Signature", sig);
  };

  return (
    <VStack>
      <Text
        color={"white"}
        fontSize="sm"
        fontWeight={"light"}
        textAlign="center"
        pb={5}
      >
        Entrust a throwaway burner wallet (eg. your hot wallet) to prove
        ownership on your behalf for any contract.
      </Text>
      <Text
        letterSpacing={"0.35em"}
        textAlign="center"
        color="white"
        fontSize={12}
      >
        DELEGATE WALLET ADDRESS
      </Text>
      <Box pt={2}>
        <Input
          value={delegateWalletAddress}
          onChange={(e) => setDelegateWalletAddress(e.target.value)}
          placeholder=""
          bg="transparent"
          borderColor={"white"}
          w="35vw"
          borderWidth={"0.5px"}
          borderRadius={"full"}
          variant={"filled"}
          size="md"
        />
      </Box>
      <Box pt={7}>
        <Button
          onClick={onClickHandler}
          borderRadius={"full"}
          variant="solid"
          bg="white"
          color="black"
        >
          Delegate Wallet
        </Button>
      </Box>
    </VStack>
  );
}

export default WalletTab;
