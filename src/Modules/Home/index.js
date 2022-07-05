import {useEffect} from 'react';

import { Grid } from '@nextui-org/react';
import { OptionCard } from './option-card';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

export const Home = () => {
  let history = useNavigate();
  const logOut = () =>  {
    localStorage.removeItem('user');
    history('/');
  };
  const redirectHandler = (to) => {
    if (!!to.trim().length) {
      history(to);
    }
  };
  const listMenu = [
    {id: 'm1', name: 'Administrar Horarios', to: '/groups-list'},
    {id: 'm4', name: 'Administrar Docentes', to: '/teacher'},
  ];
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('user'));  
    if(!token?.token) history('/');
  }, [])
  return (
    <Grid.Container justify='center' css={{ h: '80vh', alignItems: 'center'}}>
      <Grid.Container justify='center' xs={8}> 
        {
          listMenu.map((menu) => (
            <Grid key={menu?.id} onClick={() => redirectHandler(menu?.to)} xs={4}>
              <OptionCard to={menu?.to}>{menu?.name}</OptionCard>
            </Grid>
          ))
        }
      </Grid.Container>
      <ToastContainer />
    </Grid.Container>
  );

};
