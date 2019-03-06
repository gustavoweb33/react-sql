import React from 'react';
import style from './SavedCourses.module.css';
import { Table } from 'semantic-ui-react'

const savedCourses = ({ savedCourses, concentrationId, concentrations }) => {
    const id = Number(concentrationId);
    const title = concentrations.filter(concentration => concentration.concentrationId === id)
        .map(concentration => concentration.concentrationDescription);

    return (
        <div >
            <Table basic>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell><h3>{title}</h3></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    <Table.Row className={style.container}>
                        {savedCourses.map((course, i) => <Table.Cell key={i}> {course.courseId} ({course.creditHours})</Table.Cell>)}
                    </Table.Row>
                </Table.Body>
            </Table>
        </div>
    )
}

export default savedCourses;