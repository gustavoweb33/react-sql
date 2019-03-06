import React, { Component } from 'react';
import style from './DisplayCourses.module.css';

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
            console.log(index);
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
                <button onClick={this.saveCourses}>Save Courses</button>
            </div>
        )
    }

}

export default DisplayCourses;