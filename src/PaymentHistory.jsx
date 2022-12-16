import React from "react";

class PaymentHistory extends React.Component{
    constructor(props){
        super(props);
            this.state = {
                isShown: false
                }
            this.update = this.update.bind(this)
    }

    update=()=>{
        let isShown = this.state.isShown
        if(this.props.payHistory.length === 0){
            
        }
        this.setState({isShown: !isShown})  
    }

    render(){
        let payHistory = this.props.payHistory
        const renderRow = payHistory.map((e, i)=>
                        <tr className="payHist" key = {i}>
                            <td>{e.startingLoanBal}</td>
                            <td>{e.interestCharged}</td>
                            <td>{e.principalPaydown}</td>
                            <td>{e.paymentAmount}</td>
                            <td>{e.principalPaidToDate}</td>
                            <td>{e.endingLoanBal}</td>     
                        </tr>)

        return(
            <div>
                <button className = "tableButton" onClick={this.update}>Show/Hide Payment History</button>
                {this.state.isShown && (
                    <div className="payHistoryDiv">
                    <table>
                        <tbody>
                        <tr key = "0">
                            <th>Beg Loan Bal</th>
                            <th>Interest</th>
                            <th>Principal</th>
                            <th>Payment</th>
                            <th>Principal Paid</th>
                            <th>Ending Balance</th>
                        </tr>
                    {renderRow}    
                        </tbody>
                    </table>
                    </div>
                    )}
            </div>
        )
    }
    }

export default PaymentHistory