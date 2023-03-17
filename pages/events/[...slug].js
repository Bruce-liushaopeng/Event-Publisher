import React, { Fragment } from "react"
import { useRouter } from "next/router"
import { getFilteredEvents } from "../../dummy-data"
import EventList from "../../components/events/event-list"
import Button from "../../components/ui/button"
import ResultsTitle from "../../components/events/results-title"
import ErrorAlert from "../../components/ui/error-alert"

function FilteredEventsPages() {
  const router = useRouter()
  const filterData = router.query.slug
  if (!filterData) {
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
    numMonth > 12
  ) {
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

  const filteredEvents = getFilteredEvents({
    year: numYear,
    month: numMonth,
  })

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

export default FilteredEventsPages
