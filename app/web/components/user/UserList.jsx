'use strict';
import React, { Component } from 'react';
import { Card, CardFooter, Pagination, PaginationItem, PaginationLink, CardBody, Row, Col, Table, Button } from "reactstrap"
import $ from 'jquery';
import moment from 'moment';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: {
                index: 1,
                size: 10,
                total: 0
            },
            users: []
        };
    }

    componentDidMount() {
        this.query();
    }

    handleChangePage = (index) => {
        return () => {
            this.setState({ page: Object.assign({}, this.state.page, { index }) }, this.query);
        };
    };

    handleUpdate = user => {
        return () => {
            this.props.onUpdate(user);
        }
    };

    handleDelete = user => {
        return () => {
            if (window.confirm('确定删除该用户？')) {
                $.post('/api/admin/user/delete', { userId: user._id }, json => {
                    if (json.status) {
                        let total = this.state.page.total - 1;
                        let totalPage = parseInt((total - 1) / this.state.page.size) + 1;
                        if (this.state.page.index > totalPage) {
                            this.setState({
                                page: Object.assign({}, this.state.page, { index: totalPage - 1 })
                            }, this.query)
                        } else {
                            this.query();
                        }
                    }
                });
            }
        }
    };

    query = () => {
        $.get('/api/admin/user/list', {
            index: this.state.page.index,
            size: this.state.page.size,
        }, json => {
            if (json.status) {
                this.setState({
                    page: Object.assign({}, this.state.page, { total: json.result.total }),
                    users: json.result.list
                });
            }
        });
    };

    __totalPage__ = () => {
        return parseInt((this.state.page.total-1)/this.state.page.size) + 1
    };

    render() {
        return (
            <div className="content">
                <Row>
                    <Col md="12">
                        <Card>
                            <CardBody>
                                <div>
                                    <Button
                                        style={{padding: '5px 30px'}}
                                        onClick={ this.props.onNew }
                                        color="info">添加用户</Button>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md="12">
                        <Card>
                            <CardBody>
                                {
                                    this.state.page.total > 0 &&
                                    <Table className="tablesorter" responsive>
                                        <thead className="text-primary">
                                        <tr>
                                            <th className="text-center">序号</th>
                                            <th className="text-center">操作</th>
                                            <th className="text-center">姓名</th>
                                            <th className="text-center">性别</th>
                                            <th className="text-center">电话</th>
                                            <th className="text-center">角色</th>
                                            <th className="text-center">所属店铺</th>
                                            <th className="text-center">添加时间</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            this.state.users.map((user, index) => (
                                                <tr key={ index }>
                                                    <td className="text-center">{ index + 1 }</td>
                                                    <td className="text-center">
                                                        <a className="operator" onClick={ this.handleUpdate(user)}>编辑</a>
                                                        <a className="operator" onClick={ this.handleDelete(user)}>删除</a>
                                                    </td>
                                                    <td className="text-center">{ user.username }</td>
                                                    <td className="text-center">{ user.sex === 1 ? '男': '女' }</td>
                                                    <td className="text-center">{ user.phone }</td>
                                                    <td className="text-center">{ user.roleName }</td>
                                                    <td className="text-center">{ user.shopName }</td>
                                                    <td className="text-center">{ moment(user.createDate).format('YYYY-MM-DD HH:mm:ss') }</td>
                                                </tr>
                                            ))
                                        }
                                        </tbody>
                                    </Table>
                                }
                                {
                                    this.state.page.total <=0 && '暂无统计数据!'
                                }
                            </CardBody>
                            <CardFooter>
                                {
                                    this.__totalPage__() > 1 &&
                                    <Pagination size="sm" aria-label="Page navigation example">
                                        <PaginationItem disabled={ this.state.page.index === 1 }>
                                            <PaginationLink previous onClick={ this.handleChangePage(this.state.page.index - 1) } />
                                        </PaginationItem>
                                        {
                                            Array(this.__totalPage__()).fill().map((_, i) => (
                                                <PaginationItem active={ i+1 === this.state.page.index } key={i}>
                                                    <PaginationLink onClick={ this.handleChangePage(i+1) } >
                                                        { i + 1 }
                                                    </PaginationLink>
                                                </PaginationItem>
                                            ))
                                        }
                                        <PaginationItem disabled={ this.state.page.index === this.__totalPage__() }>
                                            <PaginationLink next onClick={ this.handleChangePage(this.state.page.index + 1) }  />
                                        </PaginationItem>
                                    </Pagination>
                                }
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}