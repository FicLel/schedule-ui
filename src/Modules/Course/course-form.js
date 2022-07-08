import {useState} from 'react';
import {useValidation} from '../../hooks/useValidation';
import { Grid, Input, Button } from '@nextui-org/react';
import { toast } from 'react-toastify';

export const CourseForm = ({add}) => {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [hours, setHours] = useState('');
  const {handleValidation, ...formData} = useValidation({
    name: false,
    code: false,
    hours: false,
  });

  const handleNameField = (e) => {
    setName(e.target.value);
  };

const handleHoursField = (e) => {
    setHours(e.target.value);
  };

const handleCodeField = (e) => {
    setCode(e.target.value);
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
    <Grid.Container xs={12} css={{border: '1px solid #787F85', padding: '2%', margin: '0 5% 1% 5%', borderRadius: '8px'}}>
      <Grid xs={3} >
        <Input 
          size="lg"
          status={formData?.name?.state ? 'error' : ''}
          value={name}
          onBlur={() => {
            handleValidation('TEXT', name, 'name');
          }}
          onChange={handleNameField}
          label="Nombre materia" 
          placeholder="Guillermo Rauch" 
          width="80%"/>
      </Grid> 
      <Grid xs={3}>
        <Input 
          size="lg"
          status={formData?.code?.state ? 'error' : ''}
          value={code}
          onBlur={() => {
            handleValidation('TEXT', code, 'code');
          }}
          onChange={handleCodeField}
          label="Codigo materia" 
          placeholder="Mate 1" 
          width="80%"/>
      </Grid> 
      <Grid xs={3}>
        <Input 
          size="lg"
          status={formData?.hours?.state ? 'error' : ''}
          value={code}
          onBlur={() => {
            handleValidation('NUMBER', hours, 'hours');
          }}
          onChange={handleHoursField}
          label="Horas asignables" 
          placeholder="4" 
          width="80%"/>
      </Grid> 
      <Grid xs={2} css={{justifyContent: 'center', alignItems: 'flex-end'}}>
        <Button color="primary" size='lg' onClick={() => sendData()}>
          Guardar
        </Button>
      </Grid>
    </Grid.Container>
  );
}
