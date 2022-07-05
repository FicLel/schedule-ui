import {useEffect, useState} from 'react';
import { Card, Text } from '@nextui-org/react';
import {useFetch} from '../../hooks/useFetch';
import {useParams} from 'react-router-dom';

export const CalendarCard = (props) => {
  let { id } = useParams();

  const [color, setColor] = useState(0);
  const [courseId, setCourseId] = useState(props.course ?? '');
  const {deleteRequest} = useFetch();
  const listOfColors = [
    'rgb(255,175,189)',
    'rgb(33,147,176)',
    'rgb(66,39,90)',
    'rgb(97,67,133)',
    'rgb(2,170,176)',
    'rgb(69,104,220)',
    'rgb(255,95,109)',
  ];
  const listOfGradients = [
    'linear-gradient(90deg, rgba(255,175,189,1) 24%, rgba(255,195,160,1) 66%)',
    'linear-gradient(90deg, rgba(33,147,176,1) 24%, rgba(109,213,237,1) 66%)',
    'linear-gradient(90deg, rgba(66,39,90,1) 24%, rgba(115,75,109,1) 66%)',
    'linear-gradient(90deg, rgba(97,67,133,1) 24%, rgba(81,99,149,1) 66%)',
    'linear-gradient(90deg, rgba(2,170,176,1) 24%, rgba(0,205,172,1) 66%)',
    'linear-gradient(90deg, rgba(69,104,220,1) 24%, rgba(176,106,179,1) 66%)',
    'linear-gradient(90deg, rgba(255,95,109,1) 24%, rgba(255,195,113,1) 66%)',
  ];
  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  const handleClick = async (e) => {
    if (e.nativeEvent.which === 1) {
      console.log("Left click");
    } else if (e.nativeEvent.which === 3) {
      e.preventDefault();
      id && await deleteRequest(`/api/schedule/${props.id}/group/${id}`)  
    }
  };
  useEffect(() => {
    setColor(getRandomInt(0, listOfColors.length - 1));
  }, [courseId])
  return (
    <Card 
      variant="flat"
      onContextMenu={handleClick}
      css={{ 
        padding: '2%',
        width: '100%',
        mw: "200px",
        minHeight: '100px',
        boxShadow:'1px 1px $black100',
        background: '#ffffff',
        border: `4px solid ${listOfColors[color]}`,
      }} 
      >
      <Card.Body css={{maxWidth: '80%', height: '100%'}}>
        <div className='calendar-card-container'>
        <Text b >
          {props?.data?.course?.name}
        </Text>
        <Text >
          {props?.room?.name}
        </Text>
        </div>
      </Card.Body>
    </Card> 
  );
};
