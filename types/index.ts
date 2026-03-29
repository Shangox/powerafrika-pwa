export type TabId = 'feed' | 'tsa' | 'briefs' | 'reborn' | 'councils';

export interface WPArticle {
  id: number;
  date: string;
  link: string;
  title:   { rendered: string };
  excerpt: { rendered: string };
  _embedded?: {
    'wp:featuredmedia'?: Array<{ source_url: string; alt_text: string }>;
  };
}

export interface Signatory {
  name:     string;
  country:  string;
  calling:  string;
  signedAt: string;
}

export interface SignatoryStats {
  total:     number;
  countries: number;
}

export interface TSAModule {
  id:       number;
  stage:    string;
  title:    string;
  subtitle: string;
  price:    string;
  url:      string;
  pages:    string;
}

export interface Brief {
  id:       number;
  tag:      string;
  title:    string;
  subtitle: string;
  price:    string;
  url:      string;
}

export interface Council {
  region: string;
  city:   string;
  email:  string;
  status: 'active' | 'forming';
}