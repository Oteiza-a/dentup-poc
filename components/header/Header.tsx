import React from 'react';
import styles from './Header.module.css'

interface Props extends React.PropsWithChildren {}

const Header: React.FC<Props> = ({}) => {
  return (
    <header className={styles.header}>
        
    </header>
  );
};

export default Header;