'use strict';
import React, { Component } from 'react';
import { Button, Card, CardHeader, CardBody, CardFooter,
    CardText, FormGroup, FormFeedback, Input, Row, Col } from "reactstrap";
import Option from "../Option";

export default class extends Component {
    constructor(props) {
        super(props);
    }

    handleOrderTimeChange = (e) => {
        let name = e.target.name;
        if (!name) {
            console.error('name attr cannot be empty: ', e.target);
        }
        let value = e.target.value;

        this.props.onChange({ target: { name, value } });
    };

    render() {
        return (
            <Col md="6">
                <Card>
                    <CardHeader>
                        <h5 className="title">订单信息</h5>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col className="pr-md-1" md="3">
                                <label>金额（元）</label>
                                <Input type="text" name="price"
                                       value={ this.props.order.price }
                                       invalid={ this.props.isInvalid('price') }
                                       onBlur={ this.props.onValidate }
                                       onChange={ this.props.onChange } />
                                <FormFeedback>请填写数字！</FormFeedback>
                            </Col>
                            <Col className="pr-md-1" md="5">
                                <label>下单时间</label>
                                <Input type="text" name="orderTime"
                                       value={ this.props.order.orderTime }
                                       invalid={ this.props.isInvalid('orderTime') }
                                       placeholder="YYYY-MM-DD hh:mm"
                                       onBlur={ this.props.onValidate }
                                       onChange={ this.handleOrderTimeChange } />
                                <FormFeedback>请填写正确下单时间！</FormFeedback>
                            </Col>
                            <Col className="pr-md-1" md="4">
                                <label>邮寄地址</label>
                                <Input type="text" name="address"
                                       value={ this.props.order.address }
                                       invalid={ this.props.isInvalid('address') }
                                       onBlur={ this.props.onValidate }
                                       onChange={ this.props.onChange } />
                            </Col>
                        </Row>
                        <Row>
                            <Col className="px-md-1" md="3">
                                <Option label="支付方式"
                                        name="payType"
                                        value={ this.props.order.payType }
                                        isInvalid={ this.props.isInvalid }
                                        onValidate={ this.props.onValidate }
                                        onChange={ this.props.onChange }
                                        options={ this.props.options['payType'] } />
                            </Col>
                            <Col className="pr-md-1" md="3">
                                <Option label="交易状态"
                                        name="orderStatus"
                                        value={ this.props.order.orderStatus }
                                        isInvalid={ this.props.isInvalid }
                                        onValidate={ this.props.onValidate }
                                        onChange={ this.props.onChange }
                                        options={ this.props.options['orderStatus'] } />
                            </Col>
                            <Col className="pr-md-1" md="3">
                                <Option label="回访状态"
                                        name="revisitStatus"
                                        value={ this.props.order.revisitStatus }
                                        isInvalid={ this.props.isInvalid }
                                        onValidate={ this.props.onValidate }
                                        onChange={ this.props.onChange }
                                        options={ this.props.options['revisitStatus'] } />
                            </Col>
                            <Col className="pr-md-1" md="3">
                                <Option label="服务人员"
                                        name="serviceUserId"
                                        value={ this.props.order.serviceUserId }
                                        isInvalid={ this.props.isInvalid }
                                        onValidate={ this.props.onValidate }
                                        onChange={ this.props.onChange }
                                        options={ this.props.options['serviceUserId'] } />
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
        );
    }
}