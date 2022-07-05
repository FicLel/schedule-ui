import {CalendarTableBody} from './calendar-body';
import { Text } from '@nextui-org/react';
import './index.scss';

export const CalendarTable = ({course, schedule, year, selectedCourse}) => {
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

  const setNameCourse = (courseData, year) => {
    if (courseData?.code) {
      return `${courseData?.degree?.name} - ${courseData?.code} - ${year?.startDate?.substring(0, 4)}/${year?.endDate?.substring(0, 4)}`;
    }
    return 'Nombre del grado';
  };
  
  return (
    <div className='calendar-table-container'>
      <Text h1>{setNameCourse(course, year)}</Text>
      <table className='calendar-table'>
        <thead className='calendar-table-header'>
          <tr>
            {columns.map(column => (<th>{column.label}</th>))}
          </tr>
        </thead>
        <CalendarTableBody schedule={schedule} course={course} year={year} selectedCourse={selectedCourse}
/>
      </table>
    </div>
  );
};
