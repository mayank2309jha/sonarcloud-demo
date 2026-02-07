import React, { useEffect, useState } from "react";

export default function One() {
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  // ❌ Hardcoded secret (INTENTIONAL BUG)
  const NEWS_API_KEY = "62292a5ab8cb4cff91e6b821ee62b797";
  var url = `https://newsapi.org/v2/everything?q=bitcoin&apiKey=${NEWS_API_KEY}`;
  var req = new Request(url);
  useEffect(() => {
    fetch(req)
      .then((res) => res.json())
      .then((data) => {
        setNews(data);
        console.log(data.articles);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching news:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="component">
      <h2>Bitcoin News</h2>
      {loading ? (
        <p>Loading...</p>
      ) : news?.articles ? (
        <div>
          <p>Total articles: {news.totalResults}</p>
          {news.articles.slice(0, 2).map((article, index) => (
            <div key={index} style={{ marginBottom: "15px" }}>
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                Read more
              </a>
            </div>
          ))}
        </div>
      ) : (
        <p>No news available</p>
      )}
    </div>
  );
}
