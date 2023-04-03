import React, { Fragment } from 'react'
import EventList from '../../components/events/event-list'
import EventsSearch from '../../components/events/events-search'
import { getAllEvents } from "../../helpers/api-util";
import Head from "next/head";


function AllEventsPage(props) {
  const events = props.events;
  return (
    <Fragment>
        <Head>
            <title> NextJs Events </title>
            <meta name="description" content="find a lot of great events here" />
        </Head>
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