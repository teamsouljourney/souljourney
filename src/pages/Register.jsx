import { Container } from '@mui/material'
import Grid from '@mui/material/Grid2'
import bgImage from '../assets/images/weSupport.jpg'

const Register = () => {
  return (
    <Container
      maxWidth="xl"
      sx={{
        height: "100vh",
        p: 0,
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      <Grid
        container
        justifyContent="center"
        direction="row-reverse"
        rowSpacing={{sm: 3}}
        sx={{
          height: "100%",
          p:2
        }}
      >
        Register
      </Grid>
    </Container>
  )
}

export default Register