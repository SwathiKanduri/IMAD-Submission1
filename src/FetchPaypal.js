import React from 'react';
import ReactDOM from 'react-dom';
import paypal from 'paypal-checkout';
import Cart from './Cart.js';


const PayPalButton = paypal.Button.driver('react', {React, ReactDOM});


const create_payment_url="'https://app.antitank89.hasura-app.io/payment";                   // url for creating payment i.e. payment() method
const execute_payment_url="https://app.antitank89.hasura-app.io/execute";             // url for executing payment i.e. authorize() method

export default class FetchPaypal extends React.Component {

    payment(){
       
        fetch(create_payment_url, {
                method: 'POST',
                headers : new Headers(),
            }).then((res) => res.json())
            .then((data) => console.log(data.paymentID))
            .catch((err)=>console.log(err))
    }

    onAuthorize(data){
        // post the payment ID, payer ID to the server so that, it takes these params
        // and then executes the payment. 
        // and write a then(function) to show a confirmation page etc,. if u want
        var send_data = {
            paymentID: data.paymentID,
            payerID: data.payerID
        };
        fetch(execute_payment_url, {
            method: 'POST',
            body: JSON.stringify(send_data),
            headers : new Headers(),
        }).then((res) => res.json())
        .then((data) => { console.log('payment is executed successfully')
                          console.log(data.paymentID) 
                          console.log(data.payertID)    
        })
        .catch((err)=>console.log(err))
       
    }

    render() {
        return (
            <div >
                <div> <span> <p> <i> please enter the total payment amount: </i> </p>   </span>
                      <span> <input name="amt_input" id="amt_input_id" type="number" />  </span>
                </div> &nbsp; &nbsp; 
                <div> 
                  <Cart />
                </div>
                <PayPalButton 
                   
                    payment={this.payment}
                    onAuthorize={this.onAuthorize}
                />       
            </div>
        );
    }
}
