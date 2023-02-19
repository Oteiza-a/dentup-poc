import Head from 'next/head';
import React from 'react';
import Navbar from '../navbar/Navbar';
import styles from './Layout.module.css'

interface Props extends React.PropsWithChildren {
  navbar?: boolean
}

const Layout: React.FC<Props> = ({ children, navbar }) => {
  return (
    <div className={styles.layout}>
      <Head>
        <link rel="icon" href="../favicon.ico" />
        <meta name="description" content="App to generate appointments with dental professionals" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>DentUp POC</title>
      </Head>
      
      {Boolean(navbar) && <Navbar />}

      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
};

export default Layout;