import {useState} from 'react';
import { Text } from '@nextui-org/react';
import {CalendarCard} from './calendar-card';
import {ModalRoom} from './modal-room';
import {useFetch} from '../../hooks/useFetch';
import {PopSetBusyDay} from './pop-set-busy-day';
import {PopDeleteBusyDay} from './pot-delete-busy-day';
import {PopDeleteCourse} from './pop-delete-course';

export const CalendarTableBody = ({
  schedule, 
  course, 
  year, 
  selectedCourse, 
  teacher,
  updateTable,
}) => {
  const [visible, setVisible] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const {getRequest} = useFetch();  

  const handler = async (data, course, day) => {
    const fetchData = await getRequest(`/api/room/avaible/interval/${data._id}/day/${day}/quantity/${course.quantity}`);
    setSelectedData({data, course, day, rooms: fetchData});
    setVisible(true);
  };

  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };
  
  const CalendarHourInterval = (props) => {
    return <Text>{props.children}</Text>;
  };

  const ConditionalCard = (props) => {
    if (props.data) {
      return <PopDeleteCourse 
        id={props?.id} 
        updateTable={updateTable} 
        data={props.data} 
        room={props.room}/>;
    }
    if (props?.occupied) {
      return (
        <div className='unavailable-space-teacher'>
          <PopDeleteBusyDay 
            updateTable={updateTable}
            day={props.day} 
            hours={props.interval} 
            teacher={teacher}/> 
        </div>
      );
    }
    return (
      <div className='available-space-teacher'>
        <PopSetBusyDay 
          updateTable={updateTable}
          day={props.day} 
          hours={props.interval} 
          teacher={teacher}/> 
      </div>
    );
  };
  return (
    <tbody>
      {schedule.map((row) => {
        return (
          <tr className='calendar-table-body-row' key={row?.hourInterval?._id}>
            <td>
              <div className='blank-space'>
                <CalendarHourInterval>
                  <ModalRoom 
                    data={selectedData}
                    setData={setSelectedData}
                    visible={visible} 
                    year={year}
                    selectedCourse={selectedCourse}
                    closeHandler={closeHandler}/>
                  {row?.hourInterval?.start} - {row?.hourInterval?.end}
                </CalendarHourInterval>
              </div>
            </td>
            <td>
              <ConditionalCard 
                occupied={row?.monday?.occupied}
                interval={row?.hourInterval}
                teacher={teacher}
                day={0}
                data={row?.monday?.courseDegreeGroup} 
                room={row?.monday?.room}
                id={row?.monday?._id} />
            </td>
            <td>
              <ConditionalCard 
                teacher={teacher} 
                occupied={row?.tuesday?.occupied}
                interval={row?.hourInterval}
                day={1}
                data={row?.tuesday?.courseDegreeGroup} 
                room={row?.tuesday?.room}
                id={row?.tuesday?._id} />
            </td>
            <td>
              <ConditionalCard 
                teacher={teacher}
                occupied={row?.wednesday?.occupied}
                interval={row?.hourInterval}
                day={2}
                data={row?.wednesday?.courseDegreeGroup} 
                room={row?.wednesday?.room}
                id={row?.wednesday?._id} /> 
            </td>
            <td>
              <ConditionalCard 
                teacher={teacher}
                occupied={row?.thursday?.occupied}
                interval={row?.hourInterval}
                day={3}
                data={row?.thursday?.courseDegreeGroup} 
                room={row?.thursday?.room}
                id={row?.thursday?._id} />
            </td>
            <td>
              <ConditionalCard 
                teacher={teacher}
                occupied={row?.friday?.occupied}
                interval={row?.hourInterval}
                day={4}
                data={row?.friday?.courseDegreeGroup} 
                room={row?.friday?.room}
                id={row?.friday?._id} />
            </td>
          </tr>
        );
      })}
    </tbody>
  );
}
