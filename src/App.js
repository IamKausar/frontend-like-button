import "./styles.css";
import { HeartIcon, SpinnerIcon } from "./component/icons";
import { useState } from "react";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [liked, setLiked] = useState(false);
  const [error, setError] = useState(null);

  const handleLikeClick = async () => {
    if (loading) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://questions.greatfrontend.com/api/questions/like-button",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: liked ? "unlike" : "like",
          }),
        }
      );

      const resData = await response.json();

      if (!response.ok) {
        // Logical failure response
        throw new Error(resData.message);
      }

      setLiked((prev) => !prev);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Like Button</h1>
      <button
        className={`likebtn ${liked ? "liked" : ""}`}
        onClick={handleLikeClick}
        disabled={loading} // for assistive technologies
      >
        {loading ? <SpinnerIcon /> : <HeartIcon />}
        <span>Like</span>
      </button>

      {error && <div className="error-message">{error}</div>}
    </div>
  );
}
