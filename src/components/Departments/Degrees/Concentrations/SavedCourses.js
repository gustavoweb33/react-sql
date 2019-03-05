import React from 'react';
import style from './SavedCourses.module.css';
import { Table } from 'semantic-ui-react'

const savedCourses = ({ savedCourses }) => {
    //turn component into a class based component. 
    //use fetch to get concentration name/info when component did mount

    console.log(savedCourses)
    return (
        <div >
            <Table basic>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Notes</Table.HeaderCell>
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