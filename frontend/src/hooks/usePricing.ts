import { useEffect, useState } from 'react';

export interface PriceRow {
  id: string;
  service: string;
  price: string;
  sort_order: number;
}

export interface PriceCategory {
  id: string;
  title: string;
  icon: string;
  sort_order: number;
  rows: PriceRow[];
}

interface UsePricingResult {
  categories: PriceCategory[];
  loading: boolean;
  error: boolean;
}

export function usePricing(): UsePricingResult {
  const [categories, setCategories] = useState<PriceCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('/api/pricing')
      .then((r) => r.json())
      .then((data: { categories: PriceCategory[] }) => setCategories(data.categories))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return { categories, loading, error };
}
