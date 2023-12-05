import './Filter.css'

const Filter = (props) => {
    const newsFilterHandler = ($event) => {
        props.setSelectedFilterValue($event.target.value)
    }

    return (
        <div className='checkbox-container'>
            {props.data &&
                <select onChange={newsFilterHandler} className='select-input' value={props.selectedFilterValue}>
                    {props.data.map(feed => (
                        <option key={feed.title} value={feed.title}>
                            {feed.title}
                        </option>
                    ))}
                </select>
            }
        </div>
    )
}

export default Filter