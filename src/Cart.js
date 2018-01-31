import React from 'react';
import Paper from 'material-ui/Paper';
import Product from './Products';


const style = {
    height: 600,
    width: 900,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
  };
  
  let Products=[
    {
        id:1, name:"Fastrack Women's Watch", 
        description:"Analog Pink Dial Women's Watch - 6150SM04",
        price:2500
    },
    {
        id:2, name:"Fastrack Women's Watch", 
        description:"Analog Pink Dial Women's Watch - 6150SM04",
        price:2100
    },
    {
        id:3, name:"Fastrack Women's Watch", 
        description:"Analog Pink Dial Women's Watch - 6150SM04",
        price:1800
    },
    
];

  
export default class Cart extends React.Component{
 
    calculateTotal(){
        var qty=document.getElementById("qty_div").value;
        return Number(this.props.price * this.props.qty).toFixed(2);
    }

render(){
    return(
        <div> 
            <Paper style={style} zDepth={1} > 
                <div> 
                    <div>
                        <h3> here are the products ! </h3>
                    </div> <hr/>
                    <div>
                        {Products.map(productlist =>{    
                           return <Product  key={productlist.id} name={productlist.name}
                            description={productlist.description} price={productlist.price} />
                        })} 

                    </div>
                </div>
                
            </Paper>
        </div>
    );
}
}
    