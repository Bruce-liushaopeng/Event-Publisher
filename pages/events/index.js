import React, { Fragment } from 'react'
import EventList from '../../components/events/event-list'
import EventsSearch from '../../components/events/events-search'
import { getAllEvents } from "../../helpers/api-util";


function AllEventsPage(props) {
  const events = props.events;
  return (
    <Fragment>
      <EventsSearch/>
      <EventList items={events} />
    </Fragment>
  )
}

export async function getStaticProps(context) {
    const events = await getAllEvents();

    return {
        props: {
            events: events
        },
        revalidate: 60
    }
}

export default AllEventsPage