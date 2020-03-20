import React from 'react'

export default function CardList(props) {
	return (
		<>
			{
              props.stats.map((stat, index) => (
                <div className='card' key={index}>
                  <div className="heading">
                    <h3>{stat.country}</h3>
                  </div>
                  <div className="info">
                    <p className='confirmed'><strong>Confirmed:</strong> <span>{stat.cases}</span> </p>
                    <p className='recovered'><strong>Recovered:</strong> <span>{stat.recovered}</span> </p>
                    <p className='deaths'><strong>Deaths:</strong> <span>{stat.deaths}</span> </p>
                    <p className='active'><strong>Active:</strong> <span>{stat.active}</span> </p>
                  </div>
                </div>
              ))
            }
		</>
	)
}
