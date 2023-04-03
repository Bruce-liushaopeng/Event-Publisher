import React, { Fragment, useEffect, useState } from "react"
import { getFilteredEvents } from "../../helpers/api-util"
import EventList from "../../components/events/event-list"
import Button from "../../components/ui/button"
import ResultsTitle from "../../components/events/results-title"
import ErrorAlert from "../../components/ui/error-alert"
import {useRouter} from "next/router";
import useSWR from 'swr';
import Head from "next/head";

function FilteredEventsPages() {
  const [loadedEvent, setLoadedEvents] = useState();
  const router = useRouter();
  console.log(router.query.slug) // undefine when the page first time render
  let filterData = router.query.slug
  if (!filterData) {
    console.log("filter data not found")
  }


  const { data, error } = useSWR('https://nextjs-course-7335a-default-rtdb.firebaseio.com/events.json', async (url) => {
    const res = await fetch(url);
    const json = res.json();
    return json;
  })

  useEffect(() => {
    if (data) {
      const events = []
      for (const key in data) {
        events.push({
          id: key,
          ...data[key]
        })
      }
      setLoadedEvents(events);
    }
  }, [data])

  let pageHeadData = (
      <Head>
        <title> Filtered Events </title>
        <meta name="description" content={`A list of filtered events`}/>
      </Head>
  )

  if (!loadedEvent) {
    return (
        <Fragment>
          {pageHeadData}
          <p className="center">Loading...</p>
        </Fragment>

    )
  }

  const numYear = +filterData[0]
  const numMonth = +filterData[1]

   pageHeadData = (
      <Head>
        <title> Filtered Events </title>
        <meta name="description" content={`All events for ${numMonth}/${numYear}`}/>
      </Head>
  )


  if (
      isNaN(numYear) ||
      isNaN(numMonth) ||
      numYear > 2030 ||
      numYear < 2021 ||
      numMonth < 1 ||
      numMonth > 12 ||
      error
  ){
    return (
        <Fragment>
          {pageHeadData}
          <ErrorAlert>
            <p>Invalid filter. Please adjust your value!</p>
            <div className="center">
              <Button link="/events">Show All Events </Button>
            </div>
          </ErrorAlert>
        </Fragment>
    )
  }

  const filteredEvents = loadedEvent.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === numYear && eventDate.getMonth() === numMonth - 1;
  });


  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>
          <p> No events found for the chosen filter !</p>
          <div className="center">
            <Button link="/events">Show All Events </Button>
          </div>
        </ErrorAlert>
      </Fragment>
    )
  }

  const date = new Date(numYear, numMonth - 1)

  return (
    <Fragment>
      {pageHeadData}
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  )
}


/*
export async function getServerSidePropsa(context) {
  return {
    props: {
    }
  }
}
*/




export default FilteredEventsPages
