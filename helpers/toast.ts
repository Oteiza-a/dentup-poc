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
    status: 'success',
    duration: 7000,
    isClosable: true,
  },
}

export const getToastMessage = (message: ToastMessages): UseToastOptions => {
  const selectedMessage: UseToastOptions = messages[message];
  return selectedMessage
}