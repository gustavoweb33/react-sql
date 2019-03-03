import React, { Component } from 'react';
import style from './DisplayCourses.module.css';

//create a fetch function to insert the selected courses that correspond with the passed down concentration


//create a select tag with the graduation_requirement type: 1, 2 or 3 (core, major, other)
class DisplayCourses extends Component {
   
    state = {
        course: [],
        concentration: this.props.concentration
    }

    getCheckboxValue = (event) => {
        //let courses = [...this.state.courses];
        const stateCourses = [...this.state.course];

        // if (!(courses.includes(event.target.value)) && event.target.checked) {
        //     courses.push(event.target.value);
        // }
        // else if (event.target.checked === false) {
        //     //remove from courses array
        //     const index = courses.indexOf(event.target.value);
        //     courses.splice(index, 1);

        // }
        // else {
        //     console.log('course already included');
        //     return;
        // }
        // this.setState({ courses: courses });

        this.state.course.forEach(course => {
            if (course.courseId.includes(event.target.value)) {
                return console.log('already included')
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
        console.log(this.props)

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