import React, { Fragment } from "react"
import { getFilteredEvents } from "../../helpers/api-util"
import EventList from "../../components/events/event-list"
import Button from "../../components/ui/button"
import ResultsTitle from "../../components/events/results-title"
import ErrorAlert from "../../components/ui/error-alert"

function FilteredEventsPages(props) {
  /*const router = useRouter()
  const filterData = router.query.slug
  if (!filterData) {
    return <p className="center">Loading...</p>
  }
  console.log(filterData)
  const numYear = +filterData[0]
  const numMonth = +filterData[1]*/

  if (props.hasError) {
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

  const filteredEvents = props.events;

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
  const numYear = props.date.year;
  const numMonth = props.date.month;

  const date = new Date(numYear, numMonth - 1)

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  )
}

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



export default FilteredEventsPages
