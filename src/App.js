import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


 function StudentList(props){
    var listItems = props.data.map((data) =>
      <tr>
        <td>
        {data.name}
        </td>
        <td>
        {data.mark}
        </td>
      </tr>
    );
    return(
      listItems
    )
}

function PerfromanceList(props){
  var list = props.data.sort((a, b) =>
     a.mark < b.mark
  );
  var new_data = [];
    var data = list.map((data, index) =>
      <tr>
        <td>
        {index+1}
        </td>
        <td>
        {data.name}
        </td>
      </tr>
    );
    new_data.push(data)
    return(
      new_data
    )
}

function ListHead(props){
  return(
    <tr>
      <td>
        {props.first}
      </td>
      <td>
        {props.second}
      </td>
    </tr>
  );
}


function Table(props){
  return(
    <div className="App">
      <h2> {props.title} </h2>
      <table className="table" border="1">
        <thead>
        {(props.datalist)? <ListHead first="Name" second="Mark"/> : <ListHead first="Rank" second="Name"/>}
        </thead>
        <tbody>
        {(props.datalist)? <StudentList data={props.data}/> : <PerfromanceList data={props.data}/>}
        </tbody>
      </table>
    </div>
  )
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      mark: '',
      total: []
    };
    this.handleText = this.handleText.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleText(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  handleSubmit(event) {
    var new_stud = this.state.total;
    new_stud.push({name: this.state.name, mark: this.state.mark})
    this.setState({total: new_stud, name: '', mark: ''});
    console.log(this.state.total)
    event.preventDefault();
  }

  render() {
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" name="name" value={this.state.name} onChange={this.handleText} required/>
          </label>
          <label>
            Mark:
            <input type="number" name="mark" value={this.state.mark} onChange={this.handleText} required  min="1" max="100"/>
          </label>
          <input type="submit" value="Submit" />
        </form>
        <Table title="Student List" datalist={true} data={this.state.total}/>
        <Table title="Performance List" datalist={false} data={this.state.total}/>
      </div>
    );
  }
}

export default App;
