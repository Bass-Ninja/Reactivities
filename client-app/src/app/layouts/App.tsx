import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';


function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);


  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5001/api/activities') 
    .then(response => {
      setActivities(response.data);
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
    
    activity.id ? setActivities([...activities.filter(x => x.id !== activity.id), activity]) : setActivities([...activities, {...activity, id: uuid()}])
    setEditMode(false);
    setSelectedActivity(activity);
  }

  function handleDelete(id: string) {
      setActivities([...activities.filter(i => i.id !== id)])
  }

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
          />
        </Container>
        
    </>
  );
}

export default App;
