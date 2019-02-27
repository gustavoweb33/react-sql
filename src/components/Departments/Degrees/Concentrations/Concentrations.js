import React, { Component } from 'react';
import style from '../../../../Global.module.css';
import CourseSubjects from './CourseSubjects/CourseSubjects';

class Concentration extends Component {

    state = {
        concentrationId: 0,
        data: [],
        disabled: true,
        disabledOption: false
    }


    getClasses = () => {
        fetch(`http://localhost:4000/add?name=${this.state.concentrationId}`)
            .then(response => response.json())
            .then(data => this.setState({ data: data }))
            .catch(error => console.log(error));
    }
//showSaveCoures could be made into its own component 
//i.e. render the component if it data.length !== 0
    render() {
        const showSaveCourses = this.state.data.length === 0 ?
            <p>No courses for this concentration</p> : <p>{this.state.data[0].course_id}</p>

        return (
            <div className={style.space}>

                <select  name='concentrationId' onChange={(event) => 
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
                {showSaveCourses} 
                <CourseSubjects concentration={this.state.concentrationId} disabled={this.state.disabled}/>
            </div>
        )
    }


}

export default Concentration;