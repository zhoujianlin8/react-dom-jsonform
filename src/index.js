/**
 * Created by zhou on 17/3/1.
 * 总体有个数据提交数据 data = {name:value};
 *
 * ｛
 *      type: 'div'
 *      data: {
 *          name1: 'xxxx',
 *          name2: ''
 *      },
 *      children: [
 *          {
 *              type: 'xx',
 *              //绑定双向数据
 *              state: {
 *                  value: '$data.name1' // $data.name1,
 *                  name: '$data.name2', //
 *              }
 *              // 通过setState可以修改
 *              setState (obj,cb){
 *                   this.extend(obj);
 *              }
 *              ...props
 *          },{
 *              type: 'xx',
 *              //绑定数据
 *              state: {
 *                  value: $data.name2  //data.$name1,
 *              }
 *              ...props
 *          }
 *      ]
 * ｝
 *
 */
import React,{Component} from 'react';
import Engine from 'react-dom-json';
import Message from 'message-event';
let components = {};
/*class EditComponents extends Component{
 render(){
 const {children,type,...props} = this.props;
 return(
 <div {...props}>{children}</div>
 )
 }
 }*/


const ValidKey = Symbol('validator');
class ReactJsonFrom extends Engine {
    constructor(...props){
        super(...props);
        this.state = this._changeData(this.props.state);
        this.message = new Message();
        const on = this.message.on;
        //直接通过props去拦截
        this.message.on = (type,...prop)=>{
            const newType = type;
            if(type && typeof type === 'string'){
                type = type.replace('on','');
                type = type.charAt(0).toUpperCase() + type.slice(1); //
                type = 'on'+type; //添加on
                props[type] && props[type](...prop);
            }
            on.apply(this.message,[newType,...prop]);
        };
    }
    /*  _preGuide = 'g_'+new Date().getTime()+'_';
     _n: 0;
     _key: '$$id';*/
    get propsState() {
        return this.state;
    }
    /*  get _guide(){
     return this._preGuide + this._n++;
     }*/
    get data(){
        return this.state.data;
    }
   /* get message (){
        return new Message();
    } */
    _changeData(obj = {}){
        let data = {};
        let $state = {};
        if(this.isObj(obj)){
            obj = Object.assign({},obj); //复制
            data = obj.data || {};
            $state = obj.state || {};
            itemObj.apply(this,[obj]);
        }else{
            return {
                state: {},
                data: {}
            }
        }
        function itemObj(objItem){
            if(this.isObj(objItem.state) ){
                for(const key in objItem.state){
                    const value = objItem.state[key];
                    if(value && typeof value === 'string'){
                        if( value.indexOf('$data.') === 0){
                            let dataKey = value.replace('$data.','');
                            objItem.state[key] = data[dataKey];
                            bindData(objItem.state,key,dataKey);
                        }else if(value.indexOf('$state.') === 0){
                            let dataKey = value.replace('$state.','');
                            objItem.state[key] = data[dataKey];
                            bindState(objItem.state,key,dataKey);
                        }
                    }
                }
            }
            if(objItem.children && this.isArray(objItem.children) && objItem.children.length){
                objItem.children.forEach((item)=>{
                    item && itemObj.apply(this,[item]);
                })
            }
        }

        function bindData(obj,key,dataKey) {
            Object.defineProperty(obj,key,{
                set:(value)=>{
                    data[dataKey] = value; //保持统一
                    return value;
                },
                get: ()=>{
                    return data[dataKey];//以data内的值
                }
            });
        }
        function bindState(obj,key,dataKey) {
            Object.defineProperty(obj,key,{
                set:(value)=>{
                    $state[dataKey] = value; //保持统一
                    return value;
                },
                get: ()=>{
                    return $state[dataKey];//以data内的值
                }
            });
        }
        obj.state = $state;
        obj.data = data;
        return obj;
    }
    isObj(obj){
        return Object.prototype.toString.call(obj) === '[object Object]';
    }
    //通过该方法后续动态修改state
    resetState(data) {
        this.state = this._changeData(data);
        this.setState({});
        return this;
    }
    get components() {
        return components
    }
    //验证状态
    checkValid(){
        const listeners = this.message._listeners[ValidKey];
        let arr = [];
        listeners.forEach((fn)=>{
            fn && arr.push(fn());
        });
        return new Promise.all(arr);
    }
    getItemProps(obj = {}, isCom) {
        let props = {};
        const fire = this.message.fire.bind(this.message);
        for (var key in obj) {
            if (key && key !== 'type' && key !== 'children') {
                const type = obj[key];
                if (type && /^on[A-Z]/g.test(key)) {
                    //使用fire模式
                    if (typeof type === 'string') {
                        props[key] = (...env)=> {
                            fire(type, obj, ...env);
                        }
                    } else {
                        props[key] = type;
                    }
                } else {
                    props[key] = obj[key]
                }
            }
        }
        if(isCom){
            props.state = obj.state;
            props.setState = (item, cb)=> {
                obj.state = Object.assign(obj.state, item);
                this.setState({}, cb);
            };
            props.fire = fire;
            //监听是
            props.onValid = (fn)=>{
                const Valid = ()=>{
                    return fn();
                };
                this.message.on(ValidKey,Valid);
                return ()=>{
                    this.message.off(ValidKey,Valid)
                }
            };
        }else{
            delete props.state
        }
        return props
    }
  /*  componentDidMount(){
        const {onOk,onCancel} = this.props;
        this.message.on('onOk',()=>{
            onOk && onOk(this);
        }).on('onCancel',()=>{
            onCancel && onCancel(this);
        })

    }*/
    componentWillUnmount(){
        this.message = null;
    }
}
export default ReactJsonFrom;

//注册components
const register = function (obj = {}, value) {
    if (typeof obj === 'string' && value) {
        components[obj] = value
    }
    if (obj && typeof obj === 'object') {
        components = Object.assign(components, obj);
    }
};
export {register}
