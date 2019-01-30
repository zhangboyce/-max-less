'use strict';
import React, { Component } from 'react';
import ConsumerFormPart from './ConsumerFormPart';
import OrderFormPart from './OrderFormPart';
import GlassesFormPart from './GlassesFormPart';
import DegreeFormPart from './DegreeFormPart';
import { Card, CardFooter,CardHeader, CardBody, Input, Button, Row, Col } from "reactstrap"
import NotificationAlert from "react-notification-alert";
import $ from 'jquery';
import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = this.initState();
    }

    componentDidMount() {
        let updateOrder = this.props.order;
        if (updateOrder) {
            let initOrder = this.initState().order;

            let newOrder = Object.assign({}, initOrder, updateOrder);
            newOrder.orderTime = moment(newOrder.orderTime).format('YYYY-MM-DD HH:mm:ss');

            let consumer = updateOrder.consumer;
            if (consumer) {
                newOrder.name = consumer.name;
                newOrder.phone = consumer.phone;
                newOrder.sex = consumer.sex;
                newOrder.channel = consumer.channel;
                newOrder.balance = consumer.balance;
            }
            this.setState({ order: newOrder });
        }
    }

    initState = () => {
        return {
            order: {
                name: '',
                phone: '',
                sex: '',
                channel: '',
                balance: 0,

                leftMyopiaDegree: '',
                rightMyopiaDegree: '',
                leftAstigmatismDegree: '',
                rightAstigmatismDegree: '',
                leftAstigmatismAxis: '',
                rightAstigmatismAxis: '',

                price: null,
                orderTime: moment().format("YYYY-MM-DD HH:mm:ss"),
                address: '',
                payType: '',
                orderStatus: '',
                revisitStatus: '',
                serviceUserId: '',

                lensBrand: '',
                lensDesc: '',
                lensFunc: '',
                lensRefractivity: '',
                glassesFrame: '',
                pupilDistance: '',
                frameAndCleadingWeight: '',
                cleadingWeight: '',
                glassesWeight: '',
                remarks: '',
            },
            validation: {
                // ConsumerFormPart
                name: this.isRequired(),
                phone: this.isPhone(),
                sex: this.isRequired(),
                channel: this.isRequired(),
                balance: this.isNumber(),

                // DegreeFormPart
                leftMyopiaDegree: this.isNumber(),
                rightMyopiaDegree: this.isNumber(),
                leftAstigmatismDegree: this.isNumber(),
                rightAstigmatismDegree: this.isNumber(),
                leftAstigmatismAxis: this.isNumber(),
                rightAstigmatismAxis: this.isNumber(),

                // OrderFormPart
                price: this.isRequiredNumber(),
                orderTime: {
                    isValidated: true,
                    isValid: true,
                    // YYYY-MM-DD hh:mm
                    regex: /^20\d{2}(\-\d{1,2}){2}\s+\d{2}:\d{2}(:\d{2})?$/
                },

                // GlassesFormPart
                pupilDistance: this.isNumber(),
                frameAndCleadingWeight: this.isNumber(),
                cleadingWeight: this.isNumber(),
                glassesWeight: this.isNumber(),

            },
            canSubmit: true
        };
    };

    isRequired = () => {
        return {
            isValidated: false,
            isValid: false,
            regex: /[^\s*$]/
        }
    };

    isPhone = () => {
        return {
            isValidated: false,
            isValid: false,
            regex: /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/
        }
    };

    isNumber = () => {
        return {
            isValidated: false,
            isValid: false,
            regex: /(^\s*$)|(^-?\d+$)|(^(-?\d+)(\.\d+)?$)/
        }
    };

    isRequiredNumber = () => {
        return {
            isValidated: false,
            isValid: false,
            regex: /(^-?\d+$)|(^(-?\d+)(\.\d+)?$)/
        }
    };

    __validate__ = (name) => {
        if (!name) {
            console.error('name attr cannot be empty: ', e.target);
        }

        let value = this.state.order[name];
        let regex = this.state.validation[name] && this.state.validation[name].regex;
        let isValid = !regex || regex.test(value);

        return { isValidated: true, isValid, regex };
    };

    handleValidate = (e) => {
        let name = e.target.name;
        let valid = {[name]: this.__validate__(name)};

        this.setState({ validation: Object.assign({}, this.state.validation, valid) }, () => {
            // let canSubmit = Object.keys(this.state.validation).map(key => this.isValid(key)).reduce((a, b)=> a && b);
            // this.setState({ canSubmit });
            //
            // console.log('valid>>> ', this.state.validation, 'canSubmit: ' + canSubmit)
        });
    };

    isInvalid = (name) => {
        return this.state.validation[name]
            && this.state.validation[name].isValidated
            && !this.state.validation[name].isValid;
    };

    isValid = (name) => {
        return !this.state.validation[name]
            || (this.state.validation[name].isValidated
            && this.state.validation[name].isValid);
    };

    handleChange = (e) => {
        let name = e.target.name;
        if (!name) {
            console.error('name attr cannot be empty: ', e.target);
        }
        let value = e.target.value;
        let order = Object.assign({}, this.state.order, { [name]: value });
        this.setState({ order });

        console.log('>> ', order);
    };

    notify = (status, msg) => {
        this.refs.notificationAlert.notificationAlert({
            place: 'tc',
            message: (
                <div>{ msg }</div>
            ),
            type: status ? 'success' : 'warning',
            icon: "tim-icons icon-bell-55",
            autoDismiss: 7
        });
    };

    handleSave = () => {
        let validation = {};
        Object.keys(this.state.validation).forEach(key => Object.assign(validation, { [key]: this.__validate__(key) }));
        let canSubmit = Object.keys(validation).map(key => validation[key].isValidated && validation[key].isValid).reduce((a, b)=> a && b);

        this.setState({ validation, canSubmit });
        if (!canSubmit) return;

        if (this.state.order._id) {
            $.post('/api/order/update', { order: this.state.order }, json => {
                if (json.status) {
                    this.notify(true, '更新成功');
                } else {
                    this.notify(false, '更新失败：' + json.msg);
                }
            });
        } else {
            $.post('/api/order/save', { shopId: this.props.shop._id, order: this.state.order }, json => {
                if (json.status) {
                    this.notify(true, '保存成功');
                    this.setState(this.initState());
                } else {
                    this.notify(false, '保存失败：' + json.msg);
                }
            });
        }
    };

    handleCancel = () => {
        this.setState(this.initState());
        this.props.onCancel();
    };

    render() {
        return (
            <div className="content max-less-form">
                <div className="react-notification-alert-container">
                    <NotificationAlert ref="notificationAlert" />
                </div>
                <Row>
                    <ConsumerFormPart
                        order={ this.state.order }
                        isInvalid={ this.isInvalid }
                        onChange={ this.handleChange }
                        onValidate={ this.handleValidate }
                        options={ this.props.options } />

                    <OrderFormPart
                        order={ this.state.order }
                        onChange={ this.handleChange }
                        onValidate={ this.handleValidate }
                        isInvalid={ this.isInvalid }
                        options={ this.props.options } />
                </Row>
                <Row>
                    <GlassesFormPart
                        order={ this.state.order }
                        onChange={ this.handleChange }
                        onValidate={ this.handleValidate }
                        isInvalid={ this.isInvalid }
                        options={ this.props.options } />

                    <DegreeFormPart
                        order={ this.state.order }
                        onChange={ this.handleChange }
                        onValidate={ this.handleValidate }
                        isInvalid={ this.isInvalid }
                        options={ this.props.options } />
                </Row>
                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader>
                                <h5 className="title">备注信息</h5>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col className="pr-md-1" md="12">
                                        <Input type="text" name="remarks"
                                               value={ this.state.order.remarks }
                                               invalid={ this.isInvalid('remarks') }
                                               onBlur={ this.handleValidate }
                                               onChange={ this.handleChange } />
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <Card>
                            <CardFooter>
                                <Button onClick={ this.handleSave } disabled={ !this.state.canSubmit }>保存</Button>
                                <Button onClick={ this.handleCancel }>返回</Button>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}