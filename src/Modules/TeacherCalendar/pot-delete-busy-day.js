import {useState} from 'react';
import { Popover, Button, Grid, Row, Text } from "@nextui-org/react";
import {useFetch} from '../../hooks/useFetch';
import { toast } from 'react-toastify';

const transformmMinutesToHours = (time) => {
  
  const tempHours  = time / 60;
  const tempMinutes = time % 60;
   
  const hours = parseInt(tempHours.toString(), 10);
  const minutes = parseInt(tempMinutes.toString(), 10);
  if (hours < 0 || hours > 23 || minutes > 59 || minutes < 0) {
    return 'Hora invalida';
  } 

  return ''+hours+':'+minutes;
}

const DeleteUser = ({day, hourInterval, close, teacher, updateTable}) => {
  const getHours = ({start = '', end = ''}) => `${start} a ${end}`;
  const getDay = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
  const {putRequest} = useFetch();

  const handleTeacher = async () => {
    if (teacher?._id) {
      let tempTeacherBusyDays = teacher.busyDays.map((day) => ({
        day: day.day,
        start: transformmMinutesToHours(day.start),
        end: transformmMinutesToHours(day.end),
      }));
      tempTeacherBusyDays = tempTeacherBusyDays.filter((days) => { 
        if (day === days.day && 
          days.start === hourInterval.start && 
          days.end === hourInterval.end) {
          return false;
        }
        return true;
      });
      const response = await putRequest(`/api/teacher/${teacher._id}`, {
       ...teacher,
        busyDays: tempTeacherBusyDays
      });
      if (response) {
        updateTable();
        toast('Se ha modificado el horario');
      } else {
        toast.error('Ocurrio un error y no se modifico el horario');
      }
    }
  };

  return (
    <Grid.Container
      css={{ borderRadius: "14px", padding: "0.95rem", maxWidth: "430px" }}
    >
      <Row justify="center" align="center">
        <Text b>Confirm</Text>
      </Row>
      <Row>
        <Text>
          Estas a punto de seleccionar como horario disponible 
          este horario: {getDay[day]} de {getHours(hourInterval)}
        </Text>
      </Row>
      <Grid.Container justify="space-between" alignContent="center" css={{marginTop: '9px'}}>
        <Grid>
          <Button size="sm" light onClick={() => close(false)}>
            Cancel
          </Button>
        </Grid>
        <Grid>
          <Button size="sm" shadow color="error" onClick={() => handleTeacher()}>
            Eliminar
          </Button>
        </Grid>
      </Grid.Container>
    </Grid.Container>
  );
};

export const PopDeleteBusyDay = ({day, hours, teacher, updateTable}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Grid.Container gap={2} alignContent="center" justify='center'>
      <Grid>
        <Popover isOpen={isOpen} onOpenChange={setIsOpen}>
          <Popover.Trigger>
            <Button light color="secondary" auto>Hora No Disponible</Button>
          </Popover.Trigger>
          <Popover.Content>
            <DeleteUser 
              updateTable={updateTable}
              day={day} 
              hourInterval={hours} 
              close={setIsOpen} 
              teacher={teacher}/>
          </Popover.Content>
        </Popover>
      </Grid>
    </Grid.Container>
  );
};
