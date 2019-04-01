import React, { Component } from 'react';
import DisplayCourses from './DisplayCourses';

class CoursesClass extends Component {
    state = {
        courses: [],
        resetCourses: []
    }

    componentDidUpdate(prevProps) {
        if (this.props.subjectId !== prevProps.subjectId) {
            fetch(`http://localhost:4000/courses?id=${this.props.subjectId}`)
                .then(results => results.json())
                .then(courses => this.setState({ courses: courses }))
                .catch(error => console.log(error));
        }
        // console.log('updated from courses component');   //update displaycourse from here to remove duplicated error
    }

    render() {
        const showCourses = this.state.courses.length === 0 ? null
            : <DisplayCourses courses={this.state.courses} concentration={this.props.concentration} />

        return (
            <div>
                {showCourses}
            </div>
        )
    }

}

export default CoursesClass;