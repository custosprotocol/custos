import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  Flex,
  HStack,
  Button,
  useToast,
} from "@chakra-ui/react";
import * as anchor from "@coral-xyz/anchor";
import { useWallet, useAnchorWallet } from "@solana/wallet-adapter-react";
import { getConnection, getUserDelegate, revokeDelegate } from "@/solana";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";

type delegateAccount = {
  authority: anchor.web3.PublicKey;
  hotWallet: anchor.web3.PublicKey;
};

function RevokeWallet() {
  const wallet = useAnchorWallet();
  const { publicKey } = useWallet();
  const [delegateData, setDelegateData] = useState<delegateAccount>();
  const toast = useToast();

  useEffect(() => {
    if (wallet === undefined) {
      return;
    }
    (async () => {
      const delegate = await getUserDelegate(wallet as NodeWallet);
      console.log("DELEGATE", JSON.stringify(delegate));
      setDelegateData({
        authority: delegate[0].account.authority,
        hotWallet: delegate[0].account.hotWallet,
      });
    })();
  }, []);

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

    if (
      delegateData?.hotWallet === null ||
      delegateData?.hotWallet === undefined
    ) {
      toast({
        title: "No Delegation Found",
        description: "Seams like you haven't delegated",
        status: "info",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    const ix = await revokeDelegate(
      wallet as NodeWallet,
      delegateData.hotWallet
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
    <VStack w="full">
      <Text
        color={"white"}
        fontWeight="light"
        fontSize={12}
        letterSpacing="0.03em"
        lineHeight={"18px"}
      >
        Revoke delegated wallet connected to your vault
      </Text>
      <Text
        pt={6}
        color="white"
        fontWeight={300}
        fontSize={12}
        letterSpacing="0.35em"
      >
        DELEGATE WALLET ADDRESS
      </Text>
      <Box pt={7}>
        <Button borderRadius={"full"} variant="solid" bg="white" color="black">
          Revoke Delegate
        </Button>
      </Box>
    </VStack>
  );
}

export default RevokeWallet;
