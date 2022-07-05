import {useState, useEffect} from 'react';
import { Card, Text } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import './selector-course.scss';

export const SelectCourseBar = ({data, handleChange}) => {
  const [selectedId, setSelectedId] = useState('');
  const [courses, setCourses] = useState([]);
  let history = useNavigate();

  
  const handleCardClick = (key) => {
    setSelectedId(key);
    handleChange(key);
    console.log(key);
  };
  const handleReturnClick = () => {
    history('/groups-list');
  };

  useEffect(() => {
    const tempData = data.map((course) => ({...course?.course, _id: course?._id}));
    setCourses([...tempData]);
  }, [data]);
  return (
    <div className='selector-course-bar'>
      <div className='return-option' onClick={() => handleReturnClick()}>
        Regresar
      </div>
      <div className='course-container'>
    { courses.map((rows) => ( 
        <div key={rows._id}>
            <Card 
              onClick={() => handleCardClick(rows._id)} 
              isPressable
              isHoverable
              variant="bordered" css={{
              background: 'linear-gradient(to right, #0cebeb, #20e3b2, #29ffc6)',
              minWidth: '70px',
              padding: '.3rem',
              cursor: 'pointer',
              opacity: selectedId === rows?.id ? '.5' : '1',
              '&:hover': {
                background: '$pink100',
                color: '$pink800',
              },
            }}>
              <Card.Body>
                <Text b color='#ffffff'>{rows?.name} - {rows?.code}</Text>
                <Text>Horas restantes: {rows?.hours}</Text>
              </Card.Body>
            </Card> 
        </div>
      ))}
      </div>
    </div>
  );
}
