import React, { useState } from 'react';
import DisplayCourses from './DisplayCourses';

const courses = (props) => {
    const [courses, setCourses] = useState([]);

    const getCourses = () => {
        fetch(`http://localhost:4000/courses?id=${props.subjectId}`)
            .then(results => results.json())
            .then(courses => setCourses(courses))
            .catch(error => console.log(error));
    }

    const showCourses = courses.length === 0 ? null : <DisplayCourses courses={courses} concentration={props.concentration}/>

    return (
        <div>
            <button onClick={getCourses}>Display Courses</button>
            {showCourses}
        </div>
    )
}

export default courses;