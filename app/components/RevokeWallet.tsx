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
  Link,
} from "@chakra-ui/react";
import * as anchor from "@coral-xyz/anchor";
import { useWallet, useAnchorWallet } from "@solana/wallet-adapter-react";
import { getConnection, getUserDelegate, revokeDelegate } from "@/solana";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import { ExternalLinkIcon } from "@chakra-ui/icons";

type delegateAccount = {
  authority?: anchor.web3.PublicKey;
  hotWallet?: anchor.web3.PublicKey;
};

function RevokeWallet() {
  const wallet = useAnchorWallet();
  const { publicKey } = useWallet();
  const [delegateData, setDelegateData] = useState<delegateAccount>();
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();

  useEffect(() => {
    if (wallet === undefined) {
      return;
    }
    (async () => {
      const delegate = await getUserDelegate(wallet as NodeWallet);
      console.log("DELEGATE", delegate);
      console.log("DELEGATE", JSON.stringify(delegate));
      if (delegate.length === 0) {
        setDelegateData({
          authority: undefined,
          hotWallet: undefined,
        });
      } else {
        setDelegateData({
          authority: delegate[0].account.authority,
          hotWallet: delegate[0].account.hotWallet,
        });
      }
    })();
  }, [delegateData]);

  const onClickHandler = async () => {
    try {
      if (publicKey === undefined || publicKey == null) {
        return;
      }
      setLoading(true);

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
          position: "bottom-left",
          description: "Seams like you haven't delegated",
          status: "info",
          duration: 5000,
          isClosable: true,
        });
        setLoading(false);
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
      toast({
        title: "Revoked",
        position: "bottom-left",
        description: (
          <Link href={`https://explorer.solana.com/tx/${sig}`} isExternal>
            Check Tx <ExternalLinkIcon mx="2px" />
          </Link>
        ),
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      setLoading(false);
    } catch (error) {
      console.log("REvoke Error", error);
      toast({
        title: "Revoke Error",
        position: "bottom-left",
        description: <Text>error</Text>,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      setLoading(false);
    }
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
      <Box
        px={5}
        py={3.5}
        borderRadius="full"
        bg="#0f0f0f"
        borderWidth="0.5px"
        borderColor={"rgba(255, 255, 255, 0.5)"}
      >
        {delegateData?.hotWallet !== undefined
          ? delegateData?.hotWallet.toString()
          : "No Wallet Delegated"}
      </Box>
      <Box py={3.5}>
        <Button
          onClick={onClickHandler}
          borderRadius={"full"}
          variant="solid"
          bg="white"
          color="black"
          isLoading={loading}
        >
          Revoke Delegate
        </Button>
      </Box>
    </VStack>
  );
}

export default RevokeWallet;
