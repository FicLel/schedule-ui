import {useMemo, useState} from 'react';
import { Grid, Card, Text, Dropdown, Button } from '@nextui-org/react';

export const AssignDegreeGroup = ({course}) => {
  const [selected, setSelected] = useState(new Set(["text"]));

  const selectedValue = useMemo(
    () => Array.from(selected).join(", ").replaceAll("_", " "),
    [selected]
  );
  return (
    <Grid.Container css={{border: '1px solid #787F85', padding: '2%', margin: '0 5% 1% 5%', borderRadius: '8px'}}>
      <Grid.Container xs={6} css={{padding: '1%'}}>
        <Grid xs={12} css={{marginBottom: '10px'}}>
          <Text b>Asignar Docente {course}</Text>
        </Grid>
        <Grid xs={12} css={{marginBottom: '15px'}}>
          <Dropdown>
            <Dropdown.Button flat color="secondary" css={{ tt: "capitalize", width: '350px'}}>
              {selectedValue}
            </Dropdown.Button>
            <Dropdown.Menu
              aria-label="Single selection actions"
              color="secondary"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={selected}
              onSelectionChange={setSelected}
            >
              <Dropdown.Item key="text">Text</Dropdown.Item>
              <Dropdown.Item key="number">Number</Dropdown.Item>
              <Dropdown.Item key="date">Date</Dropdown.Item>
              <Dropdown.Item key="single_date">Single Date</Dropdown.Item>
              <Dropdown.Item key="iteration">Iteration</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Button>Agregar</Button>
        </Grid>
        <Grid xs={12}>
          <Card variant="bordered">
            <Card.Body>
              <Text>Bordered card.</Text>
            </Card.Body>
          </Card>
        </Grid>
        
        
      </Grid.Container>
      <Grid.Container xs={6} css={{padding: '1%'}}>
        <Grid xs={12} css={{marginBottom: '10px'}}>
          <Text b>Asignar Grupos Academicos</Text>
        </Grid>
        <Grid xs={12} css={{marginBottom: '15px'}}>
          <Dropdown>
            <Dropdown.Button flat color="secondary" css={{ tt: "capitalize", width: '350px'}}>
              {selectedValue}
            </Dropdown.Button>
            <Dropdown.Menu
              aria-label="Single selection actions"
              color="secondary"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={selected}
              onSelectionChange={setSelected}
            >
              <Dropdown.Item key="text">Text</Dropdown.Item>
              <Dropdown.Item key="number">Number</Dropdown.Item>
              <Dropdown.Item key="date">Date</Dropdown.Item>
              <Dropdown.Item key="single_date">Single Date</Dropdown.Item>
              <Dropdown.Item key="iteration">Iteration</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Button>Agregar</Button>
        </Grid>
        <Grid xs={12}>
          <Card variant="bordered">
            <Card.Body>
              <Text>Bordered card.</Text>
            </Card.Body>
          </Card>
        </Grid>
        
        
      </Grid.Container>
 
    </Grid.Container>
  ); 
};
