'use strict';
import React, { Component } from 'react';
import { Card, CardHeader, CardBody, FormFeedback, Input, Row, Col } from "reactstrap";
import Option from "../Option";
import DatePicker from "react-datepicker/es";
import moment from "moment";

export default class extends Component {
    constructor(props) {
        super(props);
    }

    handleOrderTimeChange = (date) => {
        let value = moment(date).format("YYYY-MM-DD HH:mm:ss");
        this.props.onChange({ target: { name: 'orderTime', value } });
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
                            <Col className="pr-md-1" md="9">
                                <label style={{ display: 'block' }}>下单时间</label>
                                <DatePicker
                                    dateFormat="yyyy-MM-dd"
                                    className="form-control"
                                    maxDate={ new Date() }
                                    selected={ new Date(moment(this.props.order.orderTime).format('YYYY-MM-DD HH:mm:ss')) }
                                    onChange={this.handleOrderTimeChange} />
                                <DatePicker
                                    className="form-control"
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={ 10 }
                                    dateFormat="HH:mm"
                                    timeFormat="HH:mm"
                                    timeCaption="time"
                                    selected={ new Date(moment(this.props.order.orderTime).format('YYYY-MM-DD HH:mm:ss')) }
                                    onChange={this.handleOrderTimeChange} />
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