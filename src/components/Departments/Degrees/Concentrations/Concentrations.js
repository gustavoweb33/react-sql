import React, { Component } from 'react';
import globalStyle from '../../../../Global.module.css';
import CourseSubjects from './CourseSubjects/CourseSubjects';
import SavedCourses from './SavedCourses';
import style from './Concentrations.module.css';
import { Button } from 'semantic-ui-react'
import Aux from '../../../../Auxiliary';


class Concentration extends Component {

    state = {
        concentrationId: 0,
        data: [],
        disabled: true,
        display: false
    }

    getClasses = () => {
        fetch(`http://localhost:4000/saved?name=${this.state.concentrationId}`)
            .then(response => response.json())
            .then(data => this.setState({ data: data }))
            .catch(error => console.log(error));

        this.setState({ display: true });
    }

componentDidUpdate() {
    console.log('updated from concentration')
}

    render() {
        let showSaveCourses = null;
        let courseSubjects = null;
        let showButtons = null;

        if (this.state.display) {
            showSaveCourses = <SavedCourses
                savedCourses={this.state.data}
                concentrationId={this.state.concentrationId}
                concentrations={this.props.concentrations} />;
        }
        if (this.state.concentrationId !== 0) {
            courseSubjects = <CourseSubjects concentration={this.state.concentrationId} disabled={this.state.disabled} />
        }

        if (!this.state.disabled) {
            showButtons =
                <div>
                    <Button
                        color='blue'
                        attached='left'
                        onClick={this.getClasses}>
                        Show saved courses
                </Button>
                    <Button
                        color='teal'
                        attached='right'
                        onClick={() => this.setState({ display: false })}>
                        Hide Courses
                </Button>
                </div>
        }

        return (
            <Aux className={globalStyle.space}>
                <select onChange={(event) =>
                    this.setState({ concentrationId: event.target.value, disabled: false })}>
                    <option value={0}>CONCENTRATION</option>
                    {
                        this.props.concentrations.map(concentration =>
                            <option
                                key={concentration.concentrationId}
                                value={concentration.concentrationId}>
                                {concentration.concentrationDescription}
                            </option>
                        )
                    }
                </select>

                {showButtons}

                <div className={style.grid}>
                    {showSaveCourses}
                    {courseSubjects}
                </div>

            </Aux>
        )
    }


}

export default Concentration;