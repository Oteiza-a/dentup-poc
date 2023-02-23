import AppointmentCalendar from "@/components/calendar/AppointmentCalendar";
import Header from "@/components/header/Header";
import Layout from "@/components/layout/Layout";
import { Box } from "@chakra-ui/react";

export default function Calendar() {
  return (
    <Layout navbar>
      <Header title="Calendario" subtitle="Agenda las horas del profesional."/>

      <Box mt='6'>
        <AppointmentCalendar />
      </Box>
    </Layout>
  )
}