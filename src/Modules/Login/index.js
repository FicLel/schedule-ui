import {useState} from 'react';
import {useFetch} from '../../hooks/useFetch';
import { Grid, Card, Input, Text, Button } from '@nextui-org/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [name, setName] = useState('');
  const [pass, setPass] = useState('');
  const {postRequest} = useFetch();
  let history = useNavigate();
  const handleName = (e) => {
    setName(e.target.value);
  }
  const handlePass = (e) => {
    setPass(e.target.value);
  }
  const logIn = async () => {
    const data =  await postRequest('/login', {
      email: name,
      pass: pass
    });
    if (!data) {
      toast.error('Datos Erroneos! Ya lo siento'); 
      return;
    }
    
    localStorage.setItem("user", JSON.stringify(data));
    history('home');

  }
  
  const goToRegister = () => {
    history('register');
  };

  return (
    <Grid.Container justify="center" alignItems='center' css={{ h: '100vh'}}>
      <Grid xs={4} css={{ minHeight: '40%', minWidth: '35%' }}>
        <Card>
          <Card.Body css={{ padding: '2rem' }}>
            <Grid.Container gap={2}>
              <Grid xs={12}>
                <Text
                  h1
                  size={60}
                  css={{
                    textGradient: "45deg, $blue600 -20%, $pink600 50%",
                  }}
                  weight="bold"
                  >
                    Inicio de Sesion
                </Text>
              </Grid>
              <Grid xs={12} css={{ margin: '2% 2% 0  0' }}>
                <Input 
                  size="xl" 
                  onChange={handleName}
                  css={{ width: '80%', marginTop: '.4rem' }}
                  aria-label='Usuario'
                  labelPlaceholder='Usuario' 
                  initialValue=''/>
              </Grid>
              <Grid xs={12} css={{ margin: '2% 2% 0  0' }}>
                <Input.Password
                  size="xl"
                  onChange={handlePass}
                  css={{ width: '80%', marginTop: '.4rem' }}
                  aria-label='Password'
                  labelPlaceholder="Password" 
                  initialValue="" />
              </Grid>
              <Grid.Container
                xs={9}
                gap={1}
                css={{justifyContent:'space-between', marginTop: '.4rem',  margin: '2% 2% 0  0' }}
              >
                <Grid>
                  <Button color="gradient" auto ghost onPress={ () => logIn()}>
                    Iniciar Sesion
                  </Button>
                </Grid>
                <Grid>            
                  <Button  light color="primary" auto onPress={() => goToRegister()}>
                    Registrarse
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
