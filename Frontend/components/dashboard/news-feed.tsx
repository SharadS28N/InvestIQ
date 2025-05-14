'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

type NewsItem = {
  title: string;
  link: string;
};

const NewsFeed = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const proxyUrl = `/api/proxy?url=${encodeURIComponent('https://www.sharesansar.com/')}`;
        const res = await axios.get(proxyUrl);
        const html = res.data;

        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const articles: NewsItem[] = [];

        doc.querySelectorAll('.card-title a').forEach((a) => {
          const title = a.textContent?.trim() || '';
          const link = a.getAttribute('href') || '';
          if (title && link) {
            articles.push({ title, link: `https://www.sharesansar.com${link}` });
          }
        });

        setNews(articles.slice(0, 6));
      } catch (error) {
        console.error('Failed to fetch news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="space-y-4 p-4">
      {loading ? (
        Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-5 w-full rounded-md" />)
      ) : (
        news.map((item, idx) => (
          <Card key={idx} className="p-3 hover:bg-muted transition-colors">
            <CardContent className="p-0">
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium hover:underline"
              >
                {item.title}
              </a>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default NewsFeed;
