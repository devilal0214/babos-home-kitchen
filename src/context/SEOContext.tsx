import React, { createContext, useContext, useEffect, useState } from 'react';
import { api, SeoSetting } from '../services/api';

interface SEOContextValue {
  settings: SeoSetting[];
  loading: boolean;
  refresh: () => void;
}

const SEOContext = createContext<SEOContextValue>({ settings: [], loading: true, refresh: () => {} });

export function SEOProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<SeoSetting[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    api.getSeoSettings()
      .then(setSettings)
      .catch(() => {}) // fail silently — defaults will be used
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  return (
    <SEOContext.Provider value={{ settings, loading, refresh: load }}>
      {children}
    </SEOContext.Provider>
  );
}

export function useSEO() {
  return useContext(SEOContext);
}
