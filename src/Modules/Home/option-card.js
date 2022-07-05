import {useEffect, useState} from 'react';
import { Card, Text } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

export const OptionCard = ({children, ...props}) => {
  const [redirect, setRedirect] = useState(undefined);
  let history = useNavigate();

  const handleClick = (key = undefined) => {
    if (key) {
      history(`${props.to}/${key}`);
    } else {
      history(props.to)
    }
  };
  return (
    <Card
      onClick={() => handleClick()}
      variant="bordered"
      css={{ width:'75%', minHeight: '8rem', 
        marginTop: '15px',
        cursor: 'pointer',
        padding: '7%',
        '&:hover': {
          color: 'black',
          background: 'rgba(0, 0, 0, .3)',
        }
      }}
    >
      <Card.Body css={{justifyContent: 'center'}}>
        <Text h2>{children}</Text>
      </Card.Body>
    </Card>    
  );
};
