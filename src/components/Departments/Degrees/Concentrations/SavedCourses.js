import React from 'react';
import style from './SavedCourses.module.css';
import { Table } from 'semantic-ui-react'

let courseToDelete = { CONCENTRATION_ID: 0 }

const value = (event) => {
    courseToDelete.courseId = event.target.value;
    let deletion = JSON.stringify(courseToDelete)
    fetch(`http://localhost:4000/delete?deleteCourse=${deletion}`)
        .then(data => console.log(JSON.stringify(data)))
        .catch(error => console.log(error));
}

const savedCourses = ({ savedCourses, concentrationId, concentrations }) => {
    const id = Number(concentrationId);
    const title = concentrations.filter(concentration => concentration.concentrationId === id)
        .map(concentration => concentration.concentrationDescription);

    courseToDelete.CONCENTRATION_ID = id;

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

                                                <button className={style.deleteButton} value={course.courseId} onClick={value}>x</button>
                                            </div>
                                        </Table.Cell>
                                    )
                                })
                            }
                        </Table.Row>
                        <Table.Row><button>Delete All</button></Table.Row>
                    </Table.Body>
                </Table>
            </div>
        </div>
    )
}

export default savedCourses;