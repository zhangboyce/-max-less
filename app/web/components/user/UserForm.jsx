'use strict';
import React, { Component } from 'react';
import NotificationAlert from "react-notification-alert";
import $ from 'jquery';
import { Card, CardFooter, Button, Row, Col, CardHeader, CardBody, Input } from "reactstrap"
import "react-datepicker/dist/react-datepicker.css";
import Option from "../Option";

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = this.initState();
    }

    componentDidMount() {
        let user = this.props.user;
        this.setState({ user: user || this.state.user, update: user && !!user._id });

        $.get('/api/option/user', json => {
            if (json.status) {
                this.setState({ options: json.result })
            }
        });
    }

    initState = () => {
        return {
            user: {
                username: "",
                password: "",
                phone: "",
                sex: "",
                shopId: "",
                roleId: "",
            },
            canSubmit: true,
            update: false,
            options: { shops: [], roles: [] }
        };
    };

    handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        if (!name) {
            console.error('name attr cannot be empty: ', e.target);
        }

        let user = Object.assign({}, this.state.user, { [name]: value });
        this.setState({ user });

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
        if (this.state.user._id) {
            $.post('/api/admin/user/update', { user: this.state.user }, json => {
                if (json.status) {
                    this.notify(true, '更新成功');
                    this.setState({ canSubmit: false });
                } else {
                    this.notify(false, '更新失败：' + json.msg);
                }
            });
        } else {
            $.post('/api/admin/user/save', { user: this.state.user }, json => {
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
                    <Col md="12">
                        <Card>
                            <CardHeader>
                                <h5 className="title">用户信息</h5>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col className="pr-md-1" md="4">
                                        <label>姓名</label>
                                        <Input type="text"
                                               name="username"
                                               disabled={ this.state.update }
                                               value={ this.state.user.username }
                                               onChange={ this.handleChange } />
                                    </Col>
                                    <Col className="pr-md-1" md="4">
                                        <Option label="性别"
                                                name="sex"
                                                value={ this.state.user.sex }
                                                onChange={ this.handleChange }
                                                options={ [{ name: '男', value: 1}, { name: '女', value: 0}] } />
                                    </Col>
                                    <Col className="pr-md-1" md="4">
                                        <label>电话</label>
                                        <Input type="text"
                                               name="phone"
                                               value={ this.state.user.phone }
                                               onChange={ this.handleChange } />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="pr-md-1" md="4">
                                        <label>密码</label>
                                        <Input type="password"
                                               name="password"
                                               value={ this.state.user.password }
                                               onChange={ this.handleChange } />
                                    </Col>
                                    <Col className="pr-md-1" md="4">
                                        <Option label="所属店铺"
                                                name="shopId"
                                                value={ this.state.user.shopId }
                                                onChange={ this.handleChange }
                                                options={ this.state.options.shops } />
                                    </Col>
                                    <Col className="pr-md-1" md="4">
                                        <Option label="用户角色"
                                                name="roleId"
                                                value={ this.state.user.roleId }
                                                onChange={ this.handleChange }
                                                options={ this.state.options.roles } />
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