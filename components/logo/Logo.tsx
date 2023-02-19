import { Heading, Highlight } from '@chakra-ui/react';
import React from 'react';

interface Props extends React.PropsWithChildren {
  fontSize?: string
  display?: string
}

const Logo: React.FC<Props> = ({ fontSize = '1.5rem', display = 'block' }) => {
  return (
    <Heading as='h4' fontSize={fontSize} display={display}>
      <Highlight
        query='Up'
        styles={{ px: '2', py: '1', rounded: 'full', bg: 'purple.100' }}
      >
        DentUp
      </Highlight>
    </Heading>
  );
};

export default Logo;