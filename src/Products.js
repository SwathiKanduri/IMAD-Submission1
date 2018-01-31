import React from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, } from 'material-ui/Table';
import PropTypes from 'prop-types';
import './App.css';


const btn_style={
    cursor:"pointer"
}


export default class Product extends React.Component{
    constructor(props){
        super(props);
        this.state={ count:1,
        }
    }
    

    addOne() {                                                       // adds one item when button clicked                                  
            this.setState(prevState => {
          return {count : prevState.count + 1 }
         });
        }
    
       removeOne() {                                                 // removes one item when button clicked
        this.setState(prevState => {
            if(prevState.count>=1) {
          return { count : prevState.count - 1 }
            }
            else{
                alert('quantity cant be less than zero')
            }
         });
       }

       calculate(){
      //  var qty=document.getElementById('qty_div').value;
        //var qty1=Number(qty);
        // console.log(qty);
        let qty = document.getElementById('qty_div').innerHTML;
        let result = qty.match(/\d+/g);
        console.log(result[0]);
        let sub_price_value=document.getElementById("price_row").innerHTML;
        let sub_price= sub_price_value.match(/\d+/g);
        let sub_price_result=sub_price[0];
       console.log(sub_price_result);
    }

    calc(){
           // let qty = document.getElementById('qty_div').innerHTML;
          //  let result = qty.match(/\d+/g);
         // var subtotal= Number(this.props.price * result).toFixed(2);
            var subtotal= Number(this.props.price * this.state.count).toFixed(2);
            console.log(subtotal);
            return subtotal;
          }

    render(){
        return(
            <div>
                <Table >
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false} >
                        <TableRow>
                            <TableHeaderColumn></TableHeaderColumn>
                            <TableHeaderColumn></TableHeaderColumn>
                            <TableHeaderColumn></TableHeaderColumn>
                            <TableHeaderColumn></TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false} >
                        <TableRow >
                            <TableRowColumn><img src={this.props.src}  width="70" height="70" 
                                alt={this.props.alt} className="zoom" />
                             </TableRowColumn>
                            <TableRowColumn>{this.props.name}<br/> {this.props.description}</TableRowColumn>
                            <TableRowColumn id="price_row" >Price per each item:<br/> {this.props.price} <br/>
                            <button style={btn_style} onClick={this.calc.bind(this)}> Sub Total </button>
                          { /* <span id="show_subtotal"> {this.calc.bind(this)} </span> */}
                            </TableRowColumn>
                            <TableRowColumn>
                            <input style={btn_style} type='button' onClick={this.addOne.bind(this)} value='add an item'/>
                            <input style={btn_style} type='button' onClick={this.removeOne.bind(this)} value='remove an item'/>
                                <br/> <div> quantity: </div> <div id="qty_div" > {this.state.count}  </div> 
                            </TableRowColumn>
                        </TableRow>
                    </TableBody>
                 </Table>
            </div>
        );
    }
}

Product.propTypes={
    name:PropTypes.string,
    price:PropTypes.number,
    description:PropTypes.description,

};
