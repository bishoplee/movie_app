export const TMBD_CONFIG = {
  API_KEY: process.env.EXPO_PUBLIC_TMDB_API_KEY,
  BASE_URL: 'https://api.themoviedb.org/3',
  IMAGE_BASE_URL: 'https://image.tmdb.org/t/p/original',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_API_KEY}`
  }
};

export const fetchMovies = async ({ query }: { query: string }) => {
  const endpoint = query
    ? `${TMBD_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}&include_adult=false`
    : `${TMBD_CONFIG.BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;
  
  // console.log('Fetching movies from endpoint:', endpoint);
  //const query = `${endpoint}?api_key=${TMBD_CONFIG.API_KEY}`;
  
  try {
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: TMBD_CONFIG.headers,
    });

    if(!response.ok) {
      // @ts-ignore
      throw new Error('Failed to fetch movies...', response.statusText);
    }

    const data = await response.json();

    // console.log(data);  

    return data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
}
