import React, {Component} from 'react';
import products from "../data/products";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import TweenMax,{Cubic} from 'gsap';


import './product.css';
import Basket from "./Basket";
import ProductItem from "./ProductItem";
import PubSub from 'pubsub-js';

class ProductList extends Component{
    state = {
        numItems : [],
        totalProducts:[],
        totalAmount:0,roundedOff:""
    }
    
    componentWillMount = ()=> { 
        // Triggered from ProductItem
        PubSub.subscribe( 'Basket.ADD', this.itemClicked );
    }
    
    itemClicked = (msg, data) => {

            let {numItems,totalProducts, totalAmount,roundedOff} = this.state;
            
            totalAmount = totalAmount+data.price;
            
            roundedOff = parseFloat(totalAmount).toFixed(2);
            if(numItems.indexOf(data)===-1){
                numItems.push(data);
            }else{
                this.updateQuantity(data);
            }
        
            totalProducts.push(data); 
            this.setState({numItems:numItems,totalAmount:totalAmount,roundedOff:roundedOff,totalProducts:totalProducts});
        
    }
    
    updateQuantity = (data)=>{
        PubSub.publish( 'Basket.UPDATE', data );
    }
    
    addToBasket = (items,i)=>{
        const {numItems} = this.state;
        return(
            <Basket ref ={items.name} key = {'basketID_'+i} 
            name = {items.name} price={items.price}/>
                );
//                } 
//            }
//        }
        
    }
    
    closeBasket = event =>{
        
        TweenMax.to(document.getElementById('basket-holder'),.5,{css:{top:-document.getElementById('basket-holder').offsetHeight+"px",autoAlpha:0},ease:Cubic.easeIn});
    }
    
    openBasket = event =>{
        
        TweenMax.to(document.getElementById('basket-holder'),.5,{css:{top:"0px",autoAlpha:1},ease:Cubic.easeOut});
    }
    

    render(){
        
        const product = products.map(function(item,i){
            
            return(<div key={item.id} className='col-sm-3'><ProductItem data={item} img={item.image}>
                </ProductItem>
                   </div>
            )
            
        });
        
        return(<div>
                    <div>{product}</div>
                    <div type="button" className='basket-icon' onClick={this.openBasket.bind(this)}>Basket {this.state.totalProducts.length===0?"":"("+this.state.totalProducts.length+")"}</div>
                    <div id='basket-holder' >
                        <button type="button" className="close-btn" onClick={this.closeBasket.bind(this)}>X</button>
            <div id='basketsItems' className="collapsed">
                        {this.state.numItems.map(this.addToBasket)}
                    <hr></hr>
                    <div className="total-amount">Total: £ {this.state.roundedOff}</div>
                    <div className="items-amount">Num of Items: {this.state.totalProducts.length}</div>
                    </div>
                    </div>

               </div>
            )
    }
}
export default ProductList;