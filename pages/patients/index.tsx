import Header from "@/components/header/Header";
import Layout from "@/components/layout/Layout";
import { IPatient } from "@/interfaces/IPatient";
import { Alert, AlertIcon, Avatar, Button, Card, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useRouter } from "next/router";
import styles from '@/styles/Patients.module.css'
import { TableCellsSkeleton } from "@/components/skeletons/TableCellsSkeleton";
import { FiUserPlus } from 'react-icons/fi'
import { usePatients } from "@/hooks/usePatients";

export default function Patients() {
  const { patients, isError, isLoading } = usePatients()
  const router = useRouter()

  const onPatientClick = async (_id: string) => {
    router.push(`/patients/${_id}`)
  }

  return (
    <Layout navbar>
      <Header
        title="Pacientes"
        subtitle="Administra los pacientes."
        rightSectionElements={
          <div className={styles.headerOptionsContainer}>
            <Button
              onClick={() => router.push(`/patients/new`)}
              colorScheme='blue'
              mb='2'
              rightIcon={<FiUserPlus />}
            >
              Crear paciente
            </Button>
          </div>
        }
      />

      <Card mt='6' p='6' boxShadow='lg'>

        {!isError
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