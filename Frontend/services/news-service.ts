import axios from 'axios';
import * as cheerio from 'cheerio';

export interface NewsItem {
  title: string;
  summary: string;
  url: string;
  source: string;
  time: string;
}

function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diff = Math.floor((+now - +date) / 1000);

  if (diff < 60) return `${diff} seconds ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
  return `${Math.floor(diff / 86400)} days ago`;
}

// 🔗 Proxy-based HTML fetcher + site-specific parsers
async function fetchNewsWithProxy(url: string): Promise<NewsItem[]> {
  try {
    const response = await axios.get(`/api/proxy?url=${encodeURIComponent(url)}`);
    const $ = cheerio.load(response.data);
    const newsItems: NewsItem[] = [];

    if (url.includes('merolagani.com')) {
      $('.news-list .media').each((_, element) => {
        const title = $(element).find("h4 a").text().trim();
        const summary = $(element).find("p").text().trim();
        const href = $(element).find("h4 a").attr("href");
        const fullUrl = "https://merolagani.com" + href;
        const time = formatRelativeTime(new Date().toISOString());
        const source = "MeroLagani";

        if (title) {
          newsItems.push({ title, summary, url: fullUrl, time, source });
        }
      });
    }

    return newsItems;
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    return [];
  }
}

// 📡 ShareSansar parser
async function fetchShareSansarNews(): Promise<NewsItem[]> {
  try {
    const response = await axios.get(`/api/proxy?url=${encodeURIComponent('https://www.sharesansar.com/category/latest')}`);
    const $ = cheerio.load(response.data);
    const newsItems: NewsItem[] = [];

    $('.news-listing .single-news').each((_, el) => {
      const title = $(el).find('h2 a').text().trim();
      const url = $(el).find('h2 a').attr('href');
      const summary = $(el).find('p').text().trim();
      const time = formatRelativeTime(new Date().toISOString());
      const source = 'ShareSansar';

      if (title && summary && url) {
        newsItems.push({
          title,
          summary,
          url: `https://www.sharesansar.com${url}`,
          source,
          time,
        });
      }
    });

    return newsItems;
  } catch (error) {
    console.error('Error fetching ShareSansar news:', error);
    return [];
  }
}

// 📡 MeroLagani fetcher (uses generic parser above)
async function fetchMeroLaganiNews(): Promise<NewsItem[]> {
  return fetchNewsWithProxy('https://merolagani.com/NewsList.aspx');
}

// 🏢 Dummy Company Updates
async function fetchCompanyUpdates(): Promise<NewsItem[]> {
  return [
    {
      title: 'NRB issues new monetary policy',
      summary: 'NRB has issued a new monetary policy impacting banks and insurance.',
      url: 'https://nrb.org.np/news',
      source: 'NRB',
      time: formatRelativeTime(new Date().toISOString()),
    },
  ];
}

// 🔗 Aggregate all news
export async function fetchAllNews(): Promise<NewsItem[]> {
  try {
    const [merolaganiNews, sharesansarNews, companyUpdates] = await Promise.all([
      fetchMeroLaganiNews(),
      fetchShareSansarNews(),
      fetchCompanyUpdates(),
    ]);

    const allNews = [...merolaganiNews, ...sharesansarNews, ...companyUpdates];
    return allNews;
  } catch (error) {
    console.error('Error fetching all news:', error);
    return fallbackNewsData;
  }
}

// 🆘 Fallback for offline or dev mode
export const fallbackNewsData: NewsItem[] = [
  {
    title: "NEPSE climbs 15 points",
    summary: "The NEPSE index climbed 15.24 points today amid strong trading activity in the banking sector.",
    url: "https://www.sharesansar.com/",
    source: "ShareSansar",
    time: "2 hours ago",
  },
  {
    title: "Nabil Bank announces dividend",
    summary: "Nabil Bank has proposed a 20% bonus share and 10% cash dividend for FY 2080/81.",
    url: "https://merolagani.com/",
    source: "MeroLagani",
    time: "3 hours ago",
  },
];
