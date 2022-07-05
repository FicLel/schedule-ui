import {useEffect, useState, useRef} from 'react';
import { Grid, Loading } from "@nextui-org/react";
import {SelectCourseBar} from './selector-course';
import {CalendarTable} from './calendar';
import socketIOClient from "socket.io-client";
import { ToastContainer } from 'react-toastify';
import {useParams} from 'react-router-dom';
import {useFetch} from '../../hooks/useFetch';
import 'react-toastify/dist/ReactToastify.css';


export const Calendar = () => {
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState({})
  const [selectedCourse, setSelectedCourse] = useState({});
  const [schedule, setSchedule] = useState([]);
  const [year, setYear] = useState({});
  const [loading, setLoading] = useState(true);
  const {getRequest} = useFetch();
  let { id } = useParams();
  const hasFetchedData = useRef(false);
  const token = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    
    
    const socket = socketIOClient('http://localhost:5001', {
      extraHeaders: {
        'authorization': `Bearer ${token?.token}`
      }
    });
    socket.on("connection", data => {
      console.log(data);
    });
    socket.on('message', function(data) {
      if (data && data.length > 0) {
        setSchedule([...data]);
      }
      console.log('Incoming message:', data);
    });
    (socket && id) && socket.emit('schedule', id);

    const getCourses = async () => {
      const response = await getRequest(`/api/coursedegreegroup/group/${id}`);
      setCourses([...response]);
    };
    const getCourse = async () => {
      const response = await getRequest(`/api/group/${id}`);
      setCourse({...response});
    };
    const getSchedule = async () => {
      const response = await getRequest(`/api/schedule/group/${id}`);
      
      setSchedule([...response]);
    };
    const getActiveYear = async () => {
      const response = await getRequest(`/api/schoolyear/active`);
      
      setYear({...response});
    };
    const getData = async () => {
      setLoading(true);
      await getCourses();
      await getCourse();
      await getSchedule(); 
      await getActiveYear();
      setLoading(false);
    };
    if (!hasFetchedData.current) {
      getData();
      hasFetchedData.current = true;
    }

    // CLEAN UP THE EFFECT
    return () => socket.disconnect();

  }, [hasFetchedData.current])

  const LoadingComponent = () => {
    return (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        alignItems: 'center'
      }}>
      <Loading color="secondary" textColor="secondary" loadingCss={{ $$loadingSize: "100px", $$loadingBorder: "10px", padding: '2rem'}}>
        Cargando
      </Loading>
    </div>
    );
  };

  return (
    <Grid.Container gap={0} >
      <Grid xs={3}>
        <SelectCourseBar data={courses} handleChange={setSelectedCourse}/> 
      </Grid>
      <Grid xs={8}>
        { !loading ? 
          (<CalendarTable
              selectedCourse={selectedCourse}
              course={course} 
              schedule={schedule} 
              year={year}/>)
          : (<LoadingComponent />)
        }
      </Grid>
      <ToastContainer />
    </Grid.Container>
  );
};
