import { Card, Text, Grid } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

export const CardGroup = ({children, ...props}) => {
  let history = useNavigate();
  const handleClick = (key = undefined) => {
    if (key) {
      history(`/calendar/${key}`, {replace: true});
    } 
  }
  return (
    <Grid.Container xs={12} css={{padding: '2rem'}} >
      <Grid xs={12}>
        <Text h1>{children}</Text>
      </Grid>
      <Grid xs={12}>
        <hr width='300%' size='4' className='separator'/>
      </Grid> 
      <Grid.Container xs={12} css={{padding: '1rem'}}>
        {props.groups.map((group) => (
          <Grid
            xs={4}
            key={group._id}
            css={{marginTop: '.5rem', marginBottom: '.2rem'}} 
            onClick={() => handleClick(group._id)}
          >
            <Card css={{ mw: "400px", cursor: 'pointer',
              '&:hover': {
                border: '1px solid #8e2de2',
              },
            }}>
              <Card.Body>
                <Text b size={22}>{group.code}</Text>
              </Card.Body>
            </Card>   
          </Grid>
        ))}
      </Grid.Container>
    </Grid.Container>
  );
};
