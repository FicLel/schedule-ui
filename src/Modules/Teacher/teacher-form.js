import {useState} from 'react';
import { Grid, Input, Button } from '@nextui-org/react';
import { toast } from 'react-toastify';

export const TeacherForm = ({add}) => {
  const [name, setName] = useState('');

  const handleNameField = (e) => {
    setName(e.target.value);
  };

  const sendData = async () => {
    if (!!name.trim().length) {
      const response = await add(name);
      if (response) {
        toast('Profesor Agregado con exito');
        setName('');
      } else {
        toast.error('Error al crear profesor');
      }
    } else {
      toast.error('Rellenar todos los campos necesarios por favor!');
    }
  };

  return (
    <Grid.Container xs={12} css={{border: '1px solid #787F85', padding: '2%', margin: '0 5% 1% 5%'}}>
      <Grid xs={4}>
        <Input 
          size="lg"
          value={name}
          onChange={handleNameField}
          label="Full Name" 
          placeholder="Guillermo Rauch" 
          width="100%"/>
      </Grid> 
      <Grid xs={2} css={{justifyContent: 'center', alignItems: 'flex-end'}}>
        <Button color="primary" size='lg' onClick={() => sendData()}>
          Guardar
        </Button>
      </Grid>
    </Grid.Container>
  );
};
