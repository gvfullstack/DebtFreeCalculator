import React from 'react'
import Input from './Input';
import CalculatedField from './CalculatedField';
import Payment from './Payment';
import StandardSchedule from './StandardSchedule'
import PaymentHistory from './PaymentHistory' 
import "./AllFields.css"

class AllFields extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            initialLoanAmount: 0,
            interestRate: 0,
            periodicIntRate: 0,
            bpLoanBal: 0,            
            loanBalance: 0,
            paymentAmount: 0,
            interestPortion: 0,
            sumPrincipalPayments: 0,
            principalPortion : 0,
            nextMinimumPayment: 0,
            minimumPrincipal: .01,
            paymentHistory:[],
            nextMinPrincipal:0, 
            nextInterest: 0
        }

        this.inputHandler=this.inputHandler.bind(this)
        this.paymentHandler =  this.paymentHandler.bind(this)
        this.updateInterestPortion = this.updateInterestPortion.bind(this)
        this.updatePrincipalPortion = this.updatePrincipalPortion.bind(this)
        this.updateCurrLoanBal = this.updateCurrLoanBal.bind(this)
        this.updatePrincipalPaymentSum = this.updatePrincipalPaymentSum.bind(this)
        this.updateBpLoanBal = this.updateBpLoanBal.bind(this)
        this.startStartingBal = this.startStartingBal.bind(this)
        this.startNextMinPayment = this.startNextMinPayment.bind(this)
        this.updateNextMinPayment = this.updateNextMinPayment.bind(this)
    }

    startNextMinPayment=()=>{
        const {initialLoanAmount, minimumPrincipal, interestRate} = this.state;
        let nextMinPrincipal = Math.round((initialLoanAmount*minimumPrincipal)*100)/100
        let nextInterest = Math.round((initialLoanAmount*interestRate)*100)/100
        if(this.state.initialLoanAmount > 0 && this.state.interestRate > 0){
            this.setState({nextMinimumPayment: Math.round((nextMinPrincipal + nextInterest)*100)/100})
            this.setState({nextInterest: nextInterest})
            this.setState({nextMinPrincipal: nextMinPrincipal})
            }
        else{this.setState({nextMinimumPayment: ""}) }
    }

    

    updateBpLoanBal=()=>{ 
        this.setState({bpLoanBal: Number((this.state.initialLoanAmount - this.state.sumPrincipalPayments)*100)/100}, this.updateInterestPortion) }
        updateInterestPortion=()=>{ 
            this.setState({interestPortion: Math.round((this.state.bpLoanBal * this.state.interestRate)*100)/100}, 
                this.updatePrincipalPortion)}
            updatePrincipalPortion=()=>{ 
                this.setState({principalPortion: Math.round((this.state.paymentAmount - this.state.interestPortion)*100)/100},this.updateCurrLoanBal)}
                updateCurrLoanBal=()=>{ 
                this.setState({loanBalance: Math.round((this.state.bpLoanBal - this.state.principalPortion)*100)/100}, 
                    this.updatePrincipalPaymentSum )}
                    updatePrincipalPaymentSum=()=>{ 
                        this.setState({sumPrincipalPayments: Math.round((this.state.sumPrincipalPayments + this.state.principalPortion)*100)/100}, 
                            this.updateNextMinPayment)}
                    
                    updateNextMinPayment=()=>{
                        const {loanBalance, minimumPrincipal, interestRate, interestPortion} = this.state;
                        let nextMinPrincipal = Math.round((loanBalance*minimumPrincipal)*100)/100
                        let nextInterest = Math.round((loanBalance*interestRate)*100)/100
                        if(this.state.loanBalance <= 100){
                            this.setState({nextMinimumPayment: Math.round((loanBalance + interestPortion)*100)/100},this.updatePayHistory)
                            
                            }
                        else{this.setState({nextMinimumPayment: 
                            Math.round(((nextMinPrincipal) + (nextInterest))*100)/100},this.updatePayHistory)
                            this.setState({nextMinPrincipal:nextMinPrincipal})
                            this.setState({nextInterest:nextInterest})
                            }
                    }

                    updatePayHistory = ()=>{
                        let currentPayment = {
                            startingLoanBal: (this.state.bpLoanBal).toLocaleString("en-US", {minimumFractionDigits:2}),
                            paymentAmount:(this.state.paymentAmount).toLocaleString("en-US", {minimumFractionDigits:2}),
                            interestCharged: (this.state.interestPortion).toLocaleString("en-US", {minimumFractionDigits:2}),
                            principalPaydown: (this.state.principalPortion).toLocaleString("en-US", {minimumFractionDigits:2}),
                            principalPaidToDate: (this.state.sumPrincipalPayments).toLocaleString("en-US", {minimumFractionDigits:2}),
                            endingLoanBal: (this.state.loanBalance).toLocaleString("en-US", {minimumFractionDigits:2})
                        }
                        this.setState({paymentHistory: [...this.state.paymentHistory, currentPayment]})
                    } 
    
    startStartingBal=(e)=>{
        this.setState({bpLoanBal: Number(Math.abs(e)*100)/100})
    }

    inputHandler = (e, field)=>{

        if(field === "initialLoanAmount"){
            this.setState({initialLoanAmount: Number(Math.abs(e)*100)/100}, this.startNextMinPayment)
        }
        else if(field === "interestRate"){
            this.setState({interestRate: Number(Math.abs(e)/100/100/12)*100},  this.startNextMinPayment)
            }
        this.startNextMinPayment()
        }

    paymentHandler = (e)=>{
        if(this.state.nextMinimumPayment<=0){alert("No payment due.")}
        else if(e>Number(this.state.loanBalance) && e>Number(this.state.initialLoanAmount)){
            alert("Payment must be less than or equal to the outstanding loan balance.")
        }
        else if(e>=this.state.nextMinimumPayment-.01){
            this.setState({paymentAmount: Number((Math.abs(e)*100)/100)}, this.updateBpLoanBal)}
        else{alert("Payment amount entered is too low")}    
        }

    render() {
        let initialLoanAmount=Number(this.state.initialLoanAmount).toLocaleString("en-US", {minimumFractionDigits:2})
        let loanBalance=Number(this.state.loanBalance).toLocaleString("en-US", {minimumFractionDigits:2})
        let interestRate=Number(this.state.interestRate).toLocaleString("en-US", {minimumFractionDigits:2})
        let paymentAmount=Number(this.state.paymentAmount).toLocaleString("en-US", {minimumFractionDigits:2})
        let interestPortion=Number(this.state.interestPortion).toLocaleString("en-US", {minimumFractionDigits:2})
        let principalPortion = Number(this.state.principalPortion).toLocaleString("en-US", {minimumFractionDigits:2})
        let sumPrincipalPayments = Number(this.state.sumPrincipalPayments).toLocaleString("en-US", {minimumFractionDigits:2})
        let bpLoanBal = Number(this.state.bpLoanBal).toLocaleString("en-US", {minimumFractionDigits:2})
        let nextMinimumPayment = Number(this.state.nextMinimumPayment).toLocaleString("en-US", {minimumFractionDigits:2})
        let paymentHistory = this.state.paymentHistory
        let nextMinPrincipal = Number(this.state.nextMinPrincipal).toLocaleString("en-US", {minimumFractionDigits:2})
        let nextInterest = Number(this.state.nextInterest).toLocaleString("en-US", {minimumFractionDigits:2})

        return (
            <div className="items">
                <div className = "inputSection">
                    <h1 className="loanInfoText">Loan Information</h1>
                    <p className="loanInfoText">Enter your loan balance and interest.</p> 
                    <div className = "inputDiv">
                        <Input htmlFor="initialLoanAmount" className = "input" id="initialLoanAmount" label="Initial Loan Amount" value={initialLoanAmount} inputHandler={this.inputHandler} prefix="$"/>
                        <Input htmlFor="interestRate" className = "input" id="interestRate" label="Interest Rate" value = {interestRate} inputHandler={this.inputHandler} suffix="%"/>
                    </div>             
                </div>

                <div className = "paySumulator">
                    <h1 className="paymentText">Payment Processing</h1>
                    <div className="loanSummary">
                        <CalculatedField label="Loan Amount" value={initialLoanAmount} className="loanSummaryLabel" className2= "LoanSummaryData" className3 ="payAmountDiv"/>
                        <CalculatedField label="Yearly Rate" value={this.state.interestRate} suffix="%" className="loanSummaryLabel" className2= "LoanSummaryData" className3 ="payAmountDiv"/>
                        <CalculatedField label="Monthly Rate" value={interestRate} suffix="%" className="loanSummaryLabel" className2= "LoanSummaryData" className3 ="payAmountDiv"/>
                    </div>
                    <Payment htmlFor="paymentAmount" id="paymentAmount" nextMinPay={nextMinimumPayment} nextMinPrincipal = {nextMinPrincipal} nextInterest={nextInterest} label="Payment Amount" value = {paymentAmount} inputHandler={this.paymentHandler}/>

                    <div className="paymentSummarySection">
                        <div className="paySummaryHeading">Last Payment Details</div>
                        <CalculatedField label="Starting Loan Balance" value={bpLoanBal} className="calcAmountDivLabel" className2= "payData" className3 ="calcAmountDiv"/>
                        <CalculatedField label="Payment Amount" value={paymentAmount} className="calcAmountDivLabel" className2= "payData" className3 ="calcAmountDiv"/>
                        <CalculatedField label="Interest Charged" value={interestPortion} className="calcAmountDivLabel" className2= "payData" className3 ="calcAmountDiv"/>
                        <CalculatedField label="Principal Paydown" value={principalPortion} className="calcAmountDivLabel" className2= "payData" className3 ="calcAmountDiv"/>
                        <CalculatedField label="Principal Paid To Date" value={sumPrincipalPayments} className="calcAmountDivLabel" className2= "payData" className3 ="calcAmountDiv"/>
                        <CalculatedField label="Ending Loan Balance" value={loanBalance} className="calcAmountDivLabel" className2= "payData" className3 ="calcAmountDiv"/>                    
                    </div>
                </div>

                <PaymentHistory payHistory = {paymentHistory}/>
                <StandardSchedule loanBalance = {this.state.initialLoanAmount} interestRate = {this.state.interestRate} minPayment = {this.state.minimumPrincipal}/>
                
            </div>
    
        );
    }  
}

export default AllFields