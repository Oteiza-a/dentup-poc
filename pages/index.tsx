import Head from 'next/head'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { Card, CardBody, CardFooter, CardHeader, Heading, Text } from '@chakra-ui/react'
import Layout from '@/components/layout/Layout'
import Logo from '@/components/logo/Logo'
import Image from 'next/image'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <Layout navbar>
      <Head>
        <title>Home - DentUp</title>
      </Head>

      <Card className={styles.cardInfo}>
        <CardHeader textAlign='center'>
          <div className={styles.bannerWrapper}>
            <Image
              priority
              src="/images/dentist-banner.jpg"
              className={styles.banner}
              fill
              alt="banner"
              style={{ objectFit: 'cover', objectPosition: 'center', maxHeight: '400px' }}
            />
          </div>
        </CardHeader>

        <CardBody textAlign='justify'>
          <Logo fontSize='16px' display='inline'/>
          <span> es un software de gestión y agendado de horas para profesionales de la odontología. Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut soluta sequi reiciendis omnis eos a perferendis sapiente tempora beatae, impedit mollitia recusandae. Nulla itaque dolorum recusandae eos laudantium amet tempore.</span>
        </CardBody>

        <CardFooter>
          <small>2023 DentUp.</small>
        </CardFooter>
      </Card>
    </Layout>
  )
}
