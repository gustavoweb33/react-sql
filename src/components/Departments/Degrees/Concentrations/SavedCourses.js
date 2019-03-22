import React from 'react';
import style from './SavedCourses.module.css';
import { Table, Button } from 'semantic-ui-react'

let courseToDelete = { CONCENTRATION_ID: 0 }
const disabled = { disabled: true };


const deleteCourse = (event) => {
    courseToDelete.courseId = event.target.value;
    let deletion = JSON.stringify(courseToDelete)
    fetch(`http://localhost:4000/delete?deleteCourse=${deletion}`)
        .then(data => console.log(JSON.stringify(data)))
        .catch(error => console.log(error));
}

const deleteAllCourses = () => {
    const confirmation = window.confirm('DELETE ALL SAVED COURSES?');

    if (confirmation) {
        const concentrationId = courseToDelete.CONCENTRATION_ID;
        fetch(`http://localhost:4000/deleteAllCourses?id=${concentrationId}`)
            .then(data => console.log(JSON.stringify(data)))
            .catch(error => console.log(error));
    }
    return;
}


const savedCourses = ({ savedCourses, concentrationId, concentrations }) => {
    const id = Number(concentrationId);
    const title = concentrations.filter(concentration => concentration.concentrationId === id)
        .map(concentration => concentration.concentrationDescription);

    courseToDelete.CONCENTRATION_ID = id;
    const noSavedCourses = <h3>No saved courses</h3>

    if (savedCourses.length > 0) {
        disabled.disabled = false;
    }
    else {
        return noSavedCourses;
    }
    
    return (
       
        <div >
            <div>
                <Table basic>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell><h3>{title}</h3></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <Table.Row className={style.container}>
                            {
                                savedCourses.map((course, i) => {
                                    return (
                                        <Table.Cell key={i}>
                                            <div className={style.innerContainer}>
                                                <p>{course.courseId} ({course.creditHours})</p>

                                                <button className={style.deleteButton} value={course.courseId} onClick={deleteCourse}>x</button>
                                            </div>
                                        </Table.Cell>
                                    )
                                })
                            }
                        </Table.Row>
                    </Table.Body>
                </Table>
                <span>
                    <Button fluid size='tiny' inverted color='red' disabled={disabled.disabled} onClick={deleteAllCourses}>Delete All</Button>
                </span>
            </div>
           
        </div>
    )
}

export default savedCourses;