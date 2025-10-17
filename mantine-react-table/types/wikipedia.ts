// types/wikipedia.ts
export interface WikipediaSearchResult {
  ns: number;
  title: string;
  pageid: number;
  snippet: string;
  timestamp: string;
}

export interface WikipediaSearchResponse {
  batchcomplete: string;
  continue?: Record<string, any>;
  query: {
    search: WikipediaSearchResult[];
  };
}

export interface WikiExtractPage {
  pageid: number;
  title: string;
  extract?: string;
}

export interface WikiDetailPanelProps {
  title: string;
}