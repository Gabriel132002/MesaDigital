import { useEffect, useState } from 'react';

function Connection(endpoint) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!endpoint) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`Erro: ${response.statusText}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, error, loading };
}

export default Connection;
