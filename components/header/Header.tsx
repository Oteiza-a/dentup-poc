import { Button, Heading, Text } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import styles from './Header.module.css'
import { FiArrowLeftCircle } from 'react-icons/fi'
import { useRouter } from 'next/router';

interface Props extends React.PropsWithChildren {
  title?: string
  subtitle?: string
  backButtonText?: string
  backRoute?: string
  rightSectionElements?: ReactNode
}

const Header: React.FC<Props> = ({ title, subtitle, backButtonText, backRoute, rightSectionElements }) => {
  const router = useRouter()

  const onGoBack = () => backRoute ? router.push(backRoute) : router.back();

  return (
    <header className={styles.header}>
      <div className={styles.headerLeftSection}>
        {Boolean(backButtonText) && 
          <Button 
            onClick={onGoBack}
            leftIcon={<FiArrowLeftCircle />} 
            colorScheme='blue' 
            mb='3' 
            variant='ghost'
          >
            {backButtonText}
          </Button>
        }
        {Boolean(title) && <Heading as='h1' size='xl' mb='2' noOfLines={1}>{title}</Heading>}
        {Boolean(subtitle) && <Text mb='2'>{subtitle}</Text>}
      </div>
      {Boolean(rightSectionElements) && 
        <div className={styles.headerRightSection}>
          {rightSectionElements}
        </div>
      }
    </header>
  );
};

export default Header;