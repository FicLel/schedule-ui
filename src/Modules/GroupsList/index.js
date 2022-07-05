import {useEffect, useState} from 'react';
import { Card, Text, Grid } from "@nextui-org/react";
import {useFetch} from '../../hooks/useFetch';
import {CardGroup} from './CardGroup';
import { useNavigate } from "react-router-dom";
import './index.scss';

export const GroupsList = () => {
  const {getRequest} = useFetch();
  const [data, setData] = useState({});
  let history = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const response = await getRequest('/api/group/degree');
      setData({...response});
    };
    Object.keys(data).length === 0 && getData();
  }, []);

  const goBack = () => {
    history('/home')
  };  

  return (
    <Grid.Container >
      <Grid xs={12} css={{padding: '1rem'}}>
        <Text size="1.25rem" css={{
          cursor: 'pointer',
          '&:hover': {
            color: 'blue',
          }
        }}
        onClick={() => goBack()}
          > Regresar</Text>
      </Grid>
      <Grid xs={12} css={{padding: '2rem'}}>
        <Text 
          h1
          size={60}
          css={{
            textGradient: "45deg, $blue600 -20%, $pink600 50%",
          }}
          weight="bold">
            Listado de Grupos Académicos
        </Text>  
      </Grid>
      {
        Object.keys(data).map((groups) => (
          <CardGroup 
            key={groups}
            groups={data[groups]}>
            {groups}
          </CardGroup>
        ))
      }
    </Grid.Container>
  );
};
