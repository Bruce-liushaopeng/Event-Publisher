import React, { Fragment, useEffect, useState } from "react"
import { getFilteredEvents } from "../../helpers/api-util"
import EventList from "../../components/events/event-list"
import Button from "../../components/ui/button"
import ResultsTitle from "../../components/events/results-title"
import ErrorAlert from "../../components/ui/error-alert"
import {useRouter} from "next/router";
import useSWR from 'swr';

function FilteredEventsPages() {
  const [loadedEvent, setLoadedEvents] = useState();
  const router = useRouter();
  const filterData = router.query.slug

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



  if (!loadedEvent) {
    return <p className="center">Loading...</p>
  }
  console.log(filterData)
  const numYear = +filterData[0]
  const numMonth = +filterData[1]

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
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  )
}

/*
export async function getServerSideProps(context) {
  const { params } = context;
  const filterData = params.slug;

  const numYear = +filterData[0]
  const numMonth = +filterData[1]

  if (
      isNaN(numYear) ||
      isNaN(numMonth) ||
      numYear > 2030 ||
      numYear < 2021 ||
      numMonth < 1 ||
      numMonth > 12
  ) {
    return ({
          props:{
            hasError: true
          }
        }
    )
  }

  const filterdEvent = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  })

  return {
    props: {
      events: filterdEvent,
      date: {
        year: numYear,
        month: numMonth
      }
    }
  }
}
*/



export default FilteredEventsPages
