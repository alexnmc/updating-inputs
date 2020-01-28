import React, {Component} from 'react';
import './App.css';
import axios from 'axios'



class App extends Component{
     constructor(props){
       super(props)
       this.state = {
         data:[],
         currentValue: {}
       }
     }


    componentDidMount(){
      this.getData()
    }


    getData = () => {
      axios.get('http://localhost:8000').then(res => {
        this.setState({data: res.data})
          res.data.map(item => {
              this.setState({
                  ["moh" + item._id] :  item.moh,
                  ["boh" + item._id] : item.boh,
                  ["total" + item._id] : item.total
              })
          })
      })
    }

    handleChange = (e) => {
      e.preventDefault()
          this.setState({
           [e.target.name] : e.target.value
          })
    }

    handleFocus = (item) => {
      this.setState({
        currentValue: item
      })
    }

    handleBlur = (e, item) => {
        let name = e.target.name[0] === "t" ? "total"  :  e.target.name[0] + e.target.name[1] + e.target.name[2]
        const update = { [name] : e.target.value - ""}
        if(this.state.currentValue[name] !== e.target.value - ""){
          axios.put(`http://localhost:8000/${item._id}`, update).then(res => {
                 this.getData()
                 console.log("old value:" + item[name] , "new value: " + res.data[name])
          })
        }
    }
    
    render(){
      return(
        <div>
          {
           this.state.data.map((item, i) => {
            return(
              <div key = {item._id} style = {{display: "flex", alignItems: "center", justifyContent: "center"}}>
                <h2 style = {{margin: "10pt"}}>Item {i+1}</h2>
                 <input 
                  name = {"moh"+item._id}
                  value = {this.state["moh" + item._id]}
                  onChange = {this.handleChange}
                  onFocus = {() => this.handleFocus(item)}
                  onBlur = {(e) => this.handleBlur(e, item)}
                 />
               
                <input 
                  name = {"boh"+item._id}
                  value = {this.state["boh" + item._id]}
                  onChange = {this.handleChange}
                  onFocus = {() => this.handleFocus(item)}
                  onBlur = {(e) => this.handleBlur(e, item)}
                />
               
                <input 
                  name = {"total"+item._id}
                  value = {this.state["total" + item._id]}
                  onChange = {this.handleChange}
                  onFocus = {() => this.handleFocus(item)}
                  onBlur = {(e) => this.handleBlur(e, item)}
                />   
              </div>
            )
           })
          }
        </div>
       )
     }
}
export default App;
