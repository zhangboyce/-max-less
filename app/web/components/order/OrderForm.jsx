'use strict';
import React, { Component } from 'react';
import ConsumerFormPart from './ConsumerFormPart';
import OrderFormPart from './OrderFormPart';
import GlassesFormPart from './GlassesFormPart';
import DegreeFormPart from './DegreeFormPart';
import { Card, CardFooter, Button, Row, Col } from "reactstrap"
import $ from 'jquery';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = this.initState();
    }

    initState = () => {
        return {
            order: {
                name: '',
                phone: '',
                sex: '',
                channel: '',

                leftMyopiaDegree: '',
                rightMyopiaDegree: '',
                leftAstigmatismDegree: '',
                rightAstigmatismDegree: '',
                leftAstigmatismAxis: '',
                rightAstigmatismAxis: '',

                price: '',
                orderTime: '',
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
            },
            validation: {
                // ConsumerFormPart
                name: this.isRequired(),
                phone: this.isPhone(),
                // sex: this.isRequired(),
                // channel: this.isRequired(),
                //
                // // DegreeFormPart
                // leftMyopiaDegree: this.isNumber(),
                // rightMyopiaDegree: this.isNumber(),
                // leftAstigmatismDegree: this.isNumber(),
                // rightAstigmatismDegree: this.isNumber(),
                // leftAstigmatismAxis: this.isNumber(),
                // rightAstigmatismAxis: this.isNumber(),
                //
                // // OrderFormPart
                // price: this.isNumber(),
                orderTime: {
                    isValidated: false,
                    isValid: false,
                    // YYYY-MM-DD hh:mm
                    regex: /^20\d{2}(\-\d{1,2}){2}\s+\d{2}:\d{2}(:\d{2})?$/
                },
                //
                // // GlassesFormPart
                // pupilDistance: this.isNumber(),
                // frameAndCleadingWeight: this.isNumber(),
                // cleadingWeight: this.isNumber(),
                // glassesWeight: this.isNumber(),

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
            let canSubmit = Object.keys(this.state.validation).map(key => this.isValid(key)).reduce((a, b)=> a && b);
            this.setState({ canSubmit });

            console.log('valid>>> ', this.state.validation, 'canSubmit: ' + canSubmit)
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

    handleSave = () => {
        let validation = {};
        Object.keys(this.state.validation).forEach(key => Object.assign(validation, { [key]: this.__validate__(key) }));
        let canSubmit = Object.keys(validation).map(key => this.isValid(key)).reduce((a, b)=> a && b);

        this.setState({ validation, canSubmit });
        if (!canSubmit) return;

        $.post('/api/order/save', { order: this.state.order }, json => {
            if (json.status) {
                alert('保存成功!');
                this.setState(this.initState())
            } else {
                alert('保存失败!');
            }
        });
    };

    render() {
        return (
            <div className="content max-less-form">
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
                    <Col md="6">
                        <Card>
                            <CardFooter>
                                <Button onClick={ this.handleSave } disabled={ !this.state.canSubmit }>保存</Button>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}