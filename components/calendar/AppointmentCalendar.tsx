import React from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

interface Props extends React.PropsWithChildren {}

const events = [
  { title: 'Meeting', start: new Date() }
]

const AppointmentCalendar: React.FC<Props> = ({}) => {
  return (
    <>
      <FullCalendar
        locale='es-cl'
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView='timeGridWeek'
        headerToolbar={{
          left: 'dayGridMonth,timeGridWeek,timeGridDay',
          center: 'title',
          right: 'today prev,next',
        }}
        editable={true}
        selectable={true}
        selectMirror={true}
        buttonText={{
          today:    'Hoy',
          month:    'Mes',
          week:     'Semana',
          day:      'Día',
          list:     'Lista'
        }}
        
        weekends={true}
        events={events}
        eventContent={renderEventContent}
        eventColor='#9F7AEA'
      />
    </>
  );
};


function renderEventContent(eventInfo: { timeText: string, event: any }) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}


export default AppointmentCalendar;