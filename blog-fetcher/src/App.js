import React, { useEffect, useState } from 'react';

function App() {
  // State to hold the fetched posts and any error message
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  // useEffect to handle side effects, specifically fetching data when the component mounts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Fetching blog posts from the API
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');

        // Checks if the response is OK 
        if (!response.ok) {
          throw new Error('Failed to fetch posts'); // Throws an error in the event the response is not ok
        }

        // Parse the response data as JSON
        const data = await response.json();
        
        // Update the posts state with the fetched data
        setPosts(data);
      } catch (err) {
        // Catch any errors that occur during fetching and set the error message
        setError('Data fetching failed'); //  Printing error message
      }
    };

    fetchPosts(); // Call the fetchPosts function to initiate the API request
  }, []); // Empty dependency array means this runs only once when the component mounts

  // If there's an error, display the error message
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Render the list of blog posts
  return (
    <div>
      <h1>Blog Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <span className="post-number">{post.id}</span>
            <div className="post-content">
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

