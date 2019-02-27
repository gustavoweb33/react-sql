import React, { Component } from 'react';
import style from './App.module.css';
import Department from './components/Departments/Department';
// import CourseSubjects from './components/CourseSubjects/CourseSubjects';

class App extends Component {

  state = {
    data: [],
    degrees: []
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    fetch('http://localhost:4000/degrees')
      .then((response) => {

        return response.json();
      })
      .then(data => {
        this.setState({ data: data });
      })  //array of objects
      .catch(error => console.log(error))
  }

  filterDapartments = () => {
    let departmentName = [];
    if (this.state.data.length !== 0) {
      departmentName = [...new Set(this.state.data.map(x => x.departmentName))]
    }

    const department = this.state.data.length !== 0 ?
      <Department department={departmentName} change={this.filterDegrees} degrees={this.state.degrees} />
      : <h1>...Loading</h1>

    return department;
  }

  filterDegrees = (event) => {
    const degrees = this.state.data.filter(x => {
      return x.departmentName.includes(event.target.value);
    });

    this.setState({ degrees: degrees });
  }


  render() {
    const department = this.filterDapartments();


    return (
      <div className="App">
        <h1 className={style.header}>React SQL</h1>
        <div>{department}</div>
       
      </div>

    );
  }
}

export default App;
