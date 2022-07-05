import {useMemo, useState, useEffect, useRef} from 'react';
import { Dropdown } from "@nextui-org/react";
import { Modal, Button, Text, Input, Row, Checkbox } from "@nextui-org/react";
import {useFetch} from '../../hooks/useFetch';

export const ModalRoom = ({
  visible = false,
  closeHandler,
  data,
  setData,
  year,
  selectedCourse,
  }) => {
  const [selected, setSelected] = useState({name: "Choose a value"});
  const [values, setValues] = useState({});
  const {postRequest} = useFetch();

  const selectedValue = (value) => {
    const [tempValue] = data?.rooms.filter(room => room._id === value);
    setSelected(tempValue);
  };

  const setSchedule = async () => {
    if (selected?._id && data?.course?._id) {
      const response = await postRequest('/api/schedule', {
        'courseDegreeGroup': selectedCourse,
        'room': selected?._id,
        'schoolYear': year?._id,
        'hourInterval': data?.data?._id,
        'day': data?.day,
      }); 
      console.log(response);
      closeHandler();
    } else {
      console.error('faltan valores');
    }
  };

  const generalHandle = () => {
    closeHandler();
    setData({});
  };

  return (
     <Modal
      closeButton
      aria-labelledby="modal-title"
      aria-label='Asign Room'
      open={visible}
      blur
      animated={false}
      onClose={generalHandle}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Selecciona un Aula
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Dropdown disableAnimation>
            <Dropdown.Button 
              flat 
              color="secondary" css={{ tt: "capitalize" }}>
              {selected?.name}
            </Dropdown.Button>
            <Dropdown.Menu 
              onAction={selectedValue}
              aria-label="Dynamic Actions" items={data?.rooms ?? []}>
              {(item) => (
                <Dropdown.Item
                  key={item?._id}
                  onClick={(e) => console.log(e)}
                >
                  {item?.name}
              </Dropdown.Item>
            )}
            </Dropdown.Menu>
          </Dropdown>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={() => generalHandle()}>
            Cancelar
          </Button>
          <Button auto onPress={() => setSchedule()}>
            Asignar
          </Button>
        </Modal.Footer>
      </Modal>
  );
};
