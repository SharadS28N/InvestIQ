import axios from 'axios';
import * as cheerio from 'cheerio';

export interface NewsItem {
  title: string;
  source: string;
  time: string;
  summary: string;
  url?: string;
}

export interface NewsData {
  market: NewsItem[];
  company: NewsItem[];
  economy: NewsItem[];
}

// Function to format relative time
const formatRelativeTime = (dateString: string): string => {
  const now = new Date();
  const date = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return 'Just now';
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  } else if (diffInSeconds < 172800) {
    return 'Yesterday';
  } else {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  }
};

// Fetch news from ShareSansar
async function fetchShareSansarNews(): Promise<NewsItem[]> {
  return fetchNewsWithProxy('https://www.sharesansar.com/category/latest');
}

// Fetch news from MeroLagani
async function fetchMeroLaganiNews(): Promise<NewsItem[]> {
  return fetchNewsWithProxy('https://merolagani.com/NewsList.aspx');
}

// Fetch news from ShareKakura
async function fetchShareKakuraNews(): Promise<NewsItem[]> {
  return fetchNewsWithProxy('https://sharekakura.com/news');
}

// Fetch all news and categorize them
async function fetchNewsWithProxy(url: string): Promise<NewsItem[]> {
  try {
    const response = await axios.get(`/proxy?url=${encodeURIComponent(url)}`);
    const $ = cheerio.load(response.data);
    const newsItems: NewsItem[] = [];

    // Parsing logic here

    return newsItems;
  } catch (error: any) {
    console.error('Error fetching news:', error);
    if (error.response && error.response.status === 404) {
      console.error('Resource not found:', url);
    } else if (error.response && error.response.status === 500) {
      console.error('Server error:', url);
    } else {
      console.error('Error fetching news:', error);
    }
    return [];
  }
}

// Enhance error handling in fetchAllNews
async function fetchNepseNews(): Promise<NewsItem[]> {
  return fetchNewsWithProxy('http://apinepse.herokuapp.com/');
}

async function fetchCompanyUpdates(): Promise<NewsItem[]> {
  return fetchNewsWithProxy('https://npstocks.com/');
}

export async function fetchAllNews(): Promise<NewsData> {
  try {
    const [nepseNews, companyUpdates] = await Promise.all([
      fetchNepseNews(),
      fetchCompanyUpdates()
    ]);

    const allNews = [...nepseNews, ...companyUpdates];

    const marketNews = allNews.filter(news =>
      news.title.toLowerCase().includes('market') ||
      news.title.toLowerCase().includes('nepse') ||
      news.title.toLowerCase().includes('index') ||
      news.title.toLowerCase().includes('trading')
    );

    const companyNews = allNews.filter(news =>
      news.title.toLowerCase().includes('bank') ||
      news.title.toLowerCase().includes('hydropower') ||
      news.title.toLowerCase().includes('dividend') ||
      news.title.toLowerCase().includes('bonus') ||
      news.title.toLowerCase().includes('right share')
    );

    const economyNews = allNews.filter(news =>
      news.title.toLowerCase().includes('economy') ||
      news.title.toLowerCase().includes('inflation') ||
      news.title.toLowerCase().includes('gdp') ||
      news.title.toLowerCase().includes('policy') ||
      news.title.toLowerCase().includes('nrb')
    );

    const uncategorizedNews = allNews.filter(news =>
      !marketNews.includes(news) &&
      !companyNews.includes(news) &&
      !economyNews.includes(news)
    );

    return {
      market: [...marketNews, ...uncategorizedNews].slice(0, 5),
      company: companyNews.slice(0, 5),
      economy: economyNews.slice(0, 5)
    };
  } catch (error) {
    console.error('Error fetching all news:', error);
    return fallbackNewsData;
  }
}

// Fallback news data in case API calls fail
export const fallbackNewsData: NewsData = {
  market: [
    {
      title: "NEPSE Gains 15 Points as Banking Stocks Rally",
      source: "ShareSansar",
      time: "2 hours ago",
      summary: "The Nepal Stock Exchange gained 15 points today as banking stocks rallied following positive Q2 results from major banks.",
    },
    {
      title: "NRB Announces New Monetary Policy",
      source: "MeroLagani",
      time: "5 hours ago",
      summary: "Nepal Rastra Bank announced new monetary policy affecting banking sector. Interest rate corridor to be maintained.",
    },
    {
      title: "Hydropower Stocks Surge on Electricity Export News",
      source: "NEPSE News",
      time: "Yesterday",
      summary: "Hydropower stocks surged following news of increased electricity export to India. Upper Tamakoshi leads gains.",
    },
  ],
  company: [
    {
      title: "Nabil Bank Announces 20% Dividend",
      source: "Nabil Bank",
      time: "3 hours ago",
      summary: "Nabil Bank Limited has announced 15% cash dividend and 5% bonus shares for the fiscal year 2080/81.",
    },
    {
      title: "NIC Asia Expands Digital Banking Services",
      source: "NIC Asia",
      time: "Yesterday",
      summary: "NIC Asia Bank has launched new digital banking services targeting younger customers with enhanced mobile features.",
    },
    {
      title: "Chilime Hydropower Reports Record Generation",
      source: "Chilime",
      time: "2 days ago",
      summary: "Chilime Hydropower reported record electricity generation in the last quarter due to favorable weather conditions.",
    },
  ],
  economy: [
    {
      title: "Nepal's GDP Growth Projected at 4.5%",
      source: "Ministry of Finance",
      time: "1 day ago",
      summary: "The Ministry of Finance has projected Nepal's GDP growth at 4.5% for the current fiscal year, lower than previous estimates.",
    },
    {
      title: "Inflation Rises to 6.8% in Urban Areas",
      source: "Nepal Rastra Bank",
      time: "3 days ago",
      summary: "Nepal Rastra Bank reports inflation has risen to 6.8% in urban areas, primarily driven by food and fuel prices.",
    },
    {
      title: "Foreign Investment in Nepal Increases by 15%",
      source: "Department of Industry",
      time: "4 days ago",
      summary: "Foreign direct investment in Nepal has increased by 15% in the first half of the current fiscal year compared to last year.",
    },
  ],
};