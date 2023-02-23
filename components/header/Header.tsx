import { Button, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import styles from './Header.module.css'
import { FiArrowLeftCircle } from 'react-icons/fi'
import { useRouter } from 'next/router';

interface Props extends React.PropsWithChildren {
  title?: string
  subtitle?: string
  backButtonText?: string
  backRoute?: string
}

const Header: React.FC<Props> = ({ title, subtitle, backButtonText, backRoute }) => {
  const router = useRouter()

  const onGoBack = () => backRoute ? router.push(backRoute) : router.back();

  return (
    <header className={styles.header}>
      {Boolean(backButtonText) && 
        <Button 
          onClick={onGoBack}
          leftIcon={<FiArrowLeftCircle />} 
          colorScheme='purple' 
          mb='3' 
          variant='ghost'
        >
          {backButtonText}
        </Button>
      }
      {Boolean(title) && <Heading as='h1' size='xl' mb='2' noOfLines={1}>{title}</Heading>}
      {Boolean(subtitle) && <Text mb='2'>{subtitle}</Text>}
    </header>
  );
};

export default Header;