import React from 'react'
import "./Input.css"

class Input extends React.Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e){
        this.props.inputHandler(e.target.value, this.props.id)
    }

    render(){
        return(
            <div className = "amountDiv">           
                <label htmlFor={this.props.htmlFor}>{this.props.label}</label>
                <div className= "innerInputDiv">
                    <p>{this.props.prefix}</p>
                    <input type="text" id={this.props.id} onChange={this.handleChange}/>
                    <p>{this.props.suffix}</p>
                </div>
            </div>)
    }
}   

export default Input