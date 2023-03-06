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
import { useAppointments, useParsedAppointments } from '@/hooks/useAppointments';
import { IAppointmentForm } from '@/interfaces/AppointmentForm';
import { IAppointment } from '@/interfaces/IAppointment';
import { createAppointment, deleteAppointment, updateAppointment } from '@/clients/appointments';
import Dialog from '../dialog/Dialog';

interface Props extends React.PropsWithChildren {}

const AppointmentCalendarContainer: React.FC<Props> = () => {
  const [selectedTime, setSelectedTime] = useState<SelectedCalendarTime | null>(null);
  const [selectedAppointment, setSelectedAppointment] = useState<IAppointmentForm | null>(null);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<string| null>(null);
  const { isOpen: isFormModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure()
  const { isOpen: isDeleteDialogOpen, onOpen: onDeleteDialogOpen, onClose: onDeleteDialogClose } = useDisclosure()
  const { patients } = usePatients()
  const { appointments } = useAppointments()
  const { appointments: events, refetch } = useParsedAppointments()
  const toast = useToast();

  const onTimeSelect = (selectionInfo: DateSelectArg) => {
    const { start, end } = selectionInfo
    const startTime = getTimeString(start);
    const endTime = getTimeString(end);
    start.setHours(0,0,0,0)
    const day = dateToYearMonthDay(start);

    setSelectedTime({ day, startTime, endTime })
    onModalOpen()
  }

  const onAppointmentSubmit = async (data: IAppointmentForm, isEditing: boolean) => {
    try {
      const { patient, day, startTime, endTime, treatment } = data
      const selectedPatient = patients?.find(({ _id }) => _id === patient?.value)

      const appointment = {
        patient: patient?.value,
        day: dateToYearMonthDay(day as Date),
        startTime,
        endTime,
        treatment,
        name: `${treatment} - ${selectedPatient?.name} ${selectedPatient?.lastNames}`,
      }

      let toastMsg: ToastMessages;

      if (isEditing && selectedAppointmentId) {
        await updateAppointment(selectedAppointmentId, appointment as IAppointment)
        toastMsg = ToastMessages.updateAppointmentSuccess;
      } else {
        await createAppointment(appointment as IAppointment)
        toastMsg = ToastMessages.createAppointmentSuccess;
      }

      toast(getToastMessage(toastMsg))

    } catch (error) {
      console.error(error)
      toast(getToastMessage(ToastMessages.genericError))
    }
    resetAppointmentAction()
  }

  const onAppointmentClick = (event: EventClickArg) => {
    const clickedEvent = event.event._def;
    const clickedAppointment = appointments?.find(({ _id }) => _id === clickedEvent.publicId);
    if (!clickedAppointment) return

    const { patient, day, startTime, endTime, treatment } = clickedAppointment
    const appointmentPatient = patients?.find(({ _id }) => _id === patient)

    const appointmentForm: IAppointmentForm = {
      patient: { label: `${appointmentPatient?.name} ${appointmentPatient?.lastNames}`, value: patient },
      day,
      startTime,
      endTime,
      treatment
    }

    setSelectedAppointment(appointmentForm)
    setSelectedAppointmentId(clickedAppointment._id)
    onModalOpen()
  }

  const onDeleteAppointment = async () => {
    try {

      if (!selectedAppointmentId) return
      await deleteAppointment(selectedAppointmentId)
      toast(getToastMessage(ToastMessages.deleteAppointmentSuccess))

    } catch (error) {
      console.error(error)
      toast(getToastMessage(ToastMessages.genericError))
    }
    resetAppointmentAction()
  }

  const resetAppointmentAction = () => {
    onDeleteDialogClose()
    onModalClose()
    setSelectedAppointment(null)
    setSelectedAppointmentId(null)
    refetch()
  }

  return (
    <>
      <AppointmentCalendar
        onTimeSelect={onTimeSelect}
        onAppointmentClick={onAppointmentClick}
        events={events || []}
      />

      <Modal isOpen={isFormModalOpen} onClose={resetAppointmentAction} closeOnOverlayClick={false}>
        <ModalOverlay />

        <ModalContent>
          <ModalCloseButton />

          <ModalHeader>Agendar hora</ModalHeader>

          <ModalBody>
            <AppointmentForm
              patients={patients || []}
              onSubmit={onAppointmentSubmit}
              onCancel={resetAppointmentAction}
              onDeleteAppointment={onDeleteDialogOpen}
              selectedTime={selectedTime}
              clickedAppointment={selectedAppointment}
            />
          </ModalBody>
        </ModalContent>
      </Modal>

      <Dialog
        isOpen={isDeleteDialogOpen}
        onClose={onDeleteDialogClose}
        title='Eliminar hora'
        text='¿Estás seguro de que quieres eliminar la hora agendada?'
        acceptButtonText='Eliminar'
        cancelButtonText='Cancelar'
        acceptButtonColorScheme='red'
        onAccept={onDeleteAppointment}
      />
    </>
  );
};

export default AppointmentCalendarContainer;