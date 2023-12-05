import { useEffect, useState } from "react";
import axios from 'axios';
import { xml2json } from './utils/helper';
import CardsList from './components/CardsList'
import Filter from './components/Filter'
import './App.css'

const App = () => {
  const [listOfData, setlistOfData] = useState([]);
  const [listNewsChannel, setlistNewsChannel] = useState([]);
  const [selectedFilterValue, setSelectedFilterValue] = useState("الوكيل الاخباري")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/rss-feed');
        const channels = [];
        response.data.forEach((resp) => {
          if (resp) {
            const parser = new DOMParser();
            const srcDOM = parser.parseFromString(resp, "application/xml");
            const channel = xml2json(srcDOM)?.rss?.channel;
            channels.push(channel);
          }
        });
        const newData = channels.flatMap(channel =>
          channel.item.map(data => ({ image: channel.image, parentTitle: channel.title, ...data }))
        );
        setlistOfData(prevData => ([...newData]));
        setlistNewsChannel(prevData => ([...channels]));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Filter data={listNewsChannel} selectedFilterValue={selectedFilterValue} setSelectedFilterValue={setSelectedFilterValue} />
      <div className="main-content">
        {listOfData.length > 0 && <CardsList data={listOfData} selectedFilterValue={selectedFilterValue} />}
      </div>
    </div>
  )
}

export default App;