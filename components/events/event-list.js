import EventItem from "./event-item";

function EventList(props) {
    const { items } = props;
    return <ul>
        {items.map(event => <EventItem
            key={event.id} 
            id={event.id}
            title={event.titel}
            location={event.location}
            date={event.date}
            image={event.image}
        />)}
    </ul>
}

export default EventList