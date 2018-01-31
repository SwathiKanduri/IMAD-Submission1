import React from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, } from 'material-ui/Table';
import PropTypes from 'prop-types';


const btn_style={             // to change the cursor pointer to hand shape when hover over button
    cursor:"pointer"
}

export default class Product extends React.Component{
    constructor(props){
        super(props);
        this.state={ count:1, }             // initial state of the count 
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

    calc(){                         // as we took count variable to display the qunatity, we multiplied price and count
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
                            <TableRowColumn>{this.props.name}</TableRowColumn>
                            <TableRowColumn>{this.props.description}</TableRowColumn>
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