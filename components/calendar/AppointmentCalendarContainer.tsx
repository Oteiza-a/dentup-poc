import { DateSelectArg, EventClickArg } from '@fullcalendar/core';
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
  useToast,
} from '@chakra-ui/react'
import { usePatients } from '@/hooks/usePatients';
import AppointmentForm from '../appointment-form/AppointmentForm';
import { dateToYearMonthDay, getTimeString } from '@/utils/date';
import { SelectedCalendarTime } from '@/interfaces/SelectedCalendarTime';
import { getToastMessage } from '@/helpers/toast';
import { ToastMessages } from '@/enums/ToastMessages';
import { useParsedAppointments } from '@/hooks/useAppointments';
import { IAppointmentForm } from '@/interfaces/AppointmentForm';
import { IAppointment } from '@/interfaces/IAppointment';
import { createAppointment } from '@/clients/appointments';

interface Props extends React.PropsWithChildren {}

const AppointmentCalendarContainer: React.FC<Props> = () => {
  const [selectedTime, setSelectedTime] = useState<SelectedCalendarTime | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { patients } = usePatients()
  const { appointments, refetch } = useParsedAppointments()
  const toast = useToast();

  const onTimeSelect = (selectionInfo: DateSelectArg) => {
    const { start, end } = selectionInfo
    const startTime = getTimeString(start);
    const endTime = getTimeString(end);
    start.setHours(0,0,0,0)
    const day = dateToYearMonthDay(start);

    setSelectedTime({ day, startTime, endTime })
    onOpen()
  }

  const onAppointmentSubmit = async (data: IAppointmentForm) => {
    try {
      const { patient, day, startTime, endTime, treatment } = data
      const selectedPatient = patients?.find(({ _id }) => _id === patient?.value)

      const appointment = {
        patient: patient?.value,
        day: dateToYearMonthDay(day),
        startTime,
        endTime,
        treatment,
        name: `${treatment} - ${selectedPatient?.name} ${selectedPatient?.lastNames}`,
      }

      await createAppointment(appointment as IAppointment)
      refetch()
      toast(getToastMessage(ToastMessages.createAppointmentSuccess))
      onClose()

    } catch (error) {
      console.error(error)
      toast(getToastMessage(ToastMessages.createAppointmentError))
    }
  }

  const onAppointmentClick = (event: EventClickArg) => {
    // ** necesito los appointments, no los events, revisar cómo obtenerlos y tenerlos parseados sin tener que hacer un .map a cada render
    console.log({event});

    // ** convertir a IAppointmentForm

    // const appointmentForm: IAppointmentForm = {
    //   patient: { label: string, value: string }
    //   day: Date
    //   startTime: string
    //   endTime: string
    //   treatment: string
    // }

    // ** abrir modal con data
  }

  return (
    <>
      <AppointmentCalendar
        onTimeSelect={onTimeSelect}
        onAppointmentClick={onAppointmentClick}
        events={appointments || []}
      />

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