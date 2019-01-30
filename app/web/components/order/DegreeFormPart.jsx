'use strict';
import React, { Component } from 'react';
import { Card, CardHeader, CardBody, Input, Row, Col, FormFeedback } from "reactstrap";

export default class  extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Col md="6">
                <Card>
                    <CardHeader>
                        <h5 className="title">光度信息</h5>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col className="pr-md-1" md="4">
                                <label>近视度数(左)</label>
                                <Input type="text" name="leftMyopiaDegree"
                                       value={ this.props.order.leftMyopiaDegree }
                                       invalid={ this.props.isInvalid('leftMyopiaDegree') }
                                       onBlur={ this.props.onValidate }
                                       onChange={ this.props.onChange } />
                                <FormFeedback>请填写正确的格式！</FormFeedback>
                            </Col>
                            <Col className="pr-md-1" md="4">
                                <label>散光度数(左)</label>
                                <Input type="text" name="leftAstigmatismDegree"
                                       value={ this.props.order.leftAstigmatismDegree }
                                       invalid={ this.props.isInvalid('leftAstigmatismDegree') }
                                       onBlur={ this.props.onValidate }
                                       onChange={ this.props.onChange } />
                                <FormFeedback>请填写正确的格式！</FormFeedback>
                            </Col>
                            <Col className="pr-md-1" md="4">
                                <label>散光轴位(左)</label>
                                <Input type="text" name="leftAstigmatismAxis"
                                       value={ this.props.order.leftAstigmatismAxis }
                                       invalid={ this.props.isInvalid('leftAstigmatismAxis') }
                                       onBlur={ this.props.onValidate }
                                       onChange={ this.props.onChange } />
                                <FormFeedback>请填写正确的格式！</FormFeedback>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="pr-md-1" md="4">
                                <label>近视度数(右)</label>
                                <Input type="text" name="rightMyopiaDegree"
                                       value={ this.props.order.rightMyopiaDegree }
                                       invalid={ this.props.isInvalid('rightMyopiaDegree') }
                                       onBlur={ this.props.onValidate }
                                       onChange={ this.props.onChange } />
                                <FormFeedback>请填写正确的格式！</FormFeedback>
                            </Col>
                            <Col className="pr-md-1" md="4">
                                <label>散光度数(右)</label>
                                <Input type="text" name="rightAstigmatismDegree"
                                       value={ this.props.order.rightAstigmatismDegree }
                                       invalid={ this.props.isInvalid('rightAstigmatismDegree') }
                                       onBlur={ this.props.onValidate }
                                       onChange={ this.props.onChange } />
                                <FormFeedback>请填写正确的格式！</FormFeedback>
                            </Col>
                            <Col className="pr-md-1" md="4">
                                <label>散光轴位(右)</label>
                                <Input type="text" name="rightAstigmatismAxis"
                                       value={ this.props.order.rightAstigmatismAxis }
                                       invalid={ this.props.isInvalid('rightAstigmatismAxis') }
                                       onBlur={ this.props.onValidate }
                                       onChange={ this.props.onChange } />
                                <FormFeedback>请填写正确的格式！</FormFeedback>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="pr-md-1" md="12">
                                <label>瞳距</label>
                                <Input type="text" name="pupilDistance"
                                       value={ this.props.order.pupilDistance }
                                       invalid={ this.props.isInvalid('pupilDistance') }
                                       onBlur={ this.props.onValidate }
                                       onChange={ this.props.onChange } />
                                <FormFeedback>请填写数字！</FormFeedback>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
        );
    }
}