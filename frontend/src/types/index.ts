// Booking
export interface BookingCreate {
  service: string;
  date: string;
  time: string;
  name: string;
  phone: string;
  email?: string;
}

export interface BookingResponse {
  id: string;
  service: string;
  date: string;
  time: string;
  name: string;
  phone: string;
  email: string | null;
  status: string;
  created_at: string;
}

// Contact
export interface ContactCreate {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export interface ContactResponse {
  id: string;
  message: string;
  created_at: string;
}

// News
export interface NewsItem {
  slug: string;
  title: string;
  excerpt: string;
  published_at: string;
}

export interface NewsDetail extends NewsItem {
  id: string;
  content: string;
}

export interface NewsList {
  items: NewsItem[];
  total: number;
}

// API
export interface ApiError {
  detail: string | { msg: string; type: string }[];
}
