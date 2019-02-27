import React, { Component } from 'react';
import style from './DisplayCourses.module.css';

//need to pass down the concentration to this component-DONE
//create a fetch function to insert the selected courses that correspond with the passed down concentration
//create a conditional that checks for courses that may already be in the db(to prevent duplicates)


//create a select tag with the graduation_requirement type: 1, 2 or 3 (core, major, other)
class DisplayCourses extends Component {
//this.props.courses was passed down from courses component a obj of all the courses displayed
//it includes courseId: "AVST 101", courseSubjectId: 8, creditHours: 3
    state = {
        courses: [],
    }

    getCheckboxValue = (event) => {
        let courses = [...this.state.courses];
        let passedCourses = [];
        
        if (!(courses.includes(event.target.value)) && event.target.checked) {
            courses.push(event.target.value);
            passedCourses.push(this.props.courses.includes(event.target.value));
        }
        else if(event.target.checked === false) {
            //remove from courses array
          const index = courses.indexOf(event.target.value);
          courses.splice(index, 1);
        }
        else {
            console.log('course already included');
            return;
        }
        this.setState({ courses: courses});
        console.log(passedCourses)
    }

    saveCourses = () => {
        if (this.state.courses.length === 0) {
            console.log('empty course list');
            return;
        }

        else {
            fetch(`http://localhost:4000/insert?course=${this.state.courses}`)
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
                                        id={course.courseId}
                                        onClick={this.getCheckboxValue} />

                                    <label htmlFor={course.courseId}>{course.courseId}</label>
                                    <span>({course.creditHours})</span>
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