import React, { Component } from 'react';
import style from '../../../../Global.module.css';

class Concentration extends Component {

    state = {
        concentrationId: 0,
        data: []
    }


    getClasses = () => {
        fetch(`http://localhost:4000/add?name=${this.state.concentrationId}`)
            .then(response => response.json())
            .then(data => this.setState({ data: data }))
            .catch(error => console.log(error));
    }

    render() {

        return (
            <div className={style.space}>

                <select name='concentrationId' onChange={(event) => this.setState({ concentrationId: event.target.value })}>
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
    
                <button onClick={this.getClasses}>Click </button>

                {this.state.data.length === 0 ? null : <p>{this.state.data[0].course_id}</p>}

            </div>
        )
    }


}

export default Concentration;