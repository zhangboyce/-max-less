'use strict';
import React, { Component } from 'react';
import NotificationAlert from "react-notification-alert";
import $ from 'jquery';
import moment from 'moment';
import { Card, CardFooter, Button, Row, Col, CardHeader, CardBody, Input } from "reactstrap"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Option from "../Option";

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = this.initState();
    }

    componentDidMount() {
        let stat0 = this.props.stat;
        this.setState({ stat: stat0, update: !!stat0._id }, () => {
            this.stat(stat0.date);
        });
    }

    stat = date => {
        $.get('/api/stat/get', { shopId: this.props.shop._id, date }, json => {
            if (json.status) {
                if (this.state.update) {
                    if (!this.__equals__(this.state.stat, json.result, [
                        "salesVolume", "salesNumber", "firstOrderTime", "lastOrderTime"
                    ])) {
                        this.setState({ canSubmit: true })
                    }
                }
                this.setState({ stat: json.result });
            }
        });
    };

    __equals__ = (obj1, obj2, properties) => {
        if (!obj1 && !obj2) return true;
        if (!properties || !properties.length) return true;
        obj1 = obj1 || {};
        obj2 = obj2 || {};
        return properties.map(p => (!obj1[p] && !obj2[p] || obj1[p] === obj2[p])).reduce((a, b) => a&b);
    };

    initState = () => {
        return {
            stat: {
                date: "",
                salesVolume: 0,
                salesNumber: 0,
                firstOrderTime: "",
                lastOrderTime: "",
                weather_highestTemperature: 0,
                weather_minimumTemperature: 0,
                weather_weather: "",
                weather_windDirection: "",
                weather_windPower: "",
            },
            canSubmit: false,
            update: false
        };
    };

    handleDateChange = (date) => {
        date = moment(date).format("YYYY-MM-DD");
        this.stat(date);
    };

    handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        if (!name) {
            console.error('name attr cannot be empty: ', e.target);
        }

        if (this.state.update) {
            if (!this.__equals__(this.state.stat, { [name]: value }, [name])) {
                this.setState({ canSubmit: true })
            }
        }

        let stat = Object.assign({}, this.state.stat, { [name]: value });
        this.setState({ stat });
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
        if (this.state.stat._id) {
            $.post('/api/stat/update', { stat: this.state.stat }, json => {
                if (json.status) {
                    this.notify(true, '更新成功');
                    this.setState({ canSubmit: false });
                } else {
                    this.notify(false, '更新失败：' + json.msg);
                }
            });
        } else {
            $.post('/api/stat/save', { shopId: this.props.shop._id, stat: this.state.stat }, json => {
                if (json.status) {
                    this.notify(true, '保存成功');
                    this.handleCancel();
                } else {
                    this.notify(false, '保存失败：' + json.msg);
                }
            });
        }
    };

    handleCancel = () => {
        this.props.onCancel();
    };

    render() {
        return (
            <div className="content max-less-form">
                <div className="react-notification-alert-container">
                    <NotificationAlert ref="notificationAlert" />
                </div>
                <Row>
                    <Col md="6">
                        <Card>
                            <CardHeader>
                                <h5 className="title">统计信息</h5>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col className="pr-md-1" md="4">
                                        <label>日期</label>
                                        <DatePicker
                                            dateFormat="yyyy-MM-dd"
                                            className="form-control"
                                            maxDate={ new Date() }
                                            selected={ new Date(this.state.stat.date) }
                                            onChange={this.handleDateChange} />
                                    </Col>
                                    <Col className="pr-md-1" md="4">
                                        <label>销售额</label>
                                        <Input type="text"
                                               disabled
                                               name="salesVolume"
                                               value={ this.state.stat.salesVolume }
                                               onChange={ this.handleChange } />
                                    </Col>
                                    <Col className="pr-md-1" md="4">
                                        <label>配镜数量</label>
                                        <Input type="text"
                                               name="salesNumber"
                                               disabled
                                               value={ this.state.stat.salesNumber }
                                               onChange={ this.handleChange } />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="pr-md-1" md="6">
                                        <label>首单时间</label>
                                        <Input type="text"
                                               name="firstOrderTime"
                                               disabled
                                               value={ this.state.stat.firstOrderTime }
                                               onChange={ this.handleChange } />
                                    </Col>
                                    <Col className="pr-md-1" md="6">
                                        <label>尾单时间</label>
                                        <Input type="text"
                                               name="lastOrderTime"
                                               disabled
                                               value={ this.state.stat.lastOrderTime }
                                               onChange={ this.handleChange } />
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md="6">
                        <Card>
                            <CardHeader>
                                <h5 className="title">天气信息</h5>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col className="pr-md-1" md="6">
                                        <label>最高气温</label>
                                        <Input type="text" name="weather_highestTemperature"
                                               value={ this.state.stat.weather_highestTemperature }
                                               onChange={ this.handleChange } />
                                    </Col>
                                    <Col className="pr-md-1" md="6">
                                        <label>最低气温</label>
                                        <Input type="text"
                                               name="weather_minimumTemperature"
                                               value={ this.state.stat.weather_minimumTemperature }
                                               onChange={ this.handleChange } />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="pr-md-1" md="4">
                                        <Option label="天气状况"
                                                name="weather_weather"
                                                value={ this.state.stat.weather_weather }
                                                onChange={ this.handleChange }
                                                options={ this.props.options['weather'] } />
                                    </Col>
                                    <Col className="pr-md-1" md="4">
                                        <Option label="风向"
                                                name="weather_windDirection"
                                                value={ this.state.stat.weather_windDirection }
                                                onChange={ this.handleChange }
                                                options={ this.props.options['weather_windDirection'] } />
                                    </Col>
                                    <Col className="pr-md-1" md="4">
                                        <Option label="风力"
                                                name="weather_windPower"
                                                value={ this.state.stat.weather_windPower }
                                                onChange={ this.handleChange }
                                                options={ this.props.options['weather_windPower'] } />
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col md="6">
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