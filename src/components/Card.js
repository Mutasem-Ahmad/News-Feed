import './Card.css'

const Card = (props) => {
    console.log(props.feed, 'image')
    return (
        <div id="card">
            <a rel="noreferrer" href={props.feed?.link} target='_blank'>
                <img id="avatar" src={props.image?.url} alt="avatar" />
            </a>
            <div id="info">
                <p id="name">{props.feed.title}</p>
                <p id="activity">{props.feed.description}</p>
            </div>
        </div>
    )
}

export default Card