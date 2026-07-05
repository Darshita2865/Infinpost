import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Loader from '../components/Loader/Loader';
import { searchPosts } from '../services/api';
import './Results.css';

function Results() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q') || '';

  useEffect(() => {
    if (query) {
      handleSearch(query);
    }
  }, [query]);

  const handleSearch = async (searchQuery) => {
    setLoading(true);
    setError('');
    try {
      const data = await searchPosts(searchQuery);
      setResults(data);
    } catch (err) {
      setError('Failed to fetch results. Please try again.');
    }
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="results-page">
        <div className="results-header">
          <h1>Search Results</h1>
          {query && <p>Showing results for: <strong>"{query}"</strong></p>}
        </div>

        {loading ? (
          <Loader />
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : results.length > 0 ? (
          <div className="results-grid">
            {results.map((result) => (
              <div key={result.id} className="result-card">
                <div className={`result-platform platform-${result.platform}`}>
                  {result.platform}
                </div>
                <h3>{result.title}</h3>
                <p>{result.description}</p>
                <a href="#" className="result-link">View Post →</a>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <span>🔍</span>
            <h2>No results found</h2>
            <p>Try adjusting your search terms or try something else.</p>
          </div>
        )}
      </div>
    </>
  );
}

export default Results;