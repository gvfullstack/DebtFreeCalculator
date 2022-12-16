import React from 'react'
import "./Payment.css"

class CalculatedField extends React.Component {


    render(){
        return(
            <div className = {this.props.className3}>               
                <p className = {this.props.className}>{this.props.label}</p> 
                <p className = {this.props.className2}>{this.props.label === "Yearly Rate" ? (this.props.value*100*12).toFixed(2): this.props.value}
                 {this.props.suffix}
                </p>
            </div>)
    }
}   

export default CalculatedField