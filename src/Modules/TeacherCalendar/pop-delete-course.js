import {useState} from 'react';
import { User, Popover, Button, Grid, Row, Text } from "@nextui-org/react";
import {useFetch} from '../../hooks/useFetch';
import { toast } from 'react-toastify';

const DeleteUser = ({id, updateTable}) => {
  const {deleteRequest} = useFetch();
  const handleClick = async () => {
    if (id) {
      if (id) {
        const response = await deleteRequest(`/api/schedule/${id}`); 
        if (response) {
          updateTable();
          toast('Se ha modificado el horario');
        } else {
          toast.error('Ocurrio un error');
        }
      }
      console.log(id);
    }
  };
  return (
    <Grid.Container
      css={{ borderRadius: "14px", padding: "0.75rem", maxWidth: "330px" }}
    >
      <Row justify="center" align="center">
        <Text b>Confirmar</Text>
      </Row>
      <Row>
        <Text>
          Estas por eliminar esta materia de todos los horarios
        </Text>
      </Row>
      <Grid.Container justify="space-between" alignContent="center">
        <Grid>
          <Button size="sm" light>
            Cancelar
          </Button>
        </Grid>
        <Grid>
          <Button size="sm" shadow color="error" onClick={() => handleClick()}>
            Eliminar
          </Button>
        </Grid>
      </Grid.Container>
    </Grid.Container>
  );
};

export const PopDeleteCourse = ({day, hours, teacher, updateTable, ...props}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Grid.Container gap={2} alignContent="center" justify='center'>
      <Grid>
        <Popover isOpen={isOpen} onOpenChange={setIsOpen}>
          <Popover.Trigger>
            <User
              css={{cursor: 'pointer'}}
              src=""
              name={props.data?.course?.name}
              description={props.room?.name}
            />
          </Popover.Trigger>
          <Popover.Content>
            <DeleteUser id={props.id} updateTable={updateTable}/>
          </Popover.Content>
        </Popover>
      </Grid>
    </Grid.Container>
  );
};
