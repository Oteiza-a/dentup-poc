import React from 'react';
import { Highlight, ListItem, UnorderedList } from '@chakra-ui/react';
import Link from 'next/link';
import styles from './Navbar.module.css'
import { useRouter } from 'next/router';
import Logo from '../logo/Logo';

interface Props extends React.PropsWithChildren {}

interface NavItem {
  text: string
  route: string
}

const navItems: NavItem[] = [
  { text: 'Home', route: '/' },
  { text: 'Calendario', route: '/calendar' },
  { text: 'Pacientes', route: '/patients' },
]

const Navbar: React.FC<Props> = ({}) => {
  return (
    <nav className={styles.navbar}>
      <Logo />

      <Menu items={navItems}/>
    </nav>
  );
};

const Menu = ({ items }: { items: NavItem[] }) => {
  const router = useRouter()

  return (
    <UnorderedList className={styles.menuList}>

      {items.map(({ text, route }: NavItem) => (
        <ListItem listStyleType={'none'} key={route}>

            <Link href={route}>
              <Highlight 
                query={router.pathname === route ? text : ''} 
                styles={{ px: '2', py: '1', rounded: 'full', bg: 'blue.100', color: 'blue.600'}}
              >
                {text}
              </Highlight>
            </Link>

        </ListItem>
      ))}
      
    </UnorderedList>
  )
}

export default Navbar;