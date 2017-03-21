
/**
 * Created by zhou on 17/3/21.
 */
/**
 * Created by zhou on 17/2/24.
 */
import React,{Component} from 'react';
class Group extends Component{
    static defaultProps = {
        state: {}, //{type: 1,children: []}
        setState: ()=>{},
        fire: ()=>{},

    };
    render(){
        const state = this.props.state || {};
        return (<div className="group" onClick={this.onClick.bind(this)}>
            onClick
            {state.name}
            {state.value}
        </div>)
    }
    onClick(){
        this.props.fire('changeInput',this.props.state)
    }
}
export default Group;
