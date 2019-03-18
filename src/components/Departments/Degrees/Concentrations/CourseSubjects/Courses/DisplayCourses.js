import React, { Component } from 'react';
import style from './DisplayCourses.module.css';
import Aux from '../../../../../../Auxiliary';
import {Button} from 'semantic-ui-react'

class DisplayCourses extends Component {

    state = {
        course: [],
        concentration: this.props.concentration
    }

    getCheckboxValue = (event) => {
        const stateCourses = [...this.state.course];

        this.state.course.forEach(course => {
            if (course.courseId.includes(event.target.value)) {
                return;
            }
            return;
        })

        if (event.target.checked === false) {
            const index = stateCourses.findIndex(course => {
                return course.courseId === event.target.value;
            });
            stateCourses.splice(index, 1);
        }

        this.props.courses.forEach(course => {
            if (course.courseId === event.target.value && event.target.checked) {
                stateCourses.push(course);
                return;
            }

        })

        this.setState({ course: stateCourses });


    }

    saveCourses = () => {
        if (this.state.course.length === 0) {
            console.log('empty course list');
            return;
        }

        else {
            let state = JSON.stringify(this.state)
            fetch(`http://localhost:4000/insert?course=${state}`);
        }
    }


    render() {
        return (
            <Aux>
                <div className={style.coursesContainer}>
                    {
                        this.props.courses.map(course => {
                            return (
                                <div key={course.courseId}  >
                                    <div >
                                        <input type='checkbox'
                                            value={course.courseId}
                                            onClick={this.getCheckboxValue} />

                                        <label htmlFor={course.courseId}>{course.courseId} ({course.creditHours})</label>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
                <Button color='green' onClick={this.saveCourses}>Save Courses</Button >
            </Aux>
        )
    }

}

export default DisplayCourses;