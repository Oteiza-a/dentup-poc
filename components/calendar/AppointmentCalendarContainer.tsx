import { DateSelectArg } from '@fullcalendar/core';
import React, { useState } from 'react';
import AppointmentCalendar from './AppointmentCalendar';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react'
import { usePatients } from '@/hooks/usePatients';
import AppointmentForm from '../appointment-form/AppointmentForm';
import { getTimeString } from '@/utils/strings';
import { SelectedCalendarTime } from '@/interfaces/SelectedCalendarTime';

interface Props extends React.PropsWithChildren {}

const AppointmentCalendarContainer: React.FC<Props> = () => {
  const [selectedTime, setSelectedTime] = useState<SelectedCalendarTime | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { patients, isError, isLoading } = usePatients()

  const onTimeSelect = (selectionInfo: DateSelectArg) => {
    const { start, end } = selectionInfo
    const startTime = getTimeString(start);
    const endTime = getTimeString(end);
    start.setHours(0,0,0,0)
    const day = start.toISOString().split('T')[0];

    setSelectedTime({ day, startTime, endTime })
    onOpen()
  }

  const onAppointmentSubmit = async (data: any) => {
    console.log(data);
  }

  return (
    <>
      <AppointmentCalendar onTimeSelect={onTimeSelect}/>

      <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
        <ModalOverlay />

        <ModalContent>
          <ModalCloseButton />

          <ModalHeader>Agendar hora</ModalHeader>

          <ModalBody>
            <AppointmentForm
              patients={patients || []}
              isNewAppointment={false}
              onSubmit={onAppointmentSubmit}
              onCancel={() => {
                setSelectedTime(null)
                onClose()
              }}
              selectedTime={selectedTime}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AppointmentCalendarContainer;