import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponents';


function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);



  useEffect(() => {
    agent.Activities.list() 
    .then(response => {
      let activities: Activity[] = [];
      response.forEach(activity => {
        activity.date = activity.date.split('T')[0];
        activities.push(activity);
      })
      setActivities(response);
      setLoading(false);
    })
  }, [])

  function handleSelectActivity(id: string) {
      setSelectedActivity(activities.find((activity: Activity) => activity.id === id ))
  }

  function handleCancelSelectedActivity() {
    setSelectedActivity(undefined)
  }

  function handleFormOpen(id?: string) {
      let action = id ? handleSelectActivity(id) : handleCancelSelectedActivity;
      setEditMode(true) 
  }

  function handleFormClose() {
    setEditMode(false)
  }

  function handleCreateEditActivity(activity: Activity) {
    setSubmitting(true);
    if (activity.id) {
      agent.Activities.update(activity).then(() => {
        setActivities([...activities.filter(x => x.id !== activity.id), activity]);
        setEditMode(false);
        setSelectedActivity(activity);
        setSubmitting(false);
      })
    } else {
      activity.id = uuid();
      agent.Activities.create(activity).then(() => {
        setActivities([...activities, activity]) 
        setEditMode(false);
        setSelectedActivity(activity);
        setSubmitting(false);
      })
    }
  }

  function handleDelete(id: string) {
    setSubmitting(true);
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter(i => i.id !== id)])
      setEditMode(false);
      setSubmitting(false);
      
    })
  }

  if (loading) return <LoadingComponent content="Loading app" />

  return (
    <>
        <NavBar openForm={handleFormOpen}/>
        <Container style={{ marginTop: "7em" }}>
          <ActivityDashboard activities={activities} 
          selectedActivity={selectedActivity && selectedActivity} 
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectedActivity} 
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createEdit={handleCreateEditActivity}
          deleteActivity={handleDelete}
          submitting={submitting}
     
          />
        </Container>
        
    </>
  );
}

export default App;
