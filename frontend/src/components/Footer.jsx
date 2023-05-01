import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

function Footer() {
  return (
    <footer>
        <Box 
            px={{ xs: 3, sm: 10}} 
            py={{ xs: 3, sm: 10}}
            bgcolor="black" 
            color="white">
            <Container maxWidth="lg">
                <Grid container spacing={5}>
                    <Grid item xs={12} sm={6}>
                        <Box borderBottom={1} textAlign="center">Follow Us</Box>
                        <Box textAlign="center" sx={{cursor:"pointer", color: "violet"}}>
                            <FacebookIcon/> <InstagramIcon/> <TwitterIcon/>
                        </Box>
                        
                    </Grid>
                   
                    <Grid item xs={12} sm={6} textAlign="center">
                        <Box borderBottom={1}>Location</Box>
                        <Box>
                        <a href="https://www.google.com/maps/dir/45.5125128,-73.6133979/tav+college/@45.5003233,-73.645619,14z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x4cc919deffd38fa7:0x2572105e7bf86853!2m2!1d-73.6431749!2d45.490253" target="_blank" rel="noopener noreferrer" style={{color:"white"}}>TAV College</a>
                        </Box>                        
                    </Grid>
                </Grid>
                <Box textAlign="center" pt={{xs:5, sm:10}} pb={{xs:2, sm:0}}>
                    Medical Center &copy; {new Date().getFullYear()}
                </Box>
            </Container>
        </Box>
    </footer>
  )
}

export default Footer



