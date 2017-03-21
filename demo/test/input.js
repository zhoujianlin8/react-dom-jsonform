/**
 * Created by zhou on 17/3/21.
 */

/**
 * Created by zhou on 17/2/24.
 */
import React,{Component} from 'react';
class Input extends Component{
    static defaultProps = {
        state: {}, //{type: 1,children: []}
        setState: ()=>{},
        fire: ()=>{},
    };
    render(){
        const state = this.props.state || {};
        return (<div className="input">
            <input value={state.value} onChange={this.onChange.bind(this)}/>
        </div>)
    }
    onChange(e){
        this.props.setState({
            value: e.target.value
        });
    }
}
export default Input;
