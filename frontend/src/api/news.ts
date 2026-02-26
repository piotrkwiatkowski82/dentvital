import { apiGet } from './client';
import type { NewsDetail, NewsList } from '../types';

export function fetchNews(limit = 3, offset = 0): Promise<NewsList> {
  return apiGet<NewsList>(`/api/news?limit=${limit}&offset=${offset}`);
}

export function fetchNewsDetail(slug: string): Promise<NewsDetail> {
  return apiGet<NewsDetail>(`/api/news/${encodeURIComponent(slug)}`);
}
