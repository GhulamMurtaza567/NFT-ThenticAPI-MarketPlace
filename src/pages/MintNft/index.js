import { useState, useEffect } from 'react';
import { Box, Button, Grid, Stack, TextField, Typography, CardMedia } from '@mui/material'
import { Buffer } from 'buffer';
import { create } from 'ipfs-http-client'
import { ethers } from 'ethers';
import axios from 'axios';

const projectId = process.env.REACT_APP_INFURA_PROJECT_ID;
const projectSecret = process.env.REACT_APP_INFURA_PROJECT_SECRET;
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
const client = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth,
  },
});

const MintNft = () => {

  const [WalletAddress, setWalletAddress] = useState();
  const [, setWalletBalance] = useState();

  const [contractAddress, updateContractAddress] = useState('')
  const [fileUrl, updateFileUrl] = useState('')
  const [nftDataUrl, updateNftDataUrl] = useState('')
  const [formInput, updateFormInput] = useState({
    name: '',
    description: '',
  });

  const fetchMyAddress = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
    const accounts = await provider.send('eth_requestAccounts', []);
    setWalletAddress(accounts);
    const balance = await provider.getBalance(accounts[0]);
    setWalletBalance(ethers.utils.formatEther(balance));
  }

  const fetchLatestContractAddress = async () => {
    try {
      debugger
      const response = await axios.get(process.env.REACT_APP_GET_LATEST_CONTRACT_ADDRESS,);
      console.log(response);
      updateContractAddress(response.data)
    }
    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchMyAddress();
    fetchLatestContractAddress();
    console.log(contractAddress);
  }, []);

  const onChange = async (e) => {
    debugger
    const file = e.target.files[0]
    try {
      const added = await client.add(file)
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      updateFileUrl(url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }
  }

  async function createNFT() {
    const url = await createData();
    updateNftDataUrl(url)
    handleMintNft();
  }

  const createData = async () => {
    const { name, description } = formInput;
    if (!name || !description || !fileUrl) return;
    const data = JSON.stringify({
      name,
      description,
      image: fileUrl,
    });
    try {
      const added = await client.add(data);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      return url;
    } catch (error) {
      console.log('Error uploading file:', error);
    }
  }

  const handleMintNft = async () => {
    debugger
    const response = await fetch(
      'https://thentic.tech/api/nfts/mint',
      {
        body: JSON.stringify({
          key: process.env.REACT_APP_KEY,
          chain_id: process.env.REACT_APP_CHAIN_ID,
          contract: '0x2721ebD013C88f5C9d75E26b655Dfac2248594a5',
          nft_id: 1,
          nft_data: nftDataUrl,
          to: WalletAddress[0],
          webhook_url: process.env.REACT_APP_MINT_NFT_WEBHOOK,
          redirect_url: 'https://www.abc.com'
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      }
    ).then((response) => response.json())
      .then((data) => {
        console.log(data, 'data')
        debugger
        const url = data.transaction_url;
        window.location.href = url;
      });
    console.log(response)
  }

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item md={6} xs={0}>
            <CardMedia
              component='img'
              image='https://academy-public.coinmarketcap.com/optimized-uploads/319b55063a7f4b26a237cab5b7469720.jpg'
              alt='green iguana'
            />
          </Grid>
          <Grid item md={6} xs={12} sx={{ p: 10, px: 5, textAlign: 'center' }}>
            <Typography sx={{ textAlign: 'center', mt: 3 }} variant='h3' component='h2'>
              Mint NFT
            </Typography>
            <TextField
              label='Asset Name'
              required
              onChange={(e) =>
                updateFormInput({ ...formInput, name: e.target.value })
              }
              fullWidth
              sx={{ mt: 5, backgroundColor: 'white' }}
            />
            <TextField
              label='Asset Description'
              required
              onChange={(e) =>
                updateFormInput({ ...formInput, description: e.target.value })
              }
              fullWidth
              sx={{ mt: 5, backgroundColor: 'white' }}
            />

            <TextField
              type='file'
              required
              fullWidth
              sx={{ mb: 5, mt: 5, backgroundColor: 'white' }}
              onChange={onChange}
            />

            {fileUrl && <img width='350px' src={fileUrl} />}

            <Stack direction='row' spacing={2} sx={{ mt: 5, mb: 5, mx: 6, justifyContent: 'center' }}>
              <Button
                style={{ width: 500, height: 40, backgroundColor: '#7266E0' }}
                variant='contained'
                onClick={createNFT}
              >
                Mint NFT
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}

export default MintNft;