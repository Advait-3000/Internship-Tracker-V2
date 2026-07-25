// Lightweight helper query client wrapper for caching and data fetching utilities
class QueryClient {
  constructor() {
    this.cache = new Map();
  }

  get(key) {
    return this.cache.get(key);
  }

  set(key, data) {
    this.cache.set(key, data);
  }

  clear() {
    this.cache.clear();
  }
}

export const queryClient = new QueryClient();
