'use client'
import '../../../css/home.css'
import { useMemo } from 'react';
import {
  MantineReactTable,
  MRT_Table,
  useMantineReactTable,
  type MRT_ColumnDef,
} from 'mantine-react-table';
import { Person, data } from './type';
import { useMantineColorScheme } from '@mantine/core';
import clsx from 'clsx';

export default function MinimalTable(){
      const { colorScheme } = useMantineColorScheme();


    const columns = useMemo<MRT_ColumnDef<Person>[]>(
        ()=>[
        {
            accessorKey: 'name.firstName',
            header:"First Name"
        },
        {
        accessorKey: 'name.lastName',
        header: 'Last Name',
        },
        {
            accessorKey: 'address', //normal accessorKey
            header: 'Address',
        },
        {
            accessorKey: 'city',
            header: 'City',
        },
        {
            accessorKey: 'state',
            header: 'State',
        },
    
    ],[])

    const table = useMantineReactTable({
        columns,
        data,
        enableColumnActions: false,
        enableColumnFilters: false,
        enablePagination: false,
        enableSorting: false,
        mantineTableProps: {
        highlightOnHover: false,
        striped: 'odd',
        withColumnBorders: true,
        withRowBorders: true,
        withTableBorder: true,
        },
    })
    return(
        <div className="main">
            <h1>Minimal Table</h1>
            <div className='work'>
                <MRT_Table table={table}/>
            </div>
        </div>
    )
}