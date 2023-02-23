import Head from 'next/head'
import {useState, useEffect} from 'react'
import {Button, Image, Input, InputGroup, InputRightElement, Center, Stack, Box, Text, Container, Heading, Link, Spinner, useToast} from '@chakra-ui/react'


export default function Home() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [customizedUnlocked, setCustomizedUnlocked] = useState(false);
  const [APIKey, setAPIKey] = useState("");
  const [contractID, setContractID] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [newLink, setNewLink] = useState(false);

  const handleClick = () => setShow(!show);
  const toast = useToast();

  useEffect(() => {
    if (newLink) {
      toast({
        title: "Airdrop Initiated.",
        description: "The airdrop can now be claimed through the email!",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "bottom",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newLink]);

  function openCheckoutLink() {
    if(email=='') {
      alert("Please enter an email address!");
    } 
    else if (customizedUnlocked && APIKey==''){
      alert("Make sure you've entered your Paper API Key!");

    }
    else if (customizedUnlocked && contractID==''){
      alert("Make sure you've entered your contract ID!");

    }
    else if (customizedUnlocked && imageURL==''){
      alert("Make sure you've entered an Image URL!");

    } 
    else {
      setIsLoading(true);
      fetchCheckoutLink(customizedUnlocked, email, APIKey, contractID, imageURL, title, description).then(
        (checkoutLink) => {
          if(checkoutLink == null) {
            alert("Please enter a valid email address.");
          } else {
            console.log(checkoutLink);
            setCustomizedUnlocked(true);
            setIsLoading(false);
            setNewLink(true);
          }
      }).catch(e => console.log(e));
    }
  };

  return (
    <>
      <Head>
        <title>Email Based Airdrop</title>
        <meta name="description" content="Airdrop NFTs to users using their email. No wallet address required!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box p='50px'>
        <Link as='b' color='cyan.300' href='blog.withpaper.com/how-to-airdrop-nfts-using-email/' isExternal> 
          Learn how to use this page.
        </Link>
        <Center>
          <Stack spacing={3} maxW='sm'>
            <Center>
              <Image src='logo.png' alt="Paper logo" w='10rem'></Image> 
            </Center>
            <Stack spacing={3} maxW='sm'>
              <Heading mt='20px'>Email Based Airdrop</Heading>
              <Text> Airdrop NFTs to users using their email. No wallet address required!</Text>
            </Stack>
            
            <Input placeholder='Email' size='md' onChange={(e) => {setEmail(e.target.value)}}/>
            {customizedUnlocked ?
              <Stack spacing={3} maxW='sm' mt={500}>
                <Container bgColor='#FFFFFF14' borderRadius='lg' px={4} py={2}>
                  A special NFT has been airdropped to the email above. Click on the link in your inbox to claim it!
                  <br/><br/>
                  To airdrop a custom NFT, fill out your&nbsp;
                  <Link color='cyan.300' href='https://paper.xyz/dashboard/developers' isExternal>
                    Paper API Key
                  </Link>, Contract ID, and imageURL.
                </Container>
                <InputGroup size='md'>
                  <Input type={show ? 'text' : 'password'} placeholder='Paper API Key' size='md' onChange={(e) => {setAPIKey(e.target.value)}}/>
                  <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleClick}> {show ? 'Hide' : 'Show'}</Button>
                  </InputRightElement>
                </InputGroup>
                <Input placeholder='Contract ID' size='md' onChange={(e) => {setContractID(e.target.value)}}/>
                <Input placeholder='Image URL' size='md' onChange={(e) => {setImageURL(e.target.value)}}/>
                <Input placeholder='Title (optional)' size='md' onChange={(e) => {setTitle(e.target.value)}}/>
                <Input placeholder='Description (optional)' size='md' onChange={(e) => {setDescription(e.target.value)}}/>
              </Stack>
            : 
            <div/>
            }
            
            <Button onClick={openCheckoutLink}>
              {isLoading ? <Spinner/>  : "Send Airdrop" }
            </Button>
          </Stack>
        </Center>
      </Box>

    </>
  )
};

export const fetchCheckoutLink = async (
  customizedUnlocked: boolean,
  email: string,
  APIKey: string,
  contractID: string,
  imageURL: string,
  title: string,
  description: string
) => {
  try {
    const checkoutLinkResp = await fetch("/api/create-checkout-link", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ customizedUnlocked, email, APIKey, contractID, imageURL, title, description}),
    });
    const link = (await checkoutLinkResp.json()).checkoutLink;
    console.log(link);
    return link;
  } catch (e) {
    console.log("error fetching the checkout link", e);
  }
};
