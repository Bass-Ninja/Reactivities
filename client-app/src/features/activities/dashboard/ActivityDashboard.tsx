import React from 'react'
import { Grid } from 'semantic-ui-react'
import LoadingComponent from '../../../app/layout/LoadingComponents';
import { Activity } from '../../../app/models/activity';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import ActivityList from './ActivityList';

interface Props {
    activities: Activity[];
    selectActivity: (id: string) => void;
    cancelSelectActivity: () => void;
    selectedActivity: Activity | undefined;
    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
    createEdit: (activity: Activity) => void;
    deleteActivity: (id: string) => void;
    submitting: boolean;

  }

export default function ActivityDashboard({activities, selectedActivity, selectActivity, 
    cancelSelectActivity, editMode, openForm, closeForm, 
    createEdit, deleteActivity, submitting}: Props) {

    
    return (
        <Grid>
            <Grid.Column width="10">
                <ActivityList activities={activities} selectActivity={selectActivity} deleteActivity={deleteActivity} submitting={submitting}/>
            </Grid.Column>
            <Grid.Column width={"6"}>
                {selectedActivity && !editMode &&
                <ActivityDetails activity={selectedActivity} cancelSelectActivity={cancelSelectActivity} openForm={openForm} />
                }
                {editMode &&
                <ActivityForm closeForm={closeForm} activity={selectedActivity} createOrEdit={createEdit} submitting={submitting}/>
                }
            </Grid.Column>
        </Grid>

    )

}