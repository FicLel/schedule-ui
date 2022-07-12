import { Grid, Table } from '@nextui-org/react';
import {RenderCell} from './cell';

export const CourseTable = ({
    courses = [],
    setCourse,
    getFunction,
    selectedCourse,
  }) => {

  const columns = [
    {
      key: "name",
      label: "Nombre",
    },
    {
      key: "code",
      label: "Codigo",
    },
    {
      key: "hours",
      label: "Horas",
    },
    {
      key: "schedule",
      label: "Administrar Grupos y profesores",
    },
    {
      key: "Actions",
      label: "Acciones",
    },
  ];

  return (
    <Grid.Container css={{border: '1px solid #787F85', padding: '2%', margin: '0 5% 1% 5%', borderRadius: '8px'}}>
      <Grid xs={12} css={{justifyContent: ''}}>
        <Table
          aria-label="Example table with dynamic content"
          css={{
            height: "auto",
            minWidth: "70rem",
            width: '100%'
          }}
        >
          <Table.Header columns={columns}>
            {(column) => (
              <Table.Column key={column.key} css={{fontSize: '1em', padding: '1%'}}>{column.label}</Table.Column>
            )}
          </Table.Header>
          <Table.Body items={courses}>
            {(item) => (
              <Table.Row key={item._id}>
                {(columnKey) => <Table.Cell><RenderCell item={item} columnKey={columnKey} setCourse={setCourse}/></Table.Cell>}
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </Grid>
    </Grid.Container>
  );  
}
