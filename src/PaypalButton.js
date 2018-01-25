import React from 'react';
import ReactDOM from 'react-dom';
// import DialogBox from './DialogBox';

import paypal from 'paypal-checkout';

const PayPalButton = paypal.Button.driver('react', {React, ReactDOM});


export default class PayPalCheckout extends React.Component {

    onAuthorize(data, actions) {
        console.log('authorizing method is called here');
        // Optional: display a confirmation page here
        // Display the payment details and a confirmation button
    

        return actions.payment.get().then(function(data) {

            // Display the payment details and a confirmation button

            var shipping = data.payer.payer_info.shipping_address;

            document.querySelector('#recipient').innerText = shipping.recipient_name;
            document.querySelector('#line1').innerText     = shipping.line1;
            document.querySelector('#city').innerText      = shipping.city;
            document.querySelector('#state').innerText     = shipping.state;
            document.querySelector('#zip').innerText       = shipping.postal_code;
            document.querySelector('#country').innerText   = shipping.country_code;

           // document.querySelector('#paypal-button-container').style.display = 'none';
            document.querySelector('#confirm').style.display = 'block';

            // Listen for click on confirm button

           document.querySelector('#confirmButton').addEventListener('onClick', (e) => {
               console.log('confirm button event class is called');
                 // document.querySelector('#confirmButton').addEventListener('click', function() {

                // Disable the button and show a loading message

                document.querySelector('#confirm').innerText = 'Loading...';
                document.querySelector('#confirm').disabled = true;

                // Execute the payment

                return actions.payment.execute().then(function() {

                    // Show a thank-you note

                    document.querySelector('#thanksname').innerText = shipping.recipient_name;
                    document.querySelector('#confirm').style.display = 'none';
                    document.querySelector('#thanks').style.display = 'block';  
                });
            });
    });
            
    }

   
    payment() {

        var inputamt=document.getElementById("amt_input_id").value;
        if(inputamt.length<=0 || inputamt<=0){
           alert('ttrueempty, zero or any string, Please enter a valid amount ');
          //  <DialogBox/>
            return true;
        }
        else{
            const env = this.props.env;
            const client = this.props.client;
            console.log('payment method is called here')
            return paypal.rest.payment.create(env, client, {
                transactions: [
                    {
                    
                        amount: {total: inputamt, currency: 'INR'}
                    }
                ]
            }); 
        }
    }
 
                  /* add this code above amount line in transactins */
    /*  item_list: {
                        items: [
                            {
                            name: "hat",
                            description: "Brown hat.",
                            price: '3',
                            currency: 'USD',
                            quantity: "1",
                            tax: "0.00",
                            "sku": "1",
                            },
                            {
                                name: "handbag",
                                description: "Black handbag.",
                                price: '7',
                                currency: 'USD',
                                quantity: "1",
                                tax: "0.00",
                                sku: "item 2",  
                            }
                        ],
                        shipping_address: {
                            recipient_name: "Brian Robinson",
                            line1: "4th Floor",
                            line2: "Unit #34",
                            city: "San Jose",
                            country_code: "US",
                            postal_code: "95131",
                            phone: "011862212345678",
                            state: "CA"
                        }   
                    },*/

    render() {
        const client = {
              //sandbox:'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R'
           sandbox:'AUe1MOE728ao0-krDiGyQ9vrWwPhcPtRCKob0sljLA9d_UjKdqRh7ZRQAq6_LUX1XwKJr-JjkFKBStQ9' // my sandbox app client id
        };

        return (
            <div>
                    <div> <span> <p> <i> please enter the total payment amount: </i> </p>   </span>
                      <span> <input name="amt_input" id="amt_input_id" type="number" />  </span>
                    </div> &nbsp; &nbsp; 
                            <PayPalButton env={'sandbox'}
                            client={client}
                            payment={this.payment}
                            commit={true} // Optional: show a 'Pay Now' button in the checkout flow
                            onAuthorize={this.onAuthorize}/>
                <div >  {/* id="paypal-button-container" */} &nbsp; &nbsp; &nbsp; 
                    <div id="confirm" className="hidden" > 
                        <div>Shipping to:</div>
                        <div><span id="recipient"></span>, <span id="line1"></span>, <span id="city"></span></div>
                        <div><span id="state"></span>, <span id="zip"></span>, <span id="country"></span></div>      
                        &nbsp; &nbsp; &nbsp;  <button id="confirmButton">Complete Payment</button>
                    </div>
                    <div id="thanks" className="hidden">
                         Thanks, <span id="thanksname"></span>!
                    </div>
                </div>
            </div>
        );
    }
}


   {/* 
        <div>
        <div id="paypal-button-container"></div>
        
            <script>

                paypal.Button.render({
        
                    env= 'sandbox', // sandbox | production
        
                    // PayPal Client IDs - replace with your own
                    // Create a PayPal app: https://developer.paypal.com/developer/applications/create
                    client= {
                        sandbox:"AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R",
                        production: '<insert production client id>'
                    },
        
                    // Show the buyer a 'Pay Now' button in the checkout flow
                    commit= 'true',
        
                    // payment() is called when the button is clicked
                    payment= (data, actions) => {
        
                        // Make a call to the REST api to create the payment
                        return actions.payment.create({
                            payment: {
                                transactions: [
                                    {
                                        amount: { total: '0.01', currency: 'USD' }
                                    }
                                ]
                            }
                        }); );
                    },
        
                    // onAuthorize() is called when the buyer approves the payment
                    onAuthorize: function(data, actions) {
        
                        // Make a call to the REST api to execute the payment
                        return actions.payment.execute().then(function() {
                            window.alert('Payment Complete!');
                        });
                    }
        
                }, '#paypal-button-container');
        
            </script>
</div>









        
     let env='sandbox';
        let client = {
            sandbox:'A8vyPPy7mObxAPq5psJu6mY0fl34ASSoy89L7rBhFu6DB74pRimF3Jv1'
         };

         let payment = () => {
            // ...
            console.log('on authorize func called');
        };
    
       let onAuthorize = (data, actions) => {
          console.log('on authorize func called');
        };
		
        let PayPalButton = paypal.Button.driver('react', { React, ReactDOM });

        return (<div className='shoppingCart'>
            <p>Buy <strong>Full Body Lobster Onesie - $24.99</strong> now!</p>

            <PayPalButton
                client={client}
                payment={payment}
                commit='true'
                onAuthorize={onAuthorize} />
        </div>);  */}