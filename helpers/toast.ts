import { ToastMessages } from "@/enums/ToastMessages";
import { useToast, UseToastOptions } from "@chakra-ui/react"

type messagesDict = { [key in ToastMessages]: UseToastOptions }

const messages: messagesDict = {
  [ToastMessages.createPatientSuccess]: {
    title: 'Registro exitoso.',
    description: "Se ha registrado al paciente exitosamente,",
    status: 'success',
    duration: 7000,
    isClosable: true,
  },
  [ToastMessages.createPatientError]: {
    title: 'Ha ocurrido un problema.',
    description: "No se ha podido registrar al paciente, inténtelo nuevamente.",
    status: 'error',
    duration: 7000,
    isClosable: true,
  },
  [ToastMessages.updatePatientSuccess]: {
    title: 'Actualización exitosa.',
    description: "Se han guardado los datos del paciente exitosamente.",
    status: 'success',
    duration: 7000,
    isClosable: true,
  },
  [ToastMessages.deletePatientSuccess]: {
    title: 'Eliminación exitosa.',
    description: "Se ha eliminado el paciente exitosamente.",
    status: 'success',
    duration: 7000,
    isClosable: true,
  },
  [ToastMessages.deletePatientError]: {
    title: 'Ha ocurrido un problema.',
    description: "No se ha podido eliminar al paciente, inténtelo nuevamente.",
    status: 'error',
    duration: 7000,
    isClosable: true,
  },
  [ToastMessages.createAppointmentSuccess]: {
    title: 'Hora agendada.',
    description: "Se ha agendado la hora exitosamente.",
    status: 'success',
    duration: 7000,
    isClosable: true,
  },
  [ToastMessages.createAppointmentError]: {
    title: 'Ha ocurrido un problema.',
    description: "Ha ocurrido un problema al agendar la hora, inténtelo nuevamente.",
    status: 'error',
    duration: 7000,
    isClosable: true,
  },
  [ToastMessages.updateAppointmentSuccess]: {
    title: 'Actualización exitosa.',
    description: "Se ha actualizado la información de la hora exitosamente.",
    status: 'success',
    duration: 7000,
    isClosable: true,
  },
  [ToastMessages.updateAppointmentError]: {
    title: 'Ha ocurrido un problema.',
    description: "Ha ocurrido un problema al actualizar la hora, inténtelo nuevamente.",
    status: 'error',
    duration: 7000,
    isClosable: true,
  },
  [ToastMessages.deleteAppointmentSuccess]: {
    title: 'Actualización exitosa.',
    description: "Se ha eliminado la hora exitosamente.",
    status: 'success',
    duration: 7000,
    isClosable: true,
  },
  [ToastMessages.genericError]: {
    title: 'Ha ocurrido un problema.',
    description: "Ha ocurrido un problema, inténtelo nuevamente.",
    status: 'error',
    duration: 7000,
    isClosable: true,
  },
}

export const getToastMessage = (message: ToastMessages): UseToastOptions => {
  const selectedMessage: UseToastOptions = messages[message];
  return selectedMessage
}