import React from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { DateSelectArg, EventClickArg, EventSourceInput } from '@fullcalendar/core';
import { Box } from '@chakra-ui/react';

interface Props extends React.PropsWithChildren {
  onTimeSelect: (selectionInfo: DateSelectArg) => any
  onAppointmentClick: (event: EventClickArg) => any
  events: EventSourceInput
}

const events = [
  { title: 'Meeting', start: new Date() }
]

const timesViewOptions: any = {
  slotDuration: '00:10:00',
  slotLabelInterval: '00:10:00',
  slotMinTime: '08:00:00',
  slotLabelFormat: {
    hour: '2-digit',
    minute: '2-digit',
    omitZeroMinute: false,
    meridiem: 'short'
  },
  titleFormat: { // will produce something like "Tuesday, September 18, 2018"
    month: 'long',
    // year: 'numeric',
    // weekday: 'long'
    day: 'numeric',
  }
}

const AppointmentCalendar: React.FC<Props> = ({ onTimeSelect, events, onAppointmentClick }) => {
  return (
    <FullCalendar
      locale='es-cl'
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView='timeGridWeekMins'
      headerToolbar={{
        left: 'dayGridMonth,timeGridWeekMins,timeGridDayMins',
        center: 'title',
        right: 'today prev,next',
      }}
      // editable={true}
      selectable={true}
      selectMirror={true}
      buttonText={{
        today:    'Ir a día actual',
        month:    'Mes',
        week:     'Semana',
        day:      'Día',
        list:     'Lista'
      }}
      allDaySlot={false}
      views={{
        timeGridWeekMins: {
          type: 'timeGridWeek',
          ...timesViewOptions,

        },
        timeGridDayMins: {
          type: 'timeGridDay',
          ...timesViewOptions,
        },
      }}
      weekends={true}
      events={events}
      eventContent={renderEventContent}
      eventColor={'#4299e1'}
      select={onTimeSelect}
      eventClick={onAppointmentClick}
    />
  );
};


function renderEventContent(eventInfo: { timeText: string, event: any }) {
  return (
    <Box cursor='pointer'>
      <b>{eventInfo.timeText}</b>
      <br />
      <i>{eventInfo.event.title}</i>
    </Box>
  )
}


export default AppointmentCalendar;