import React, { Component } from 'react';

//need to pass down the concentration to this component
//create a fetch function to insert the selected courses that correspond with the passed down concentration

class DisplayCourses extends Component {

    getCheckboxValue = (event) => {
        console.log(event.target.value);
    }


    render() {
        return (
            <div style={{ height: ' 20em', width: '20em', overflow: 'scroll' }}>
                {
                    this.props.courses.map(course => {
                        return (
                            <div key={course.courseId}  >
                                <div >
                                    <input type='checkbox'
                                        value={course.courseId}
                                        id={course.courseId} 
                                        onClick={this.getCheckboxValue}/>

                                    <label htmlFor={course.courseId}>{course.courseId}</label>
                                    <span>({course.creditHours})</span>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }

}

export default DisplayCourses;