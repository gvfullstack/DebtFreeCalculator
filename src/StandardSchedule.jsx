import React from "react";

class StandardSchedule extends React.Component{
    constructor(props){
        super(props);
            this.state = {
                month:[],
                isShown: false
                }
            this.recalculateSchedule = this.recalculateSchedule.bind(this)
    }

    recalculateSchedule = () =>{
        let month = 1;
        let minPrincipalRate = this.props.minPayment
        let interestRate = this.props.interestRate
        let loanBalance = this.props.loanBalance
        let minPayment
        let principal
        let interest
        let newBalance
        let isShown = this.state.isShown
        let tempArr=[this.state.month]
        if(this.props.loanBalance>0 && this.props.interestRate>0){
            while(loanBalance > 99){
                interest =Math.round((loanBalance * interestRate)*100)/100
                if(loanBalance>100){
                    principal = Math.round((loanBalance * minPrincipalRate)*100)/100
                    minPayment = Math.round((principal + interest)*100)/100
                    newBalance = Math.round((Number(loanBalance) - Number(principal))*100)/100
                    tempArr.push({
                        "month": month,
                        "minPayment": minPayment.toLocaleString("en-US", {minimumFractionDigits:2}),
                        "principal": principal.toLocaleString("en-US", {minimumFractionDigits:2}),
                        "interest": interest.toLocaleString("en-US", {minimumFractionDigits:2}), 
                        "newBalance": newBalance.toLocaleString("en-US", {minimumFractionDigits:2})
                        })
                        loanBalance = loanBalance-principal
                    }
                else if(loanBalance<=100){
                    minPayment = Math.round((loanBalance + interest)*100)/100
                    principal = Math.round(loanBalance*100)/100
                    newBalance = Math.round((loanBalance - principal)*100)/100
                    tempArr.push( 
                        {"month": month,
                        "minPayment": minPayment.toLocaleString("en-US", {minimumFractionDigits:2}),
                        "principal": principal.toLocaleString("en-US", {minimumFractionDigits:2}),
                        "interest": interest.toLocaleString("en-US", {minimumFractionDigits:2}), 
                        "newBalance": newBalance.toLocaleString("en-US", {minimumFractionDigits:2})
                    })
                    loanBalance = loanBalance-principal
                    
                    }
                month++
            }
        this.setState({month: tempArr})
        this.setState({isShown: !isShown})
         }           
    }



    render(){
        let month = this.state.month
        const update = this.recalculateSchedule
        const renderRow = month.map((e, i)=>
                        <tr className="stdSched" key={i}>
                            <td>{e.month}</td>
                            <td>{e.minPayment}</td>
                            <td>{e.principal}</td>
                            <td>{e.interest}</td>
                            <td>{e.newBalance}</td>
                        </tr>)

        return(
            <div>
                <button className = "tableButton" onClick={update}>Show/Hide Minimum Payment Schedule</button>
                {this.state.isShown && (
                    <div className="standardSchedDiv">
                <p>It will take {this.state.month.length-1} months to pay off your debt if you only pay the minimum amount.</p>
                    <table>
                        <tbody>
                        <tr>
                            <th>Month</th>
                            <th>Min Payment</th>
                            <th>Principal</th>
                            <th>Interest</th>
                            <th>NewBalance</th>
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


export default StandardSchedule