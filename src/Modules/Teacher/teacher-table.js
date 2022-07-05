import { Grid, Table } from '@nextui-org/react';
import {RenderCell} from './cell';

export const TeacherTable = ({teachers}) => {
  const columns = [
    {
      key: "name",
      label: "Nombre",
    },
    {
      key: "Actions",
      label: "Acciones",
    },
    {
      key: "schedule",
      label: "Administrar horarios",
    },
  ];

  return (
    <Grid.Container css={{border: '1px solid #787F85', padding: '2%', margin: '0 5% 1% 5%'}}>
      <Grid xs={12} css={{justifyContent: ''}}>
        <Table
          aria-label="Example table with dynamic content"
          css={{
            height: "auto",
            minWidth: "50rem",
            width: '100%'
          }}
        >
          <Table.Header columns={columns}>
            {(column) => (
              <Table.Column key={column.key} css={{fontSize: '2em', padding: '1%'}}>{column.label}</Table.Column>
            )}
          </Table.Header>
          <Table.Body items={teachers}>
            {(item) => (
              <Table.Row key={item._id}>
                {(columnKey) => <Table.Cell><RenderCell item={item} columnKey={columnKey} /></Table.Cell>}
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </Grid>
    </Grid.Container>
  );  
};
