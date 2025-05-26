import puppeteer from "puppeteer";

export interface MeroShareCredentials {
  boid: string;
  password: string;
  dpId: string;
}

export interface MeroShareUser {
  full_name: string;
  boid: string;
  dp_id: string;
  linked_bank: string;
  kyc_status: string;
}

export interface MeroShareHolding {
  company: string;
  quantity: number;
  purchase_price?: number;
  market_price?: number;
  gain?: number;
  gain_percent?: number;
  recommendation?: string;
  notes?: string[];
}

export interface MeroShareIPO {
  company: string;
  units_applied: number;
  units_allotted: number;
  status: string;
  refund_status: string;
}

export interface MeroSharePortfolio {
  total_investment: number;
  current_value: number;
  net_gain: number;
  gain_percent: number;
  holdings: MeroShareHolding[];
}

export interface MeroShareResponse {
  user: MeroShareUser;
  portfolio: MeroSharePortfolio;
  ipos: MeroShareIPO[];
}

export async function fetchMeroShareData({ boid, password, dpId }: MeroShareCredentials): Promise<MeroShareResponse> {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  try {
    // STEP 1: Go to login page and fetch CSRF token
    await page.goto("https://meroshare.cdsc.com.np/#/login", { waitUntil: "networkidle2" });
    // Wait for login form
    await page.waitForSelector("input[name='username']");
    // Fill login form
    await page.type("input[name='username']", boid);
    await page.type("input[name='password']", password);
    await page.select("select[name='dpId']", dpId);
    await page.click("button[type='submit']");
    // Wait for dashboard
    await page.waitForNavigation({ waitUntil: "networkidle2" });
    // STEP 2: Fetch account summary
    await page.goto("https://meroshare.cdsc.com.np/#/dashboard", { waitUntil: "networkidle2" });
    await page.waitForSelector(".user-name");
    const user: MeroShareUser = await page.evaluate(() => {
      const full_name = document.querySelector('.user-name')?.textContent?.trim() || '';
      const boid = document.querySelector('.boid')?.textContent?.trim() || '';
      const dp_id = document.querySelector('.dp-id')?.textContent?.trim() || '';
      const linked_bank = document.querySelector('.bank-name')?.textContent?.trim() || '';
      const kyc_status = document.querySelector('.kyc-status')?.textContent?.trim() || '';
      return { full_name, boid, dp_id, linked_bank, kyc_status };
    });

    // STEP 3: Fetch shareholdings
    await page.goto("https://meroshare.cdsc.com.np/#/my-share", { waitUntil: "networkidle2" });
    await page.waitForSelector("table");
    const holdings: MeroShareHolding[] = await page.evaluate(() => {
      const rows = Array.from(document.querySelectorAll('table tbody tr'));
      return rows.map(row => {
        const cells = row.querySelectorAll('td');
        return {
          company: cells[1]?.textContent?.trim() || '',
          quantity: Number(cells[2]?.textContent?.replace(/,/g, '') || '0'),
          purchase_price: Number(cells[3]?.textContent?.replace(/,/g, '') || '0'),
          market_price: Number(cells[4]?.textContent?.replace(/,/g, '') || '0'),
        };
      });
    });

    // STEP 4: Fetch IPO/FPO application history
    await page.goto("https://meroshare.cdsc.com.np/#/my-ipo", { waitUntil: "networkidle2" });
    await page.waitForSelector("table");
    const ipos: MeroShareIPO[] = await page.evaluate(() => {
      const rows = Array.from(document.querySelectorAll('table tbody tr'));
      return rows.map(row => {
        const cells = row.querySelectorAll('td');
        return {
          company: cells[1]?.textContent?.trim() || '',
          units_applied: Number(cells[2]?.textContent?.replace(/,/g, '') || '0'),
          units_allotted: Number(cells[3]?.textContent?.replace(/,/g, '') || '0'),
          status: cells[4]?.textContent?.trim() || '',
          refund_status: cells[5]?.textContent?.trim() || ''
        };
      });
    });

    // STEP 5: Fetch dividend status
    await page.goto("https://meroshare.cdsc.com.np/#/my-dividends", { waitUntil: "networkidle2" });
    await page.waitForSelector("table");
    // For now, dividend data is not included in the response, but you can extend this as needed.

    // STEP 6: Calculate portfolio analytics
    let total_investment = 0;
    let current_value = 0;
    holdings.forEach(h => {
      total_investment += (h.purchase_price || 0) * h.quantity;
      current_value += (h.market_price || 0) * h.quantity;
    });
    const net_gain = current_value - total_investment;
    const gain_percent = total_investment > 0 ? (net_gain / total_investment) * 100 : 0;
    const portfolio: MeroSharePortfolio = {
      total_investment,
      current_value,
      net_gain,
      gain_percent,
      holdings
    };

    return {
      user,
      portfolio,
      ipos
    }
  } finally {
    await browser.close();
  }
}