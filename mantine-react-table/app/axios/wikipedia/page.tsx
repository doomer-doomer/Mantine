'use client';
import { useQuery } from '@tanstack/react-query';
import '../../../css/home.css';
import { customQuery, fetchPageExtract } from './tanstack';
import { useMemo, useState } from 'react';
import { useDebouncedCallback } from '@mantine/hooks';
import { Button, Container, Loader, Text, TextInput } from '@mantine/core';
import { MantineReactTable, MRT_ColumnDef, useMantineReactTable } from 'mantine-react-table';
import { WikiDetailPanelProps, WikipediaSearchResponse, WikipediaSearchResult, WikiExtractPage } from '@/types/wikipedia';

export default function Wiki() {
  const [search, setSearch] = useState('');
  const [displayText, setDisplayText] = useState('');
  const { data, isPending } = useQuery<WikipediaSearchResponse>(customQuery(search));

  const handleSearch = useDebouncedCallback((query: string) => {
    setSearch(query);
  }, 1000);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayText(event.currentTarget.value);
    handleSearch(event.currentTarget.value);
  };

 function WikiDetailPanel({ title }: WikiDetailPanelProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['wikiDetail', title],
    queryFn: () => fetchPageExtract(title),
    enabled: !!title, // only fetch when we have a title
  });

  if (isLoading) return <Loader size="sm" />;
  if (error) return <Text color="red">Failed to load details.</Text>;

  const extract = data?.extract || 'No extract found.';

  return (
    <div style={{ padding: '0.5rem 0' }}>
      <Text size="sm">{extract}</Text>
    </div>
  );
}


  const results = data?.query?.search || [];

  const columns = useMemo<MRT_ColumnDef<WikipediaSearchResult>[]>(
    ()=>[
        {
            accessorKey: 'pageid',
            header : "Page ID"
        },
        {
            accessorKey: 'title',
            header: "Title",
            Cell: ({cell})=>{
                const title = cell.getValue<string>();
                return <a href={`https://en.wikipedia.org/wiki/${encodeURIComponent(title)}`} target="_blank" rel="noopener noreferrer">{title}</a>
            }
        },
        {
            accessorKey: 'snippet',
            header: 'Snippet',
            Cell: ({ cell }) => (
                <div
                    dangerouslySetInnerHTML={{ __html: cell.getValue<string>() }}
                />
            ),
        },
        {
            accessorKey: 'timestamp',
            header: 'Timestamp'
        }
    ],[]
  )

  const table = useMantineReactTable({
    columns:columns,
    data: results,
    enableColumnActions:true,
    renderDetailPanel: ({row})=>(
        <>
            <Text fw={600} mb={8}>{row.original.title}</Text>
        <WikiDetailPanel title={row.original.title} /> 
        {<Button mt={10} size="xs" 
        component="a" 
        href={`https://en.wikipedia.org/wiki/${encodeURIComponent(row.original.title)}`} 
        target="_blank" 
        rel="noopener noreferrer"
        c={'white'}
        td={'none'}
        > Know More</Button>}
        </>
    )
  })

  return (
    <div className="main">
      <h1>Wikipedia</h1>
      <div className="work">
        <TextInput
        mb={20}
          value={displayText}
          onChange={handleChange}
          placeholder="Search..."
          rightSection={isPending && <Loader size={20} />}
        />

        

        {results.length === 0 && search && !isPending && (
          <Text size="sm" color="dimmed">
            No results found
          </Text>
        )}

        {results.length>0 && <MantineReactTable table={table}/>}


      </div>
    </div>
  );
}
