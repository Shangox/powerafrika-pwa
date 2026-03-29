import axios from 'axios';

const WP_API = process.env.WP_API_URL || 'https://powerafrika.com/wp-json/wp/v2';

export async function fetchArticles(page = 1, perPage = 6) {
  const res = await axios.get(`${WP_API}/posts`, {
    params: { page, per_page: perPage, _embed: true },
  });
  return {
    articles: res.data,
    totalPages: parseInt(res.headers['x-wp-totalpages']),
    total: parseInt(res.headers['x-wp-total']),
  };
}