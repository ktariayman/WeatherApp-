import React , {useEffect , useState , useRef} from 'react';
import axios from 'axios';
import './App.css';
import moment from 'moment';



function App() {
  const [weatherInfo, setWeatherInfo] = useState(null)
  const inputRef = useRef(null)
  const[bgImage , SetBgImage] = useState('https://images.pexels.com/photos/531972/pexels-photo-531972.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260')
  useEffect(()=> {
    fetchWeatherInfo();
  }, [])
  const fetchWeatherInfo = (e) => {
    e?.preventDefault()

    const  options = {
      method: 'GET',
      url: 'https://community-open-weather-map.p.rapidapi.com/weather',
      params: {
        q: inputRef.current.value || "Sfax",
        // q: 'London',
        units: 'metric',
      },
      headers: {
        'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
        'x-rapidapi-key': 'd207c7df04msh685f70a77ddbef8p12b968jsn14210a7ed162'
      }
    };

    const response = axios
    .request(options)
    .then( (response) => {
      console.log(response.data);
      // setWeatherInfo(
      // JSON.parse(response.date.substring(5, response.date.length -1 )) 
      // );
      setWeatherInfo(response.data)
    })
    .catch( (error) =>{
      console.error(error);
    });
  }
  useEffect(() =>{
    determineBackgroundImage();
  },[weatherInfo])
  const determineBackgroundImage = () =>{
    const weather = weatherInfo?.main.temp ;
    if(weather > 0 &&  weather <10) {
      SetBgImage('https://images.pexels.com/photos/573122/pexels-photo-573122.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260')

    }
    if(weather  > 10) {
      SetBgImage(
        'https://images.pexels.com/photos/108941/pexels-photo-108941.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'
        )
    }
    return {BackgroundImage: `url(${bgImage})`}
  }
  return (
    <div className="App" style={{backgroundImage : `url(${bgImage})` , }}>
        <div className="App__container">
        <div className="App__left App__info">
          <h1>Weather App</h1>
          <form>
          <input 
          ref ={inputRef} 
          type='text' 
          placeholder ="Please enter the city name" 
          />
            <button onClick={fetchWeatherInfo} type="submit" className="button">
              show me the Weather

            </button>

          </form>

        </div>
        
       <div className="App__right App__info">
       <h2>{weatherInfo?.name}</h2>
        <h2>{weatherInfo?.main.temp} degree celsius </h2>
          <h3>
              
              {moment().format('MMMM Do YYYY, h:mm:ss a')}
              
          </h3>
       </div>
        </div>
    </div>
  );
}

export default App;
