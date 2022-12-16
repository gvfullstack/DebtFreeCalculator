import React from 'react'
import "./Payment.css"

class Payment extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            payAmount: ""
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleClearField = this.handleClearField.bind(this)
        this.targetValue = React.createRef()
    }

    handleClick(){
        this.props.inputHandler(this.targetValue.current.value)
        this.setState({payAmount:""})
    }

    handleChange(e){
        this.setState({payAmount:e.target.value})
    }

    handleClearField(){
        this.setState({payAmount:""})
    }

    render(){
        const adjustInputSize = () => {
            const payAmountField = document.getElementById(this.props.id)

            if(payAmountField.length < 1){
                payAmountField.style.width = payAmountField.placeholder.length+2+'px'
            }else{
                payAmountField.style.width = payAmountField.length+5+'px'
            }
        }
        return(
            <div className = "paymentDiv">               
                <label className = "payLabel" htmlFor={this.props.htmlFor}>{this.props.label}</label>
                <div className ="paymentInput">
                    <input type="text" 
                        id={this.props.id}  
                        ref={this.targetValue} 
                        value = {this.state.payAmount} 
                        onChange={this.handleChange}
                        onFocus={this.handleClearField}
                        placeholder="0.00"/>
                    <button onClick={this.handleClick}>Pay</button>
                    <div className = "nextPaySummary">
                        <p className="nextHeading">Next Payment Due</p>
                        <div className="nextPaySummaryUnit">
                            <p className="nextLabel">Interest</p>
                            <p className="nextData">{this.props.nextInterest}</p>
                        </div>
                        
                        <div className="nextPaySummaryUnit">
                            <p className="nextLabel">Principal</p>
                            <p className="nextData">{this.props.nextMinPrincipal}</p>

                        </div>

                        <div className="nextPaySummaryUnit">
                            <p className="nextLabel">Min Payment</p>
                            <p className="nextData">{this.props.nextMinPay} </p>
                        </div>

                    </div>
                </div>

            </div>)
    }
}   

export default Payment