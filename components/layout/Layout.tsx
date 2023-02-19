import { Heading, Highlight } from '@chakra-ui/react';
import Head from 'next/head';
import React from 'react';
import styles from './Layout.module.css'

interface Props extends React.PropsWithChildren {
  navbar?: boolean
}

const Layout: React.FC<Props> = ({ children, navbar }) => {
  return (
    <div className={styles.layout}>
      <Head>
        <link rel="icon" href="/favicon.png" />
        <meta name="description" content="App to generate appointments with dental professionals" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>DentUp POC</title>
      </Head>
      
      {Boolean(navbar) &&
        <nav className={styles.navbar}>
          <Heading>
            <Highlight
              query='Up'
              styles={{ px: '2', py: '1', rounded: 'full', bg: 'purple.100' }}
            >
              DentUp
            </Highlight>
          </Heading>
        </nav>
      }

      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
};

export default Layout;