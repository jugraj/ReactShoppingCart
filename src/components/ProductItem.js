import React, {Component, PropTypes} from 'react';
import './product.css';
import $ from 'jquery';
import PubSub from 'pubsub-js';
import apples from '../images/apples.jpg';
import bananas from '../images/bananas.jpg';
import oranges from '../images/oranges.jpg';
import papaya from '../images/papaya.jpg';

class ProductItem extends Component{
    constructor(){
        super();
    }
    
    static propTypes = {
        data: PropTypes.object,
        img: PropTypes.string
    }
    
    
    
    add = () =>{
        PubSub.publish( 'Basket.ADD', this.props.data );
    }
  
    render(){
        const {data} = this.props;
        
        let imageType = "";
        
        switch(this.props.img){
            case "apples":
                imageType = apples;
                break;
                case "bananas":
                imageType = bananas;
                break;
                case "oranges":
                imageType = oranges;
                break;
                case "papaya":
                imageType = papaya;
                break;
        }
        
//        console.log('this.props.img '+this.props.img)
        return(
                    <div className="panel panel-default" onClick={this.add.bind(this)}>
                        <div className="panel-header">{data.name}</div>
                        <div className="panel-body"><img src={imageType}></img></div>
                        <div className="panel-footer"><div>£ {parseFloat(data.price).toFixed(2)}</div><button className="btn btn-md btn-default">Add to basket</button></div>
                    </div>
               
        )
    }
    
}

export default ProductItem;