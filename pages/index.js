import EventList from "../components/events/event-list";
import { getFeaturedEvents } from "../helpers/api-util"

function HomePage(props) {
  return (
    <div>
      <EventList items={props.featuredEvents} />
    </div>
  )
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      featuredEvents: featuredEvents
    },
    revalidate: 1800 // half an hour, rerender on server.
  }
}

export default HomePage

