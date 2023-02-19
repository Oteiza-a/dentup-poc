import Head from 'next/head'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { Card, CardBody, Heading, Text } from '@chakra-ui/react'
import Layout from '@/components/layout/Layout'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <Layout navbar>
      <Head>
        <title>Home - DentUp</title>
      </Head>

      <Card>
        <CardBody>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla nihil maiores repudiandae, 
          eaque consequatur atque soluta praesentium minima itaque facere optio ullam amet aperiam possimus odit 
          exercitationem neque est numquam.
        </CardBody>
      </Card>
    </Layout>
  )
}
