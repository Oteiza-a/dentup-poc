import Header from "@/components/header/Header";
import Layout from "@/components/layout/Layout";
import { IPatient } from "@/interfaces/IPatient";
import { Alert, AlertIcon, Avatar, Card, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useRouter } from "next/router";
import styles from '@/styles/Patients.module.css'
import useSWR from 'swr'
import axios from "axios";
import { TableCellsSkeleton } from "@/components/skeletons/TableSkeleton";

const fetcher = async (): Promise<IPatient[]> => {
    const res = await axios.get('http://localhost:3000/api/patients')
    return res?.data?.patients
}

export default function Patients() {
  const { data: patients, error, isLoading } = useSWR('/api/patients', fetcher)
  const router = useRouter()

  const onPatientClick = (_id: string) => {
    router.push(`/patients/${_id}`)
  }

  return (
    <Layout navbar>
      <Header title="Pacientes" subtitle="Administra los pacientes."/>

      <Card mt='6' p='6' boxShadow='lg'>

        {!error 
          ? <TableContainer>
              <Table variant='simple' colorScheme='blue'>
                <TableCaption>Pacientes</TableCaption>

                <Thead>
                  <Tr>
                    <Th></Th>
                    <Th>Nombre</Th>
                    <Th>Apellidos</Th>
                    <Th>DNI</Th>
                    <Th>Teléfono</Th>
                    <Th>Email</Th>
                    <Th isNumeric>Tratamientos</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {isLoading 
                    ? <TableCellsSkeleton />
                    : patients?.map(({ _id, profileImage, name, lastNames, dni, phoneNumber, email, treatments }: IPatient) => (
                        <Tr key={_id} onClick={() => onPatientClick(_id)} className={styles.patientRow}>
                          <Td><Avatar name={name} src={profileImage} bg='blue.400'/></Td>
                          <Td>{name}</Td>
                          <Td>{lastNames}</Td>
                          <Td>{dni}</Td>
                          <Td>{phoneNumber}</Td>
                          <Td>{email}</Td>
                          <Td isNumeric>{treatments}</Td>
                        </Tr>
                      ))
                  }
                </Tbody>
                {/* <Tfoot>
                  <Tr>
                    <Th>To convert</Th>
                    <Th>into</Th>
                    <Th isNumeric>multiply by</Th>
                  </Tr>
                </Tfoot> */}
              </Table>
            </TableContainer>
          : <Alert status='error'>
              <AlertIcon /> Ha ocurrido un problema al consultar los datos.
            </Alert>
        }

      </Card>

    </Layout>
  )
}