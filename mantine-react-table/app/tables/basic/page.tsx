'use client'
import '../../../css/home.css'
import { useMemo } from 'react';
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
} from 'mantine-react-table';
import { Person, data } from './type';

export default function BasicTable(){

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
        data
    })
    return(
        <div className="main">
            <h1>Basic Table</h1>
            <div className='work'>
                <MantineReactTable table={table}/>
            </div>
        </div>
    )
}