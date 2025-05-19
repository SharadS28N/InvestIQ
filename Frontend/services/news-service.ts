// services/news-service.ts
import axios from 'axios';
import * as cheerio from 'cheerio';

export interface NewsItem {
  title: string;
  summary: string;
  url: string;
  source: string;
  time: string;
  category: string;
}

function formatRelativeTime(published: Date): string {
  const now = new Date();
  const diff = Math.floor((+now - +published) / 1000);
  if (diff < 60) return `${diff} seconds ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
  return `${Math.floor(diff / 86400)} days ago`;
}

function categorize(title: string): string {
  const t = title.toLowerCase();
  if (t.includes('bank')) return 'Banking';
  if (t.includes('insurance')) return 'Insurance';
  if (t.includes('ipo')) return 'IPO';
  if (t.includes('dividend') || t.includes('bonus')) return 'Dividend';
  return 'General';
}

export async function fetchShareSansarNews(): Promise<NewsItem[]> {
  try {
    const url = 'https://www.sharesansar.com/category/latest';
    const res = await axios.get(`/api/proxy?url=${encodeURIComponent(url)}`);
    const $ = cheerio.load(res.data);
    const items: NewsItem[] = [];

    $('.featured-news-list.margin-bottom-15').each((_, el) => {
      const title = $(el).find('.featured-news-title').text().trim();
      const link = $(el).find('.col-md-10.col-sm-10.col-xs-12 > a').attr('href');
      const summary = ""; // No summary in new structure
      const fullUrl = link ? `https://www.sharesansar.com${link}` : '';
      const time = $(el).find('span.text-org').text().trim();

      if (title && link) {
        items.push({
          title,
          summary,
          url: fullUrl,
          source: 'ShareSansar',
          time,
          category: categorize(title),
        });
      }
    });

    return items;
  } catch (err) {
    console.error('Failed to fetch ShareSansar news', err);
    return [];
  }
}

export async function fetchMeroLaganiNews(): Promise<NewsItem[]> {
  try {
    const url = 'https://merolagani.com/NewsList.aspx';
    const res = await axios.get(`/api/proxy?url=${encodeURIComponent(url)}`);
    const $ = cheerio.load(res.data);
    const items: NewsItem[] = [];

    $('.news-list .media').each((_, el) => {
      const title = $(el).find('h4 a').text().trim();
      const link = $(el).find('h4 a').attr('href');
      const summary = $(el).find('p').text().trim();
      const fullUrl = `https://merolagani.com${link}`;
      const time = formatRelativeTime(new Date()); // Optional: extract actual time if available

      if (title && link) {
        items.push({
          title,
          summary,
          url: fullUrl,
          source: 'MeroLagani',
          time,
          category: categorize(title),
        });
      }
    });

    return items;
  } catch (err) {
    console.error('Failed to fetch MeroLagani news', err);
    return [];
  }
}

export async function fetchAllNews(): Promise<NewsItem[]> {
  const [ss, ml] = await Promise.all([
    fetchShareSansarNews(),
    fetchMeroLaganiNews(),
  ]);

  const combined = [...ss, ...ml];
  return combined.sort((a, b) => b.time.localeCompare(a.time)); // Sort by time if you store real timestamps later
}
