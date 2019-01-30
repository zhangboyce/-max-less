'use strict';
import React, { Component } from 'react';
import { Card, CardHeader, CardBody, Input, Row, Col, FormFeedback } from "reactstrap";
import Option from "../Option";

export default class  extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Col md="6">
                <Card>
                    <CardHeader>
                        <h5 className="title">眼镜信息</h5>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col className="pr-md-1" md="3">
                                <Option label="品牌"
                                        name="lensBrand"
                                        value={ this.props.order.lensBrand }
                                        isInvalid={ this.props.isInvalid }
                                        onValidate={ this.props.onValidate }
                                        onChange={ this.props.onChange }
                                        options={ this.props.options['lensBrand'] } />
                            </Col>
                            <Col className="pr-md-1" md="3">
                                <Option label="描述"
                                        name="lensDesc"
                                        value={ this.props.order.lensDesc }
                                        isInvalid={ this.props.isInvalid }
                                        onValidate={ this.props.onValidate }
                                        onChange={ this.props.onChange }
                                        options={ this.props.options['lensDesc'] } />
                            </Col>
                            <Col className="pr-md-1" md="3">
                                <Option label="功能"
                                        name="lensFunc"
                                        value={ this.props.order.lensFunc }
                                        isInvalid={ this.props.isInvalid }
                                        onValidate={ this.props.onValidate }
                                        onChange={ this.props.onChange }
                                        options={ this.props.options['lensFunc'] } />
                            </Col>
                            <Col className="pr-md-1" md="3">
                                <Option label="折射率"
                                        name="lensRefractivity"
                                        value={ this.props.order.lensRefractivity }
                                        isInvalid={ this.props.isInvalid }
                                        onValidate={ this.props.onValidate }
                                        onChange={ this.props.onChange }
                                        options={ this.props.options['lensRefractivity'] } />
                            </Col>
                        </Row>
                        <Row>
                            <Col className="pr-md-1" md="4">
                                <label>镜框+衬板重量(g)</label>
                                <Input type="text" name="frameAndCleadingWeight"
                                       value={ this.props.order.frameAndCleadingWeight }
                                       invalid={ this.props.isInvalid('frameAndCleadingWeight') }
                                       onBlur={ this.props.onValidate }
                                       onChange={ this.props.onChange } />
                                <FormFeedback>请填写数字！</FormFeedback>
                            </Col>
                            <Col className="pr-md-1" md="4">
                                <label>衬板重量(g)</label>
                                <Input type="text" name="cleadingWeight"
                                       value={ this.props.order.cleadingWeight }
                                       invalid={ this.props.isInvalid('cleadingWeight') }
                                       onBlur={ this.props.onValidate }
                                       onChange={ this.props.onChange } />
                                <FormFeedback>请填写数字！</FormFeedback>
                            </Col>
                            <Col className="pr-md-1" md="4">
                                <label>成品眼镜重量(g)</label>
                                <Input type="text" name="glassesWeight"
                                       value={ this.props.order.glassesWeight }
                                       invalid={ this.props.isInvalid('glassesWeight') }
                                       onBlur={ this.props.onValidate }
                                       onChange={ this.props.onChange } />
                                <FormFeedback>请填写数字！</FormFeedback>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="pr-md-1" md="12">
                                <label>镜架</label>
                                <Input type="text" name="glassesFrame"
                                       value={ this.props.order.glassesFrame }
                                       invalid={ this.props.isInvalid('glassesFrame') }
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