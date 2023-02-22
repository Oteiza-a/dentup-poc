import { Heading, Text } from '@chakra-ui/react';
import React from 'react';
import styles from './Header.module.css'

interface Props extends React.PropsWithChildren {
  title: string
  subtitle?: string
}

const Header: React.FC<Props> = ({ title, subtitle }) => {
  return (
    <header className={styles.header}>
      <Heading as='h1' size='xl' noOfLines={1}>{title}</Heading>
      {Boolean(subtitle) && <Text mt='2'>{subtitle}</Text>}
    </header>
  );
};

export default Header;