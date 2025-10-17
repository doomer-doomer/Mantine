import { WikiDetailPanelProps, WikiExtractPage, WikipediaSearchResponse } from "@/types/wikipedia";
import { keepPreviousData } from "@tanstack/react-query";
import axios from "axios";

export const customQuery =  (name: string) => {
    return {
        queryKey: ['wiki', name],
        queryFn:async () : Promise<WikipediaSearchResponse | null> => {
            if(name.trim()==="" || name.trim().length<2){
                return null;
            }else{
                return getData(name);
            }
        },
        placeholderData: keepPreviousData
    };
}

const getData = async (name: string): Promise<WikipediaSearchResponse | null> => {
    const response = await axios.get<WikipediaSearchResponse>(
      'https://en.wikipedia.org/w/api.php',
      {
        params: {
          action: 'query',
          list: 'search',
          srsearch: name,
          format: 'json',
          origin: '*',
        },
      }
    );
    console.log(response.data);
    return response.data;
}

export const fetchPageExtract = async (title: string): Promise<WikiExtractPage> => {
  const response = await axios.get('https://en.wikipedia.org/w/api.php', {
    params: {
      action: 'query',
      prop: 'extracts',
      exintro: true,
      explaintext: true,
      titles: title,
      format: 'json',
      origin: '*',
    },
  });

  const pages = response.data?.query?.pages || {};
  const page = Object.values(pages)[0] as WikiExtractPage;
  return page;
};

