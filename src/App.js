import { useEffect, useState } from "react";
import axios from 'axios';
import { feeds } from "./config";
import { xml2json } from './utils/helper';
import CardsList from './components/CardsList'
import Filter from './components/Filter'

const App = () => {
  const [listOfData, setlistOfData] = useState();

  useEffect(() => {
    async function fetchData() {
      axios.get(feeds[0].url)
        .then(response => {
          const parser = new DOMParser();
          const srcDOM = parser.parseFromString(response.data, "application/xml");
          setlistOfData(prevData => (xml2json(srcDOM)?.rss?.channel));
        })
        .catch(error => {
          console.log(error);
        });
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>{listOfData?.title}</h1>
      <Filter />
      <CardsList data={listOfData?.item} cardImage={listOfData?.image} />
    </div>
  )
}

export default App;