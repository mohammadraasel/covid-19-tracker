import { useEffect, useState } from 'react';

export function useCovid19(url) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError();
      const data = await fetch(url)
        .then(res => res.json())
        .catch(err => {
          setError(err);
        });
      setStats(data);
      setLoading(false);
	  } 
	  fetchData();
	  let id = setInterval(() => {
		fetchData();
	  }, 10000);
  
	  return () => {
		clearInterval(id)
	  }
  }, [url]);
  return [
    stats,
    loading,
    error,
  ];
}