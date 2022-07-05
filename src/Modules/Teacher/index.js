import {useEffect, useRef, useState} from 'react';
import { Grid, Text } from '@nextui-org/react';
import {TeacherForm} from './teacher-form';
import {TeacherTable} from './teacher-table';
import {useFetch} from '../../hooks/useFetch';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

export const Teacher  = () => {
  const [teachers, setTeachers] = useState([]);
  const {getRequest, postRequest} = useFetch();
  let history = useNavigate();
  const hasFetchedData = useRef(false);

  useEffect(() => {
    const getTeachers = async () => {
      const response = await getRequest('/api/teacher');
      setTeachers([...response]);
      
    };
    if (!hasFetchedData.current) {
      hasFetchedData.current = true;
      getTeachers(); 
    }
  }, [hasFetchedData.current])

  const saveNewTeacher = async (name) => {
    const response = await postRequest('/api/teacher', {
      name,
      busyDays: []
    });
    if (response) {
      const tempTeachers = [...teachers];
      setTeachers([...tempTeachers, response]);
      return true;
    }
    return false;
  };

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
      <Grid xs={12} css={{margin: '0 5% 1% 2.5%'}}>
        <Text
          h1
          size={60}
          css={{
            textGradient: "45deg, $blue600 -20%, $pink600 50%",
          }}
          weight="bold"
        >
         Mantenimiento Docentes
        </Text>
      </Grid>
      <TeacherForm add={saveNewTeacher}/>
      <TeacherTable teachers={teachers}/>
      <ToastContainer />
    </Grid.Container>
  );
};
