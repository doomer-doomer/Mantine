'use client'
import { useForm } from "@mantine/form"
import { Button, Checkbox, Code, Container, Grid, NumberInput, Select, Space, Text, TextInput } from "@mantine/core"
import { useState } from "react";
import '../../../css/home.css'

export default function UseForm(){

    const [formData,setFormData] = useState({});

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            firstName:'',
            lastName:'',
            email: '',
            jobTitle:'',
            salary:0,
            termsOfService: false,
        },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            salary: (value) => (value < 300000 ? 'Salary should be atleast 3,00,000' : null),
            termsOfService: (value) => (value ? null : 'You must agree to sell your privacy'),
            firstName: (value) => (value.length < 2 ? "First name must have atleast 2 letters" : null),
            lastName: (value) => (value.length < 2 ? "Last name must have atleast 2 letters" : null),
            jobTitle: (value)=> (value ? null : "Select a job to continue"),
        },
    });

    return (
        <div className="main">
            <h1>use-form Hook</h1>
            <div className="work">
                <Container maw={600}>
                    <Text size="lg">Fill out the form below:</Text>
                    <br></br>
                    <form onSubmit={form.onSubmit((values)=>setFormData(values))}>
                        <Grid>
                            <Grid.Col span={6}>
                                <TextInput 
                                    
                                    label="First Name"
                                    placeholder="Enter your firstName"
                                    key={form.key('firstName')}
                                    {...form.getInputProps('firstName')}
                                    />
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <TextInput 
                                    
                                    label="Last Name"
                                    placeholder="Enter your lastName"
                                    key={form.key('lastName')}
                                    {...form.getInputProps('lastName')}
                                    />
                            </Grid.Col>
                            <Grid.Col span={12}>
                                <TextInput 
                                    
                                    label="Email"
                                    placeholder="Enter your email"
                                    key={form.key('email')}
                                    {...form.getInputProps('email')}
                                    />
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <NumberInput
                                thousandSeparator=','
                                label="Salary"
                                placeholder="Enter your salary"
                                key={form.key('salary')}
                                {...form.getInputProps('salary')}
                                prefix="₹"
                                defaultValue={100}
                                mb="md"
                                />
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <Select
                                
                                label="Job Title"
                                placeholder="Pick one"
                                data={['Software Engineer',
                                    'Product Manager',
                                    'Designer',
                                    'Other'
                                ]}
                                key={form.key('jobTitle')}
                                {...form.getInputProps('jobTitle')}
                                />
                            </Grid.Col>
                            <Grid.Col span={12}>
                                <Checkbox
                                        mt="md"
                                        label="I agree to sell my privacy"
                                        key={form.key('termsOfService')}
                                        {...form.getInputProps('termsOfService', { type: 'checkbox' })}
                                    />
                            </Grid.Col>

                           

                            <Grid.Col span={12}>
                                <Button fullWidth type="submit">
                                    Submit
                                </Button>
                            </Grid.Col>
                            
                        </Grid>


                    </form>

                    <Space h={'lg'}/>
                    {<Code block>
                        {JSON.stringify(formData, null,2)}
                    </Code>}
                </Container>
            </div>
        </div>
    )
}