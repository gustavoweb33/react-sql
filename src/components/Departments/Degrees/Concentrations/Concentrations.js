import React, { Component } from 'react';
import style from '../../../../Global.module.css';
import CourseSubjects from './CourseSubjects/CourseSubjects';
import SavedCourses from './SavedCourses';

//removed name='concentrationId' from select. might no be important


class Concentration extends Component {

    state = {
        concentrationId: 0,
        data: [],
        disabled: true,
        display: false
    }

    componentDidMount() {
        console.log('component did mount from concentration')
    }
    getClasses = () => {
        fetch(`http://localhost:4000/saved?name=${this.state.concentrationId}`)
            .then(response => response.json())
            .then(data => this.setState({ data: data }))
            .catch(error => console.log(error));

        this.setState({ display: true });
    }



    render() {
        let showSaveCourses = null;

        if (this.state.display) {
            showSaveCourses = <SavedCourses savedCourses={this.state.data} />;
        }
        


        return (
            <div className={style.space}>

                <select onChange={(event) =>
                    this.setState({ concentrationId: event.target.value, disabled: false })}>
                    <option value={' '} >CONCENTRATION</option>
                    {
                        this.props.concentrations.map(concentration =>
                            <option
                                key={concentration.concentrationId}
                                value={concentration.concentrationId}
                            >
                                {concentration.concentrationDescription}
                            </option>
                        )
                    }
                </select>

                <button onClick={this.getClasses}>Show saved courses </button>
                <button onClick={() => this.setState({ display: false })}>Hide Courses</button>
                {showSaveCourses}

                <CourseSubjects concentration={this.state.concentrationId} disabled={this.state.disabled} />
            </div>
        )
    }


}

export default Concentration;