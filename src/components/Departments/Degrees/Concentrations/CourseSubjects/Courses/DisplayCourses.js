import React, { Component } from 'react';
import style from './DisplayCourses.module.css';
import Aux from '../../../../../../Auxiliary';
import { Button } from 'semantic-ui-react'
import DuplicatWaring from './DuplicatesWarning';

class DisplayCourses extends Component {
    // componentDidUpdate() {
    //     console.log('coponent updated from display courses')
    // }
    // componentDidMount() {
    //     console.log('component did mount from display courses')
    // }
    // componentWillReceiveProps() { //not safe
    //     console.log('component received new props')
    // }
    state = {
        course: [],
        concentration: this.props.concentration,
        anyDuplicateCourses: []
    }

    getCheckboxValue = (event) => {
        const stateCourses = [...this.state.course];

        this.state.course.forEach(course => {
            if (course.courseId.includes(event.target.value)) {
                return;
            }
            return;
        });

        if (event.target.checked === false) {
            const index = stateCourses.findIndex(course => {
                return course.courseId === event.target.value;
            });
            stateCourses.splice(index, 1);
        }
        //if course is never unchecked it will mean checked === true even after the select changes
        this.props.courses.forEach(course => {
            if (course.courseId === event.target.value && event.target.checked) {
                stateCourses.push(course);
                return;
            }
        });
        console.log(stateCourses)
        this.setState({ course: stateCourses });
    }

    saveCourses = () => {
        let state = JSON.stringify(this.state)
        fetch(`http://localhost:4000/insert?course=${state}`)
            .then(response => response.json())  //if there are duplicates, return a warning about duplicate courses
            .then(data => this.setState({ anyDuplicateCourses: data.duplicateCourses }))
            .catch(error => console.log(error));


        
    }

    disabledButtonHadler = (length) => {
        if (length > 0) {
            return false;
        }
        return true;
    }


    render() {
        console.log(`duplicates: ${this.state.anyDuplicateCourses}`)
        let disabled = this.disabledButtonHadler(this.state.course.length)
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
                <Button color='green' fluid onClick={this.saveCourses} disabled={disabled} >Save Courses</Button >
                {this.state.anyDuplicateCourses.length > 0 ? <DuplicatWaring duplicates={this.state.anyDuplicateCourses} /> : null}
            </Aux>
        )
    }
}

export default DisplayCourses;

