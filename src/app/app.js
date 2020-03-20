import React, { useState } from 'react';
import Moment from 'react-moment';
import CardList from '../components/card-list';
import { useCovid19 } from '../utils';
import './app.scss';


function App() {
  const [parameter, setParameter] = useState("")
  const [ summary, summarylLoading, summaryError ] = useCovid19('https://corona.lmao.ninja/all')
  let uri = `https://corona.lmao.ninja/countries`
  if(parameter) {
    uri = uri+"/"+parameter
  }

  const [ stats, loading, error ] = useCovid19(uri)
  if (error) return <h1>Error...</h1> 
  let data = !Array.isArray(stats)? [stats] : stats
  console.log(data)
  return (
    <div className="app">
    
      {summary === null ? <h3 className='header-container'>Loading...</h3> :

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
                  <div><strong>Last Update on:</strong> <Moment>{summary.updated}</Moment></div>
                </div>
                
                <div className="actions-container">
                  <div className="actions">
                    <div className="countries">
                      <select  id="countries" onChange={(e)=> setParameter(e.target.value)}>
                        <option selected value='' >all</option>
                          {
                            ['china', 'italy'].map(country=>(
                              <option key={country} value={country}>{country}</option>
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
      }
      {
        stats === null ? <h3 className='container'>Loading...</h3> :
          <div className='container'>
            <CardList stats={data}/>
          </div>
      }
    </div>
  );
}

export default App;
