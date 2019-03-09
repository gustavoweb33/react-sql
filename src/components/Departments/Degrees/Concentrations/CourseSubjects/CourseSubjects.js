import React, { useState } from 'react';
import Courses from './Courses/Courses';
import style from '../../Concentrations/Concentrations.module.css'

const courseSubjects = (props) => {
    const [subjects, setSubject] = useState([]);
    const [subjectId, setSubjectId] = useState(0);

    const getData = () => {
        fetch('http://localhost:4000/subjects')
            .then(response => response.json())
            .then(subjects => setSubject(subjects))
            .catch(error => console.log(error));
    }

    let showSubjects;

    if (subjects.length === 0) {
        console.log('...wainting')
        showSubjects = null;
    }
    else {
        showSubjects = (
            <select name='subject'
                onChange={(event) => { setSubjectId(event.target.value) }}>
                {
                    subjects.map(subject =>
                        <option
                            key={subject.subjectId}
                            value={subject.subjectId}>
                            {subject.description}
                        </option>
                    )
                }
            </select>
        );

    }



    return (
        <div className={style.courseSubject}>
            <p>Start adding courses here!</p>
            <button onClick={getData} disabled={props.disabled}>Show Subjects</button>
            {showSubjects}
            <div>
                <Courses subjectId={subjectId} concentration={props.concentration} />
            </div>
        </div>
    )
}

export default courseSubjects;