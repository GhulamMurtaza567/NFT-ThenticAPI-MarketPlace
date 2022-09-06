import { Box, Card, CardContent, CardMedia, CardActionArea, Grid, Typography } from '@mui/material/'

const MarketPlace = () => {
  return (
    <>
      <Grid container spacing={2} sx={{ px:10, mt:3, mb: 5 }}>
        <>
          {Array.from(Array(8)).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card sx={{ maxWidth: 350 }}>
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
                        NFT Name
                      </Typography>
                      <Typography
                        gutterBottom
                        variant='h6'
                        component='div'
                      >
                        0.05 
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
                        sx={{ flexGrow: 1 }}
                        gutterBottom
                        component='div'
                      >
                        Collection Name
                      </Typography>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </>
      </Grid>
    </>
  )
}

export default MarketPlace;