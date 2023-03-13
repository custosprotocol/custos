import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  Input,
  Button,
  SimpleGrid,
  Image,
  VStack,
  Wrap,
  WrapItem,
  HStack,
} from "@chakra-ui/react";
import {
  getAllTokens,
  getTokenMetadata,
  getNFTs,
  createTokenDelegate,
  getUserDelegate,
  getAllDelegates,
} from "@/solana";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";

type Tokens = {
  tokenAccount: string;
  mint: string;
};

type ImageData = {
  link: string;
  mint: string;
};

function TokenTab() {
  const { publicKey } = useWallet();
  const wallet = useAnchorWallet();
  const [tokenList, setTokenList] = useState<Tokens[]>();
  const [imagelinks, setImageLinks] = useState<ImageData[]>([]);
  const [selectedMint, setSelectedMint] = useState<String[]>([]);
  const [delegateWalletAddress, setDelegateWalletAddress] =
    useState<string>("");

  console.log("selectedMint", selectedMint);

  useEffect(() => {
    if (publicKey !== null) {
      (async () => {
        // const { tokens } = await getAllTokens(publicKey);
        const nftData = await getNFTs(publicKey);
        console.log("final check here", nftData);
        if (nftData !== null || nftData !== undefined) {
          console.log(nftData);
          const mintList = nftData.map((nft: any) =>
            nft.mintAddress.toString()
          );

          const { data }: any = await getTokenMetadata(mintList);
          if (data == undefined) {
            return;
          }

          const allDefinedData = data.map((d: any) => {
            if (d !== undefined) {
              return d;
            }
          });

          if (wallet !== undefined) {
            const res1 = await getAllDelegates(wallet as NodeWallet);
            const res = await getUserDelegate(wallet as NodeWallet);
            console.log("Fetch Res", JSON.stringify(res));
          }

          console.log("ALL DEFINED DATA", allDefinedData);

          const imagedata = allDefinedData.map((d: any) => {
            return {
              link: d.offChainMetadata?.metadata?.image,
              mint: d?.account,
            };
          });
          console.log("MAIN CHEZ", imagedata);
          setImageLinks(imagedata);
        }
      })();
    }
  }, []);

  return (
    <VStack spacing={4} pos="relative">
      <Box>
        <Text
          color={"white"}
          fontSize="sm"
          fontWeight={"light"}
          textAlign="center"
          pb={5}
          w="30vw"
        >
          Entrust a throwaway burner wallet (eg. your hot wallet) to prove
          ownership on your behalf for any contract.
        </Text>
      </Box>
      <Box>
        <Wrap pt={6} zIndex="-1" h="300px" overflowY={"scroll"} spacing={4}>
          {imagelinks.map((link, i) => (
            <WrapItem key={i}>
              <Image
                border={selectedMint.includes(link.mint) ? "4px" : "1px"}
                borderColor={"white"}
                borderRadius="lg"
                boxSize="150px"
                onClick={() => setSelectedMint([...selectedMint, link.mint])}
                objectFit="cover"
                src={link.link}
                alt="NFT Image"
              />
            </WrapItem>
          ))}
        </Wrap>
      </Box>
      <VStack zIndex={999}>
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
            borderRadius={"full"}
            variant="solid"
            bg="white"
            color="black"
          >
            Delegate Wallet
          </Button>
        </Box>
      </VStack>
    </VStack>
  );
}

export default TokenTab;
