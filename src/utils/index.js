import axios from 'axios';
import { useEffect, useState } from 'react';

export function useCovid19(url, queryParams) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError();
      const data = await axios.get(url, {
        params: queryParams? queryParams: {}
      })
        .then(res => res.data)
        .catch(err => {
          setError(err);
        });
      setStats(data);
      setLoading(false);
	  } 
	  fetchData();
	  let id = setInterval(() => {
		  fetchData();
	  }, 30000);
  
	  return () => {
		  clearInterval(id)
	  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);
  return [
    stats,
    loading,
    error,
  ];
}