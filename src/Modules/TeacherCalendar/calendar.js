import {CalendarTableBody} from './calendar-body';
import { Text } from '@nextui-org/react';
import './index.scss';

export const CalendarTable = ({
  updateTable,
  course, 
  teacher, 
  schedule, 
  year, 
  selectedCourse
}) => {
  const columns = [
    {
      key: "intervals",
      label: "Horas",
    },
    {
      key: "lunes",
      label: "Lunes",
    },
    {
      key: "martes",
      label: "Martes",
    },
    {
      key: "miercoles",
      label: "Miercoles",
    },
    {
      key: "jueves",
      label: "Jueves",
    },
    {
      key: "viernes",
      label: "Viernes",
    },
  ];

  const setNameCourse = (teacher, year) => {
    if (teacher?.name) {
      return `${teacher?.name} - ${year?.startDate?.substring(0, 4)}/${year?.endDate?.substring(0, 4)}`;
    }
    return 'Nombre del Profesor';
  };

  
  return (
    <div className='calendar-table-container'>
      <Text h1>{setNameCourse(teacher, year)}</Text>
      <table className='calendar-table'>
        <thead className='calendar-table-header'>
          <tr>
            {columns.map(column => (<th>{column.label}</th>))}
          </tr>
        </thead>
        <CalendarTableBody 
          updateTable={updateTable}
          teacher={teacher}
          schedule={schedule} 
          course={course} 
          year={year} 
          selectedCourse={selectedCourse}
        />
      </table>
    </div>
  );
};
