import React from 'react';
import {Box, Button, Container, TextField, Typography} from "@material-ui/core";
import useAuth from '../../auth';
import {useHistory} from "react-router-dom";
function SignIn() {
  const {login} = useAuth();
  const history = useHistory();
  const [email, setEmail] = React.useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    login(email).then(() => {
      history.push('/search')
    })
  }
  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Typography variant={'h3'} style={{textAlign: 'center'}}>Login</Typography>
        <Box width={'50%'} margin={'auto'} marginTop={'20px'}>
          <TextField placeholder={'Enter your email'}
                     value={email}
                     type={'email'}
                     required
                     onChange={e => setEmail(e.target.value)}
                     variant={'outlined'} fullWidth />
        </Box>
        <Box width={'50%'} margin={'auto'} marginTop={'20px'}>
          <Button
            type={'submit'}
            color={'primary'}
            fullWidth
            variant={'contained'}>Submit</Button>
        </Box>
      </form>
    </Container>
  )
}
export default SignIn;