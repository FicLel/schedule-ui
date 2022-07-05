import {useState} from 'react';
import {useFetch} from '../../hooks/useFetch';
import { Grid, Card, Input, Text, Button } from '@nextui-org/react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [rPass, setRPass] = useState('');
  const {postRequest} = useFetch();
  let history = useNavigate();


  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePass = (e) => {
    setPass(e.target.value);
  };

  const handleRPass = (e) => {
    setRPass(e.target.value);
  };

  const sendData = async () => {
    if (pass !== rPass) {
      toast.error('Tus Passwords no coinciden');
      return;
    } 
    if (!email.trim().length || !pass.trim().length || !rPass.trim().length) {
      toast.error('Completa los datos')
      return;
    }
    const data =  await postRequest('/signup', {
      email,
      pass
    });
    if (data) {
      toast("Registrado!"); 
      setEmail('');
      setPass('');
      setRPass('');
    }

  };

  const goToLogIn = () => {
    history('/');
  };

  return (
    <Grid.Container css={{ h: '100vh', justifyContent: 'center' , alignItems: 'center'}}>
      <Grid xs={5} css={{ minHeight: '15rem' }}>
        <Card>
          <Card.Body css={{ padding: '2rem' }}>
            <Grid.Container gap={4}>
              <Grid xs={12}>
                <Text
                  h1
                  size={60}
                  css={{
                    textGradient: "45deg, $blue600 -20%, $pink600 50%",
                  }}
                  weight="bold"
                  >
                    Registrate
                </Text>
              </Grid>
              <Grid xs={12}>
                <Input 
                  size="xl" 
                  value={email}
                  css={{ width: '80%' }}
                  aria-label='Correo electronico'
                  labelPlaceholder='Correo electronico' 
                  onChange={handleEmail} 
                  initialValue=''/>
              </Grid>
              <Grid xs={12}>
                <Input.Password
                  size="xl"
                  value={pass}
                  css={{ width: '80%' }}
                  onChange={handlePass}
                  aria-label='Password'
                  labelPlaceholder="Password" 
                  initialValue="" />
              </Grid>
              <Grid xs={12}>
                <Input 
                  size="xl" 
                  type='password'
                  value={rPass}
                  onChange={handleRPass}
                  css={{ width: '80%' }}
                  aria-label='Repeat Password'
                  labelPlaceholder='Repeat Password' 
                  initialValue=''/>
              </Grid>
              <Grid.Container xs={9} css={{justifyContent:'space-between'}}>
                <Grid>
                  <Button color="gradient" auto ghost onPress={() => sendData()}>
                    Registrarse
                  </Button>
                </Grid>
                <Grid>            
                  <Button  light color="primary" auto onPress={() => goToLogIn()}>
                    LogIn
                  </Button>
                </Grid>
              </Grid.Container>
            </Grid.Container>
          </Card.Body>
        </Card>
      </Grid> 
      <ToastContainer />
    </Grid.Container>
  );
};
