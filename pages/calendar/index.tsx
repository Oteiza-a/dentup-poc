import Header from "@/components/header/Header";
import Layout from "@/components/layout/Layout";
import { Box } from "@chakra-ui/react";
import dynamic from "next/dynamic";

const AppointmentCalendarContainer = dynamic(
  () => import('@/components/calendar/AppointmentCalendarContainer'),
  { ssr: false }
)

export default function Calendar() {
  return (
    <Layout navbar>
      <Header title="Calendario" subtitle="Agenda las horas del profesional."/>

      <Box mt='6'>
        <AppointmentCalendarContainer />
      </Box>
    </Layout>
  )
}