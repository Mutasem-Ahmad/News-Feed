import Card from './Card'
import './CardList.css'

const CardsList = (props) => {
    return (
        <div className='card-list'>
            {props?.data?.length && props?.data?.map(feed => (
                <Card key={feed.guid} feed={feed} image={props?.cardImage} />
            ))}
        </div>
    )
}

export default CardsList