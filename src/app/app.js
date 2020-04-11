import React, { useState } from 'react';
import Moment from 'react-moment';
import CardList from '../components/card-list';
import { useCovid19 } from '../utils';
import './app.scss';


function App() {
  const [parameter, setParameter] = useState("")
  // eslint-disable-next-line no-unused-vars
  const [ summary, summarylLoading, summaryError ] = useCovid19('https://corona.lmao.ninja/v2/all')
  // eslint-disable-next-line no-unused-vars
  let [ countries ] = useCovid19('https://corona.lmao.ninja/v2/countries')
  if(countries){
    countries = countries.map(data=> data.country).sort()
  }
  let uri = `https://corona.lmao.ninja/v2/countries`
  if(parameter) {
    uri = uri+"/"+parameter
  }

  // eslint-disable-next-line no-unused-vars
  const [ stats, loading, error ] = useCovid19(uri, parameter? {} : { sort: 'cases'})
  if (summaryError) return <h1>Summary Error...</h1> 
  if (error) return <h1>Error...</h1> 
  let data = !Array.isArray(stats)? [stats] : stats
  
  return (
    <div className="app">
        <div className='header-container'>
          <div className="heading-container">
            <h3 className="heading">Global Coronavirus Realtime Tracker</h3>
            <div className="pulse-container">
                <span className="pulse"></span>
                <span className="text">Live</span>
            </div>
          </div>
            <div className="contents">
              <div className="summary">
                {
                  summary === null ?  <div className="info">
                    <h3 style={{padding: '20px'}}>Loading summary...</h3>
                  </div> : 
                  <>
                    <div className="info">
                      <div>
                        <p className="title">Total Confirmed</p>
                        <p className="data confirmed">{summary.cases}</p>
                      </div>
                      <div>
                        <p className="title">Total Recovered</p>
                        <p className="data recovered">{summary.recovered}</p>
                      </div>
                      <div>
                        <p className="title">Total Deaths</p>
                        <p className="data deaths">{summary.deaths}</p>
                      </div>
                    </div>
                    <div className="update-on"><strong>Last Update on:</strong> <Moment>{summary.updated}</Moment></div>
                  </>
                }
                </div>
                
                <div className="actions-container">
                  <div className="actions">
                    <div className="countries">
                      <p>Select Country</p>
                      <select  id="countries" onChange={(e)=> setParameter(e.target.value)}>
                        <option value='' >All</option>
                          { countries &&
                            countries.map(country=>(
                              <option key={country} value={country.toLowerCase()}>{country}</option>
                            ))
                          }
                      </select>
                    </div>
                    <div className="sort">

                    </div>
                
                  </div>
                </div>
              </div>
            </div>
      {
        stats === null ? <div className="container">
          <h2>Loading...</h2>
      </div>  :
          <div className='container'>
            <CardList stats={data}/>
          </div>
      }
    </div>
  );
}

export default App;
