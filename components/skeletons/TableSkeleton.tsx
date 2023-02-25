import { createArrayFromLength } from "@/utils/array"
import { SkeletonCircle, SkeletonText, Td, Tr } from '@chakra-ui/react'
import styles from '@/styles/Patients.module.css'

export const TableCellsSkeleton = () => (
  <>
    {createArrayFromLength(8).map((i: number) => (
      <Tr key={i} className={styles.patientRow}>
        <Td><SkeletonCircle size='12'/></Td>
        <Td><SkeletonText noOfLines={1}/></Td>
        <Td><SkeletonText noOfLines={1}/></Td>
        <Td><SkeletonText noOfLines={1}/></Td>
        <Td><SkeletonText noOfLines={1}/></Td>
        <Td><SkeletonText noOfLines={1}/></Td>
        <Td isNumeric><SkeletonText noOfLines={1}/></Td>
      </Tr>
    ))}
  </>
)