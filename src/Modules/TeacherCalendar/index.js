import {useEffect, useState, useRef} from 'react';
import { Grid, Loading, Text } from "@nextui-org/react";
import {CalendarTable} from './calendar';
import {useParams} from 'react-router-dom';
import {useFetch} from '../../hooks/useFetch';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

export const TeacherCalendar = () => {
  const [call, setCall] = useState(false);
  const [course, setCourse] = useState({})
  const [selectedCourse, setSelectedCourse] = useState({});
  const [teacher, setTeacher] = useState({});
  const [schedule, setSchedule] = useState([]);
  const [year, setYear] = useState({});
  const [loading, setLoading] = useState(true);
  const {getRequest} = useFetch();
  let { id } = useParams();
  const hasFetchedData = useRef(false);
  let history = useNavigate();

  useEffect(() => {


    
    const getTeacher = async () => {
      const response = await getRequest(`/api/teacher/${id}`);
      setTeacher({...response});
    };
    const getSchedule = async () => {
      const response = await getRequest(`/api/schedule/teacher/${id}`);
      setSchedule([...response]);
    };
    const getActiveYear = async () => {
      const response = await getRequest(`/api/schoolyear/active`);
      
      setYear({...response});
    };
    const getData = async () => {
      setLoading(true);
      await getTeacher();
      await getSchedule(); 
      await getActiveYear();
      setLoading(false);
    };
    if (!hasFetchedData.current) {
      getData();
      hasFetchedData.current = true;
      setCall(true);
    }
  }, [call])

  const LoadingComponent = () => {
    return (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        alignItems: 'center'
      }}>
      <Loading color="secondary" textColor="secondary" loadingCss={{ $$loadingSize: "100px", $$loadingBorder: "10px", padding: '2rem'}}>
      </Loading>
    </div>
    );
  };

  const updateTable =  () => {
    hasFetchedData.current = false;
    setCall(false);
  }

  const goBack = () => {
    history('/teacher')
  };

  return (
    <Grid.Container gap={0} css={{justifyContent: 'center'}}>
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
      <Grid xs={9}>
        { !loading ? 
          (<CalendarTable
              updateTable={updateTable}
              selectedCourse={selectedCourse}
              course={course} 
              teacher={teacher}
              schedule={schedule} 
              year={year}/>)
          : (<LoadingComponent />)
        }
      </Grid>
      <ToastContainer />
    </Grid.Container>
  );
};
