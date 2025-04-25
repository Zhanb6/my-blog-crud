import axios from 'axios';
import { delay } from './blogApi';

export interface ExternalPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

/**
 * Запрашивает посты с jsonplaceholder и возвращает данные + общий count
 */
export async function fetchExternalPosts(
  page = 1,
  pageSize = 10
): Promise<{ data: ExternalPost[]; total: number }> {
  await delay(); // 500 мс искусственной задержки
  const response = await axios.get<ExternalPost[]>(
    'https://jsonplaceholder.typicode.com/posts',
    {
      params: { _page: page, _limit: pageSize },
    }
  );
  const total = parseInt(response.headers['x-total-count'] as string, 10) || 0;
  return { data: response.data, total };
}
