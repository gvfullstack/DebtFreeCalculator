import React from "react";

class StandardSchedule extends React.Component{
    constructor(props){
        super(props);
            this.state = {
                schedule:[],
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
        let tempArr=[this.state.schedule]
        if(this.props.loanBalance>0 && this.props.interestRate>0){
            while(loanBalance > 99){
                interest =Math.round((loanBalance * interestRate)*100)/100
                if(loanBalance>100){
                    principal = Math.round((loanBalance * minPrincipalRate)*100)/100 //diff
                    minPayment = Math.round((principal + interest)*100)/100 //diff
                    }
                else {
                    principal = Math.round(loanBalance*100)/100 //diff
                    minPayment = Math.round((loanBalance + interest)*100)/100 //diff
                    }
                newBalance = Math.round((Number(loanBalance) - Number(principal))*100)/100 //same
                tempArr.push({ //same
                    "month": month,
                    "minPayment": minPayment.toLocaleString("en-US", {minimumFractionDigits:2}),
                    "principal": principal.toLocaleString("en-US", {minimumFractionDigits:2}),
                    "interest": interest.toLocaleString("en-US", {minimumFractionDigits:2}), 
                    "newBalance": newBalance.toLocaleString("en-US", {minimumFractionDigits:2})
                    })
                loanBalance = loanBalance-principal //same
                month++
            }
        this.setState((prevState) => ({...prevState, schedule: tempArr, isShown: !isShown}))
         }           
    }



    render(){
        let schedule = this.state.schedule
        const cells = {
            Month: 'month', 
            'Min Payment': 'minPayment', 
            Principal: 'principal', 
            Interest:'interest',
            'New Balance': 'newBalance'
        }
        const renderRow = schedule.map((e, i)=>
                        <tr className="stdSched" key={e+i}>
                           {Object.values(cells).map(val=><td>{e[val]}</td>)} 
                        </tr>)

        return(
            <div>
                <button className = "tableButton" onClick={()=>this.recalculateSchedule()}>Show/Hide Minimum Payment Schedule</button>
                {this.state.isShown && (
                    <div className="standardSchedDiv">
                <p>It will take {this.state.schedule.length-1} months to pay off your debt if you only pay the minimum amount.</p>
                    <table>
                        <tbody>
                        <tr>
                            {Object.keys(cells).map(key => <th>{key}</th>)}
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