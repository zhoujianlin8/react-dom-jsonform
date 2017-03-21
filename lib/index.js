'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.register = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDomJson = require('react-dom-json');

var _reactDomJson2 = _interopRequireDefault(_reactDomJson);

var _messageEvent = require('message-event');

var _messageEvent2 = _interopRequireDefault(_messageEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
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


var components = {};
/*class EditComponents extends Component{
 render(){
 const {children,type,...props} = this.props;
 return(
 <div {...props}>{children}</div>
 )
 }
 }*/

var ValidKey = Symbol('validator');

var ReactJsonFrom = function (_Engine) {
    _inherits(ReactJsonFrom, _Engine);

    function ReactJsonFrom() {
        var _ref;

        for (var _len = arguments.length, props = Array(_len), _key = 0; _key < _len; _key++) {
            props[_key] = arguments[_key];
        }

        _classCallCheck(this, ReactJsonFrom);

        var _this = _possibleConstructorReturn(this, (_ref = ReactJsonFrom.__proto__ || Object.getPrototypeOf(ReactJsonFrom)).call.apply(_ref, [this].concat(props)));

        _this.state = _this._changeData(_this.props.state);
        _this.message = new _messageEvent2.default();
        var on = _this.message.on;
        //支持直接通过props去拦截
        _this.message.on = function (type) {
            for (var _len2 = arguments.length, prop = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                prop[_key2 - 1] = arguments[_key2];
            }

            var newType = type;
            if (type && typeof type === 'string') {
                type = type.replace('on', '');
                type = type.charAt(0).toUpperCase() + type.slice(1); //
                type = 'on' + type; //添加on
                props[type] && props[type].apply(props, prop);
            }
            on.apply(_this.message, [newType].concat(prop));
        };
        return _this;
    }
    /*  _preGuide = 'g_'+new Date().getTime()+'_';
     _n: 0;
     _key: '$$id';*/


    _createClass(ReactJsonFrom, [{
        key: '_changeData',

        /* get message (){
             return new Message();
         } */
        value: function _changeData() {
            var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            var data = {};
            var $state = {};
            if (this.isObj(obj)) {
                obj = Object.assign({}, obj); //复制
                data = obj.data || {};
                $state = obj.state || {};
                itemObj.apply(this, [obj]);
            } else {
                return {
                    state: {},
                    data: {}
                };
            }
            function itemObj(objItem) {
                var _this2 = this;

                if (this.isObj(objItem.state)) {
                    for (var key in objItem.state) {
                        var value = objItem.state[key];
                        if (value && typeof value === 'string') {
                            if (value.indexOf('$data.') === 0) {
                                var dataKey = value.replace('$data.', '');
                                objItem.state[key] = data[dataKey];
                                bindData(objItem.state, key, dataKey);
                            } else if (value.indexOf('$state.') === 0) {
                                var _dataKey = value.replace('$state.', '');
                                objItem.state[key] = data[_dataKey];
                                bindState(objItem.state, key, _dataKey);
                            }
                        }
                    }
                }
                if (objItem.children && this.isArray(objItem.children) && objItem.children.length) {
                    objItem.children.forEach(function (item) {
                        item && itemObj.apply(_this2, [item]);
                    });
                }
            }

            function bindData(obj, key, dataKey) {
                Object.defineProperty(obj, key, {
                    set: function set(value) {
                        data[dataKey] = value; //保持统一
                        return value;
                    },
                    get: function get() {
                        return data[dataKey]; //以data内的值
                    }
                });
            }
            function bindState(obj, key, dataKey) {
                Object.defineProperty(obj, key, {
                    set: function set(value) {
                        $state[dataKey] = value; //保持统一
                        return value;
                    },
                    get: function get() {
                        return $state[dataKey]; //以data内的值
                    }
                });
            }
            obj.state = $state;
            obj.data = data;
            return obj;
        }
    }, {
        key: 'isObj',
        value: function isObj(obj) {
            return Object.prototype.toString.call(obj) === '[object Object]';
        }
        //通过该方法后续动态修改state

    }, {
        key: 'resetState',
        value: function resetState(data) {
            this.state = this._changeData(data);
            this.setState({});
            return this;
        }
    }, {
        key: 'checkValid',

        //验证状态
        value: function checkValid() {
            var listeners = this.message._listeners[ValidKey];
            var arr = [];
            listeners.forEach(function (fn) {
                fn && arr.push(fn());
            });
            return new Promise.all(arr);
        }
    }, {
        key: 'getItemProps',
        value: function getItemProps() {
            var _this3 = this;

            var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var isCom = arguments[1];

            var props = {};
            var fire = this.message.fire.bind(this.message);
            for (var key in obj) {
                if (key && key !== 'type' && key !== 'children') {
                    (function () {
                        var type = obj[key];
                        if (type && /^on[A-Z]/g.test(key)) {
                            //使用fire模式
                            if (typeof type === 'string') {
                                props[key] = function () {
                                    for (var _len3 = arguments.length, env = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                                        env[_key3] = arguments[_key3];
                                    }

                                    fire.apply(undefined, [type, obj].concat(env));
                                };
                            } else {
                                props[key] = type;
                            }
                        } else {
                            props[key] = obj[key];
                        }
                    })();
                }
            }
            if (isCom) {
                props.state = obj.state;
                props.setState = function (item, cb) {
                    obj.state = Object.assign(obj.state, item);
                    _this3.setState({}, cb);
                };
                props.fire = fire;
                //监听是
                props.onValid = function (fn) {
                    var Valid = function Valid() {
                        return fn();
                    };
                    _this3.message.on(ValidKey, Valid);
                    return function () {
                        _this3.message.off(ValidKey, Valid);
                    };
                };
            } else {
                delete props.state;
            }
            return props;
        }
        /*  componentDidMount(){
              const {onOk,onCancel} = this.props;
              this.message.on('onOk',()=>{
                  onOk && onOk(this);
              }).on('onCancel',()=>{
                  onCancel && onCancel(this);
              })
           }*/

    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.message = null;
        }
    }, {
        key: 'propsState',
        get: function get() {
            return this.state;
        }
        /*  get _guide(){
         return this._preGuide + this._n++;
         }*/

    }, {
        key: 'data',
        get: function get() {
            return this.state.data;
        }
    }, {
        key: 'components',
        get: function get() {
            return components;
        }
    }]);

    return ReactJsonFrom;
}(_reactDomJson2.default);

exports.default = ReactJsonFrom;

//注册components

var register = function register() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var value = arguments[1];

    if (typeof obj === 'string' && value) {
        components[obj] = value;
    }
    if (obj && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object') {
        components = Object.assign(components, obj);
    }
};
exports.register = register;