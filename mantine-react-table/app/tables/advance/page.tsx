'use client';

import '../../../css/home.css'
import { useMemo, useState } from 'react';
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
  MRT_GlobalFilterTextInput,
  MRT_ToggleFiltersButton,
} from 'mantine-react-table';
import { Box, Button, Flex, Menu, Text, Title, Modal, TextInput, Grid } from '@mantine/core';
import { IconUserCircle, IconSend, IconCalendar } from '@tabler/icons-react';
import { Employee, employeeData } from '@/types/employee';
import { useDisclosure } from '@mantine/hooks';
import { DatePickerInput } from '@mantine/dates';
import { useForm } from '@mantine/form';

export default function AdvanceTable(){

    const [data, setData] = useState<Employee[]>(employeeData);
    const [opened, { open, close }] = useDisclosure(false);

    const form = useForm({
        initialValues:{
            firstName:"",
            lastName:'',
            email:'',
            jobTitle:'',
            salary:0,
            startDate: new Date(),
        },
        
    })

    const columns = useMemo<MRT_ColumnDef<Employee>[]>(()=>[
        {
            id: "employee",
            header:"Employee",
            columns:[
                {
            accessorFn: (row) => `${row.firstName} ${row.lastName}`, //accessorFn used to join multiple data into a single cell
            id: 'name', //id is still required when using accessorFn instead of accessorKey
            header: 'Name',
            size: 250,
            filterVariant: 'autocomplete',
            Cell: ({ renderedCellValue, row }) => (
              <Box
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                }}
              >
                <img
                  alt="avatar"
                  height={30}
                  src={row.original.avatar}
                  style={{ borderRadius: '50%' }}
                />
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },
          {
            accessorKey:"email",
            header:"Email",
            enableClickToCopy: true,
            size:300
            },
            ]
        },
        {
            id:"id",
            header:"Job Info",
            columns:[
                {
                    accessorKey: "salary",
                    header:"Salary",
                    size:200,
                    filterVariant: 'range-slider',
                    mantineFilterRangeSliderProps: {
                    color: 'indigo',
                    label: (value) =>
                        value?.toLocaleString?.('en-US', {
                        style: 'currency',
                        currency: 'INR',
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                        }),
                    },
                    Cell: ({ cell }) => (
                        <Box
                            style={(theme) => ({
                            backgroundColor:
                                cell.getValue<number>() < 50_000
                                ? theme.colors.red[9]
                                : cell.getValue<number>() >= 50_000 &&
                                    cell.getValue<number>() < 75_000
                                ? theme.colors.yellow[9]
                                : theme.colors.green[9],
                            borderRadius: '4px',
                            color: '#fff',
                            maxWidth: '9ch',
                            padding: '4px',
                            })}
                        >
                            {cell.getValue<number>()?.toLocaleString?.('en-US', {
                            style: 'currency',
                            currency: 'INR',
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                            })}
                        </Box>
                        ),
                                
                },
                {
                    accessorKey: 'jobTitle', //hey a simple column for once
                    header: 'Job Title',
                    filterVariant: 'multi-select',
                    size: 350,
                },
                {
                    accessorFn: (row) => {
                    //convert to Date for sorting and filtering
                    const sDay = new Date(row.startDate);
                    sDay.setHours(0, 0, 0, 0); // remove time from date (useful if filter by equals exact date)
                    return sDay;
                    },
                    id: 'startDate',
                    header: 'Start Date',
                    filterVariant: 'date-range',
                    sortingFn: 'datetime',
                    enableColumnFilterModes: false, //keep this as only date-range filter with between inclusive filterFn
                    Cell: ({ cell }) => cell.getValue<Date>()?.toLocaleDateString(), //render Date as a string
                    Header: ({ column }) => <em>{column.columnDef.header}</em>, //custom header markup
                },
                
            ]
        }
       
    ],[])

    const table = useMantineReactTable({
        columns: columns,
        data:data,
        enableRowActions:true,
        enableRowSelection: true,
        enableColumnResizing: true,
        enableFacetedValues:true,
        enableGrouping:true,
        enablePinning:true,
        initialState: {showColumnFilters:true, showGlobalFilter: true},
        paginationDisplayMode: 'pages',
        positionToolbarAlertBanner:'bottom',
        mantinePaginationProps: { radius:'xl', size:'lg'},
        mantineSearchTextInputProps:{
            placeholder: "Search Employees"
        },
        renderDetailPanel: ({row})=>(
            <Box
                style={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                gap: '16px',
                padding: '16px',
                }}
            >
                <img
                alt="avatar"
                height={200}
                src={row.original.avatar}
                style={{ borderRadius: '50%' }}
                />
                <Box style={{ textAlign: 'left' }}>
                    <Text>Signature Catch Phrase</Text>
                <Title>&quot;{row.original.signatureCatchPhrase}&quot;</Title>
                <Text>About the employee</Text>
                </Box>
            </Box>
                ),
                renderRowActionMenuItems : () =>(
                    <>
                    <Menu.Item><IconUserCircle style={{ marginRight: 8 }} />View Profile</Menu.Item>
                    <Menu.Item><IconSend style={{ marginRight: 8 }} />Send Email</Menu.Item>
                    </>
                ),
                
    renderTopToolbar: ({ table }) => {
      const handleDeactivate = () => {
        const selectedRows = table.getSelectedRowModel().flatRows;

        table.getSelectedRowModel().flatRows.map((row) => {
          //alert('deactivating ' + row.getValue('name'));
          if (selectedRows.length === 0) return;
        const idsToRemove = selectedRows.map((r) => r.original.email);
        setData((prev) => prev.filter((row) => !idsToRemove.includes(row.email)));
        });
      };

      const handleActivate = () => {
        open();
      };

      const handleContact = () => {
        table.getSelectedRowModel().flatRows.map((row) => {
          alert('contact ' + row.getValue('name'));
        });
      };

      return (
        <Flex p="md" justify="space-between">
          <Flex gap="xs">
            {/* import MRT sub-components */}
            <MRT_GlobalFilterTextInput table={table} />
            <MRT_ToggleFiltersButton table={table} />
          </Flex>
          <Flex style={{ gap: '8px' }}>
            <Button
              color="red"
              disabled={!table.getIsSomeRowsSelected()}
              onClick={handleDeactivate}
              variant="filled"
            >
              Remove
            </Button>
            <Button
              color="green"
              onClick={handleActivate}
              variant="filled"
            >
              Add
            </Button>
            {/* <Button
              color="blue"
              disabled={!table.getIsSomeRowsSelected()}
              onClick={handleContact}
              variant="filled"
            >
              Contact
            </Button> */}
          </Flex>
        </Flex>
      );
    },
                
    })

    function addUsers (values: {
      firstName: string;
      lastName: string;
      email: string;
      jobTitle: string;
      salary: number;
      startDate: string | Date;
    }){
      const newEmployee:Employee = {
        firstName: values.firstName,
        lastName:values.lastName,
        email:values.email,
        jobTitle:values.jobTitle,
        salary:values.salary,
        startDate: typeof values.startDate === 'string'
          ? values.startDate
          : values.startDate instanceof Date
            ? values.startDate.toISOString()
            : '',
        avatar : 'https://avatar.iran.liara.run/public/39',
        signatureCatchPhrase: "Hello I am "+ values.firstName
      }

      setData([...data,newEmployee]);
      form.reset();
      close();
    }
    return (
        <div className="main">
            <h1>Advance Table</h1>
            <div className="work">
        <MantineReactTable table={table}/>
        <Modal opened={opened} onClose={close} title="Add Employee" centered>
            <form onSubmit={form.onSubmit((values)=> addUsers(values))}>
            <Grid>
                <Grid.Col span={6}>
                            <TextInput label="First Name" placeholder='First Name' withAsterisk 
                            {...form.getInputProps('firstName')}
                            />
                </Grid.Col>
                <Grid.Col span={6}>
                            <TextInput label="Last Name" placeholder='Last Name' withAsterisk
                            {...form.getInputProps('lastName')}
                            />

                </Grid.Col>
                <Grid.Col span={12}>
                            <TextInput label="Email" placeholder='Email' withAsterisk
                            {...form.getInputProps('email')}
                            />
                </Grid.Col>
                <Grid.Col span={6}>
                    <TextInput label="Job Title" placeholder='Job Title' withAsterisk
                    {...form.getInputProps('jobTitle')}
                    />
                </Grid.Col>
                <Grid.Col span={6}>
                    <TextInput label="Salary" placeholder='Salary' withAsterisk
                    {...form.getInputProps('salary')}
                    />
                </Grid.Col>

                <Grid.Col span={12}>
                <DatePickerInput label="Start Date" placeholder='Pick Date' withAsterisk rightSection={<IconCalendar/>}
                {...form.getInputProps('startDate')}
                />
                </Grid.Col>

                <Grid.Col span={12}>
                <Button fullWidth type='submit'>Submit</Button>
                </Grid.Col>
    </Grid>
    </form>


      </Modal>
            </div>
        </div>
    )
}