
## react-json-form 模块
```
npm install react-json-form  --save
```
* react-json-dom  render  use json to the dom

## 使用

````
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import Engine,{register} from '../src/index';
import Input from './test/input';
import Group from './test/group';
register({
    Input,
    Group
});
class Edit extends Component {
    static defaultProps = {
        state: {},
        setState: ()=> {},
        fire: ()=> {}
    };
    getState() {
        return {
            type: 'div',
            state: {},
            data: this.props.state,
            children: this.children
        }
    }
    //重写
    children = [
        {
            type: "Input",
            state: {
                value: '$data.name',
            }
        },{
            type: "Group",
            state: {
                value: '$data.age',
                name: '$data.name'
            }
        }
    ];
    render() {
        return (
            <Engine state={this.getState()} ref="engine" onOk={this.onOk.bind(this)} onCancel = {this.onCancel.bind(this)}/>
        )
    }

    componentDidMount() {
        const engine = this.refs.engine;
        this.engine = engine;
        this.listens(engine, engine.message)
    }
    onOk(engine){
        engine.checkValid().then(()=>{
            this.fetchData();
        })
    }
    fetchData(data){
        this.props.setState(data || this.engine.data)
    }
    onCancel(){
        this.props.fire('OnEditCancel')
    }
}

ReactDOM.render(<Edit />, document.getElementById('container'));

````


＊ 详细使用请看demo



