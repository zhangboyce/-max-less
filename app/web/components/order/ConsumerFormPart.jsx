'use strict';
import React, { Component } from 'react';
import { Card, CardHeader, CardBody, Input, Row, Col, FormFeedback, FormText } from "reactstrap";
import Option from '../Option';

export default class  extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Col md="6">
                <Card>
                    <CardHeader>
                        <h5 className="title">客户信息</h5>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col className="pr-md-1" md="6">
                                <label>姓名</label>
                                <Input type="text"
                                       name="name"
                                       invalid={ this.props.isInvalid('name') }
                                       onBlur={ this.props.onValidate }
                                       onChange={ this.props.onChange }
                                       value={ this.props.order.name } />
                                <FormFeedback>客户姓名不能为空！</FormFeedback>
                            </Col>
                            <Col className="px-md-1" md="6">
                                <label>电话</label>
                                <Input type="text"
                                       name="phone"
                                       invalid={ this.props.isInvalid('phone') }
                                       onBlur={ this.props.onValidate }
                                       placeholder="13111111111/021-00000000/0851-0000000"
                                       onChange={ this.props.onChange }
                                       value={ this.props.order.phone } />
                                <FormFeedback>请填写正确的客户电话号码！</FormFeedback>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="pr-md-1" md="3">
                                <Option label="性别"
                                        name="sex"
                                        value={ this.props.order.sex }
                                        onChange={ this.props.onChange }
                                        isInvalid={ this.props.isInvalid }
                                        onValidate={ this.props.onValidate }
                                        options={ this.props.options['sex'] } />
                            </Col>
                            <Col className="px-md-1" md="3">
                                <Option label="渠道"
                                        name="channel"
                                        value={ this.props.order.channel }
                                        onChange={ this.props.onChange }
                                        isInvalid={ this.props.isInvalid }
                                        onValidate={ this.props.onValidate }
                                        options={ this.props.options['channel'] } />
                            </Col>
                            <Col className="pr-md-1" md="6">
                                <label>邮寄地址</label>
                                <Input type="text" name="address"
                                       value={ this.props.order.address }
                                       invalid={ this.props.isInvalid('address') }
                                       onBlur={ this.props.onValidate }
                                       onChange={ this.props.onChange } />
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
        );
    }
}