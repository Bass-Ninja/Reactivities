import React from 'react'
import { Button, Card, Grid, Item, ItemContent, Label, List, Segment } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity';

interface Props {
    activities: Activity[];
  }

export default function ActivityList(props: Props) {
    return (
        <Segment>
                <Item.Group divided>
                    {props.activities.map(activity => (
                        <Item key={activity.id}>
                            <Item.Content>
                                <Item.Header as="a">
                                    {activity.title}
                                </Item.Header>
                                <Item.Meta>
                                    {activity.date}
                                </Item.Meta>
                                <Item.Description>
                                    <div>{activity.description}</div>
                                    <div>{activity.city}, {activity.venue}</div>
                                </Item.Description>
                                <Item.Extra>
                                    <Button floated="right" content="View" color="blue"/>
                                    <Label basic content={activity.category}/>
                                </Item.Extra>
                            </Item.Content>
                            
                        </Item>
                    ))}
                </Item.Group>
                
        </Segment>
        

    )

}