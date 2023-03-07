import { createArrayFromLength } from "@/utils/array"
import { Skeleton, SkeletonText } from '@chakra-ui/react'

export const PatientFormSkeleton = () => (
  <>
    {createArrayFromLength(5).map((i: number) => (
      <div key={i}>
        <SkeletonText noOfLines={1} w='40%' mt='6'/>
        <Skeleton height='35px' mt='5'/>

      </div>
    ))}
    <Skeleton height='35px' width='180px' mt='7'/>
  </>
)