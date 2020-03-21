import React from 'react'
import { countryCodes } from '../../app/codes'
import './card-list.scss'

export default function CardList(props) {
	return (
		<>
			{
              props.stats.map((stat, index) => (
                <div className='card' key={index}>
                  <div className="heading">
                    {countryCodes[stat.country.toLowerCase()]&&
                      <img src={`https://www.countryflags.io/${countryCodes[stat.country.toLowerCase()].toLowerCase()}/flat/48.png`} alt="flag"/>

                    }
                    <h3>{stat.country}</h3>
                  </div>
                  <div className="info">
                      <div className="letf-info">
                        <p className='confirmed'><strong>Cases:</strong> <span>{stat.cases}</span> </p>
                        <p className='recovered'><strong>Recovered:</strong> <span>{stat.recovered}</span> </p>
                        <p className='deaths'><strong>Deaths:</strong> <span>{stat.deaths}</span> </p>
                        <p className='active'><strong>Active:</strong> <span>{stat.active}</span> </p>
                      </div>
                      <div className="right-info">
                        <div>Today's</div>
                        <div className="right-info-contents">
                          <p className='cases'><strong>Cases:</strong> <span>{stat.todayCases}</span> </p>
                          <p className='deaths'><strong>Deaths:</strong> <span>{stat.todayDeaths}</span> </p>
                        </div>
                      </div>
                    </div>
                  </div>
              ))
            }
		</>
	)
}
