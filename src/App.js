import './App.css';
import { Grid } from '@nextui-org/react';
import {Login} from './Modules/Login';
import {Register} from './Modules/Register';
import {Home} from './Modules/Home';
import {Calendar} from './Modules/Calendar';
import {GroupsList} from './Modules/GroupsList';
import {TeacherCalendar} from './Modules/TeacherCalendar';
import {Teacher} from './Modules/Teacher';
import {Course} from './Modules/Course';
import {
  Routes,
  Route,
} from "react-router-dom";


function App() {
  return (
    <Grid.Container>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='home' element={<Home />} />
          <Route path='calendar/:id' element={<Calendar />} />
          <Route path='groups-list' element={<GroupsList />} />
          <Route path='teacher-calendar/:id' element={<TeacherCalendar />} />
          <Route path='teacher' element={<Teacher />}/>
          <Route path='course' element={<Course />}/>
        </Routes>
    </Grid.Container>
  );
}

export default App;
