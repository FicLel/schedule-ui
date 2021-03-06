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
              borderTop: selectedId !== rows?._id ? '4px solid #29ffc6' : '4px solid $pink800',
              minWidth: '70px',
              padding: '.3rem',
              cursor: 'pointer',
              '&:hover': {
                background: '$black100',
                color: '$pink800',
              },
            }}>
              <Card.Body>
                <Text b size='1.25em'>{rows?.name} - {rows?.code}</Text>
              </Card.Body>
            </Card> 
        </div>
      ))}
      </div>
    </div>
  );
}
