import Navbar from "../components/Navbar/Navbar";
import SearchBar from "../components/SearchBar/SearchBar";
import TrendingSearches from "../components/TrendingSearches/TrendingSearches";
import "./Home.css";

function Home() {
  return (
    <>
      <Navbar />
      <section className="hero">
        <div className="colorful-shapes">
          <div className="shape shape1"></div>
          <div className="shape shape2"></div>
          <div className="shape shape3"></div>
          <div className="shape shape4"></div>
        </div>

        <div className="hero-content">
          <span className="badge">🚀 AI Powered</span>
          <h1>InfinPost</h1>
          <h2>Smart Social Media Aggregator</h2>
          <p>
            Discover, search, and analyze posts from Instagram, LinkedIn, 
            and Facebook using the power of AI.
          </p>
          <SearchBar />
          <TrendingSearches />
        </div>
      </section>
    </>
  );
}

export default Home;