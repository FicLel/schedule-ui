import {useEffect, useRef, useState} from 'react';
import {CourseForm} from './course-form';
import {CourseTable} from './course-table';
import {AssignDegreeGroup} from './assign-degree-group';
import { Grid, Text } from '@nextui-org/react';
import { ToastContainer } from 'react-toastify';
import {useFetch} from '../../hooks/useFetch';
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';


export const Course = () => {
  const [courses, setCourses] = useState([]);
  const [assignedGroup, setAssignedGroup] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(undefined);
  let history = useNavigate();
  const {getRequest, postRequest} = useFetch();
  const hasFetchedData = useRef(false);

  const goBack = () => {
    history('/home')
  };

  useEffect(() => {
    const getTeachers = async () => {
      const response = await getRequest('/api/course');
      setCourses([...response]);
    };
    if (!hasFetchedData.current) {
      hasFetchedData.current = true;
      getTeachers(); 
    }
  }, [hasFetchedData.current])

  const saveNewCourse = async (name, code, hours) => {
    const response = await postRequest('/api/course', {
      name,
      code,
      hours
    });
    if (response) {
      const tempCourse = [...courses];
      setCourses([...tempCourse, response]);
      return true;
    }
    return false;
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
          }}
          weight="bold"
        >
          Mantenimiento Materias 
        </Text>
      </Grid>
      <CourseForm />
      <CourseTable courses={courses} setCourse={setSelectedCourse} selectedCourse={selectedCourse}/>
      <AssignDegreeGroup />
      <ToastContainer />
    </Grid.Container>
  );

};
