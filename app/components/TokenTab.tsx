import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  Input,
  Button,
  SimpleGrid,
  Image,
  VStack,
} from "@chakra-ui/react";
import {
  getAllTokens,
  getTokenMetadata,
  getNFTs,
  createTokenDelegate,
} from "@/solana";
import { useWallet } from "@solana/wallet-adapter-react";

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
    <Box h="100%" pos={"relative"} zIndex={0}>
      <Box h="20%" zIndex={1}>
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
      </Box>
      <Box zIndex={-1} overflowX={"scroll"} height="350px">
        {imagelinks == undefined ? (
          <Box color="white">NO NFTS Found</Box>
        ) : (
          <Box>
            <SimpleGrid
              color="white"
              templateRows="repeat(2, 1fr)"
              templateColumns="repeat(3, 1fr)"
              spacing={10}
            >
              {imagelinks.map((link, i) => (
                <Box key={i}>
                  <Image
                    border={selectedMint.includes(link.mint) ? "4px" : "1px"}
                    borderColor={"white"}
                    borderRadius="lg"
                    boxSize="150px"
                    onClick={() =>
                      setSelectedMint([...selectedMint, link.mint])
                    }
                    objectFit="cover"
                    src={link.link}
                    alt="NFT Image"
                  />
                </Box>
              ))}
            </SimpleGrid>
          </Box>
        )}
      </Box>
      <VStack zIndex="100">
        <Text
          pt={4}
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
    </Box>
  );
}

export default TokenTab;
