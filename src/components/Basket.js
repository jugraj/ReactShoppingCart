import React, {Component, PropTypes} from 'react';
import "./basket.css";
import PubSub from 'pubsub-js';

class Basket extends Component{
    
    static propTypes ={
        name:PropTypes.string,
        price:PropTypes.number
     
    }
    
    componentWillMount =()=>{
        PubSub.subscribe( 'Basket.UPDATE', this.update );
        this.setState({pricePromotion:this.props.price});
    }
    
    constructor(){
        super();
    }
     
    state = {
        quantity:1,
        pricePromotion:0
    }
    
    update = (msg,data) =>{
//        console.log('quantity');
        let {quantity,pricePromotion} = this.state;
        let newPrice = 0;
        if(data.name === this.props.name){
            quantity = quantity+1;
            pricePromotion = this.props.price*quantity;
            this.setState({quantity:quantity,pricePromotion:pricePromotion});
            if(data.name ==='Papaya'){
            if(quantity%3===0){
                console.log('BUY 2 get 1 free '+quantity);
                
//                pricePromotion = pricePromotion - this.props.price;
//                this.setState({pricePromotion:pricePromotion})
            }
        }
        }
        
    }
    
    render(){
        
        return(
            <div>
                <ul>
                <li className="item-name">{this.props.name} £{parseFloat(this.props.price).toFixed(2)}/each x {this.state.quantity}</li>
                <li className="price-point">£{parseFloat(this.state.pricePromotion).toFixed(2)}</li>
                
                </ul>
            </div>
        )
    }
}

export default Basket;