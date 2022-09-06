import { Box, Button, Card, CardContent, CardMedia, CardActionArea, Modal, Grid, Typography } from '@mui/material/'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const TransferModel = ({ open, handleClose }) => {

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid item xs={12}>
            <Card>
              <CardActionArea>
                <CardMedia
                  component='img'
                  height='250'
                  image='https://img.seadn.io/files/8102561981458f7cc834d9462a66c040.jpg?auto=format&fit=max&w=384'
                  alt='green iguana'
                />
                <CardContent>
                  <Box sx={{ display: 'flex' }}>
                    <Typography
                      sx={{ flexGrow: 1 }}
                      gutterBottom
                      component='div'
                    >
                      Name
                    </Typography>
                    <Typography
                      gutterBottom
                      variant='h6'
                      component='div'
                    >
                      0.1
                    </Typography>
                    <Box
                      style={{
                        borderRadius: '10px',
                        overflow: 'hidden',
                      }}
                    >
                      <CardMedia
                        component='img'
                        height='30'
                        width='30'
                        image='https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ethereum-icon-purple.svg/1200px-Ethereum-icon-purple.svg.png'
                        alt='ethereum'
                      />
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex' }}>
                    <Typography
                      sx={{ flexGrow: 1, mt:3 }}
                      gutterBottom
                      component='div'
                    >
                      Collection Name
                    </Typography>
                    <Button
                      sx={{ mt: 2, backgroundColor: '#7266E0', justifyContent: 'center', }}
                      variant='contained'
                    // onClick={transferNFT}
                    >
                      Transfer NFT
                    </Button>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Box>
      </Modal>
    </>
  )
}

export default TransferModel;