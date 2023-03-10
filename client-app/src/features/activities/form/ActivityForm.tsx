import React, { ChangeEvent, useState } from 'react'
import { Button, Card, Form, Icon, Image, Segment } from 'semantic-ui-react'
import LoadingComponent from '../../../app/layout/LoadingComponents';
import { Activity } from '../../../app/models/activity';

export interface Props {
    closeForm: () => void,
    activity: Activity | undefined,
    createOrEdit: (activity: Activity) => void;
    submitting: boolean;
}


export default function ActivityForm({closeForm, activity: selectedActivity, createOrEdit, submitting}: Props) {

    const initialState = selectedActivity ?? {
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    }

    const [activity, setActivity] = useState(initialState)

    function handleSubmit() {
        createOrEdit(activity);
    }

    function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        let target = e.target;
        let value = target.value;
        let name = target.name;

        let data: any = {...activity}

        data[name] = value;
        setActivity(data);

    }

    return (
       <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete="off">
                <Form.Input placeholder="Title" value={activity?.title} name="title" onChange={handleChange}/>
                <Form.TextArea placeholder="Description" value={activity?.description} name="description" onChange={handleChange}/>
                <Form.Input placeholder="Category" value={activity?.category} name="category" onChange={handleChange}/>
                <Form.Input type='date' placeholder="Date" value={activity?.date} name="date" onChange={handleChange}/>
                <Form.Input placeholder="City" value={activity?.city} name="city" onChange={handleChange}/>
                <Form.Input placeholder="Venue" value={activity?.venue} name="venue" onChange={handleChange}/>
                <Button loading={submitting} floated='right'positive type='submit' content="Submit"/>
                <Button onClick={closeForm} floated='right' type='button' content="Cancel"/>

            </Form>
       </Segment> 
    
    )

}