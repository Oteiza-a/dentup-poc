import Header from "@/components/header/Header";
import Layout from "@/components/layout/Layout";
import { Patient } from "@/interfaces/Patient";
import { patients } from "@/mocks/patients";
import { Avatar, Card, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useRouter } from "next/router";
import styles from '@/styles/Patients.module.css'

export default function Calendar() {
  const router = useRouter()

  const onPatientClick = (id: string) => {
    router.push(`/patients/${id}`)
  } 

  return (
    <Layout navbar>
      <Header title="Pacientes" subtitle="Administra los pacientes."/>

      <Card mt='6' p='6' boxShadow='lg'>
        <TableContainer>
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
              {patients.map(({ id, profileImage, name, lastNames, dni, phoneNumber, email, treatments }: Patient) => (
                <Tr key={id} onClick={() => onPatientClick(id)} className={styles.patientRow}>
                  <Td><Avatar name={name} src={profileImage} bg='blue.400'/></Td>
                  <Td>{name}</Td>
                  <Td>{lastNames}</Td>
                  <Td>{dni}</Td>
                  <Td>{phoneNumber}</Td>
                  <Td>{email}</Td>
                  <Td isNumeric>{treatments}</Td>
                </Tr>
              ))}
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
      </Card>

    </Layout>
  )
}