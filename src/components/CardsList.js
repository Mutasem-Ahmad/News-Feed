import Card from './Card'
import './CardList.css'

const CardsList = (props) => {
    const filteredData = props.data.filter(feed => {
        return feed.parentTitle === props.selectedFilterValue
    })
    return (
        <div className='card-list'>
            {filteredData.length && filteredData.map(feed => (
                <Card key={feed.guid} feed={feed} image={feed.image} />
            ))}
        </div>
    )
}

export default CardsList