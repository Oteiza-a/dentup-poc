import AppointmentCalendar from "@/components/calendar/AppointmentCalendar";
import Layout from "@/components/layout/Layout";
import { Box, Heading, Text } from "@chakra-ui/react";

export default function Calendar() {
  return (
    <Layout navbar>
      <Heading as='h1' size='xl' noOfLines={1}>Calendario</Heading>
      <Text mt='2'>Agenda las horas del profesional</Text>

      <Box mt='8'>
        <AppointmentCalendar />
      </Box>
    </Layout>
  )
}