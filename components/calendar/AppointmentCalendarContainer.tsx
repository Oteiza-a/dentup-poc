import { DateSelectArg } from '@fullcalendar/core';
import React, { useState } from 'react';
import AppointmentCalendar from './AppointmentCalendar';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from '@chakra-ui/react'
import { usePatients } from '@/hooks/usePatients';
import AppointmentForm from '../appointment-form/AppointmentForm';

interface Props extends React.PropsWithChildren {}

interface SelectedTime {
  start: string
  end: string
}

const AppointmentCalendarContainer: React.FC<Props> = () => {
  const [selectedTime, setSelectedTime] = useState<SelectedTime | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { patients, isError, isLoading } = usePatients()

  const onTimeSelect = (selectionInfo: DateSelectArg) => {
    const { startStr: start, endStr: end } = selectionInfo
    setSelectedTime({ start, end })
    onOpen()
  }

  const onAppointmentSubmit = () => {
    console.log();
  }

  return (
    <>
      <AppointmentCalendar onTimeSelect={onTimeSelect}/>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent>
          <ModalCloseButton />

          <ModalHeader>Agendar hora</ModalHeader>

          <ModalBody>
            <AppointmentForm patients={patients || []} isNewAppointment={false}/>
          </ModalBody>

          <ModalFooter>
            <Button variant='ghost'>Secondary Action</Button>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Confirmar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AppointmentCalendarContainer;