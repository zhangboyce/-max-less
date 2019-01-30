'use strict';
import React, { Component } from 'react';
import { Card, CardFooter, Pagination, PaginationItem, PaginationLink, CardBody, Row, Col, Table, Button } from "reactstrap"
import $ from 'jquery';
import moment from 'moment';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dateOptions: [],
            currentYear: null,
            currentMonth: null,
            page: {
                index: 1,
                size: 10,
                total: 0
            },
            orders: [],
            totalPrice: 0
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.shop._id !== this.props.shop._id) {
            this.__queryDateOptions__(nextProps.shop._id);
        }
    }

    componentDidMount() {
        this.__queryDateOptions__(this.props.shop._id);
    }

    __queryDateOptions__ = (shopId) => {
        $.get('/api/order/date/options', { shopId }, json => {
            this.setState({ dateOptions: json.result || {} });

            if (this.__isAdmin__()) {
                this.handleChangeYear(null)();
            } else {
                let date = new Date();
                let currentYear = date.getFullYear();
                let currentMonth = date.getMonth() + 1;
                this.setState({ currentYear, currentMonth }, this.query)
            }
        });
    };

    handleChangeYear = year => {
        return () => {
            this.setState({
                currentYear: year,
                currentMonth: null,
                page: Object.assign({}, this.state.page, { index: 1 })
            }, this.query);
        };
    };

    handleChangeMonth = month => {
        if (this.state.currentMonth === month) return;
        return () => {
            this.setState({
                currentMonth: month,
                page: Object.assign({}, this.state.page, { index: 1 })
            }, this.query);
        };
    };

    handleChangePage = (index) => {
        return () => {
            this.setState({ page: Object.assign({}, this.state.page, { index }) }, this.query);
        };
    };

    handleDelete = orderId => {
        return () => {
            if (window.confirm('确定删除该订单信息？')) {
                $.post('/api/order/delete', { orderId }, json => {
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
        };
    };

    handleUpdate = order => {
        return () => {
            this.props.onUpdate(order);
        }
    };

    query = () => {
        $.get('/api/order/list', {
            shopId: this.props.shop._id,
            year: this.state.currentYear,
            month: this.state.currentMonth,
            index: this.state.page.index,
            size: this.state.page.size,
        }, json => {
            if (json.status) {
                this.setState({
                    page: Object.assign({}, this.state.page, { total: json.result.total }),
                    orders: json.result.list,
                    totalPrice: json.result.totalPrice
                });
            }
        });
    };

    __totalPage__ = () => {
        return parseInt((this.state.page.total-1)/this.state.page.size) + 1
    };

    __isAdmin__ = () => {
        return this.props.user._id === 'admin';
    };

    render() {
        return (
            <div className="content">
                <Row>
                    <Col md="12">
                        <Card>
                            <CardBody>
                                <div>
                                    {
                                        this.__isAdmin__() &&
                                        <Button
                                            style={{padding: '5px 30px'}}
                                            onClick={ this.handleChangeYear(null) }
                                            color={ !this.state.currentYear ? 'primary' : 'info' }>全部</Button>
                                    }

                                    { Object.keys(this.state.dateOptions)
                                        .sort((a, b) => b - a)
                                        .map(key => (
                                        <Button
                                            key={ key }
                                            style={{padding: '5px 30px'}}
                                            onClick={ this.handleChangeYear(key) }
                                            color={ this.state.currentYear + '' === key ? 'primary' : 'info' }>{ key }年</Button>
                                    ))}

                                    <Button
                                        style={{padding: '5px 30px'}}
                                        onClick={ this.props.onNew }
                                        color="info">新建</Button>
                                </div>
                                <div>
                                    {
                                        (this.state.dateOptions[this.state.currentYear] || [])
                                            .map(month => (
                                                <Button
                                                    key={ month }
                                                    style={{padding: '5px 30px'}}
                                                    onClick={ this.handleChangeMonth(month) }
                                                    color={ this.state.currentMonth === month ? 'primary' : 'info' }>{ month }月</Button>
                                            ))
                                    }
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
                                            <th className="text-center">日期</th>
                                            <th className="text-center">交易状态</th>
                                            <th className="text-center">姓名</th>
                                            <th className="text-center">电话</th>
                                            <th className="text-center">性别</th>
                                            <th className="text-center">渠道</th>
                                            <th className="text-center">邮寄地址</th>
                                            <th className="text-center">回访状态</th>
                                            <th className="text-center">金额(元)</th>
                                            <th className="text-center">服务人员</th>
                                            <th className="text-center">支付方式</th>
                                            <th className="text-center">下单时间</th>
                                            <th className="text-center">镜片品牌</th>
                                            <th className="text-center">镜片描述</th>
                                            <th className="text-center">镜片功能</th>
                                            <th className="text-center">折射率</th>
                                            <th className="text-center">镜架</th>
                                            <th className="text-center">近视度数(左)</th>
                                            <th className="text-center">散光度数(左)</th>
                                            <th className="text-center">散光轴位(左)</th>
                                            <th className="text-center">近视度数(右)</th>
                                            <th className="text-center">散光度数(右)</th>
                                            <th className="text-center">散光轴位(右)</th>
                                            <th className="text-center">瞳距(mm)</th>
                                            <th className="text-center">镜框+衬板重量(g)</th>
                                            <th className="text-center">衬板重量(g)</th>
                                            <th className="text-center">镜框重量(g)</th>
                                            <th className="text-center">成品眼镜重量(g)</th>
                                            <th className="text-center">成品镜片重量(g)</th>
                                            <th className="text-center">备注</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            this.state.orders.map((order, index) => (
                                                <tr key={ index }>
                                                    <td className="text-center">{ index + 1 }</td>
                                                    <td className="text-center">
                                                        <a className="operator" onClick={ this.handleUpdate(order)}>编辑</a>
                                                        <a className="operator" onClick={ this.handleDelete(order._id) }>删除</a>
                                                    </td>
                                                    <td className="text-center">{ moment(order.orderTime).format('YYYY-MM-DD HH:mm:ss') }</td>
                                                    <td className="text-center">{ order.orderStatus }</td>
                                                    <td className="text-center">{ order.consumer && order.consumer.name }</td>
                                                    <td className="text-center">{ order.consumer && order.consumer.phone }</td>
                                                    <td className="text-center">{ order.consumer && order.consumer.sex }</td>
                                                    <td className="text-center">{ order.consumer && order.consumer.channel }</td>
                                                    <td className="text-center">{ order.address }</td>
                                                    <td className="text-center">{ order.revisitStatus }</td>
                                                    <td className="text-center">{ order.price }</td>
                                                    <td className="text-center">{ order.serviceUser && order.serviceUser.username }</td>
                                                    <td className="text-center">{ order.payType  }</td>
                                                    <td className="text-center">{ moment(order.orderTime).format('YYYY-MM-DD hh:mm:ss') }</td>
                                                    <td className="text-center">{ order.lensBrand  }</td>
                                                    <td className="text-center">{ order.lensDesc  }</td>
                                                    <td className="text-center">{ order.lensFunc  }</td>
                                                    <td className="text-center">{ order.lensRefractivity  }</td>
                                                    <td className="text-center">{ order.glassesFrame  }</td>
                                                    <td className="text-center">{ order.leftMyopiaDegree  }</td>
                                                    <td className="text-center">{ order.leftAstigmatismDegree  }</td>
                                                    <td className="text-center">{ order.rightAstigmatismAxis  }</td>
                                                    <td className="text-center">{ order.rightMyopiaDegree  }</td>
                                                    <td className="text-center">{ order.rightAstigmatismDegree  }</td>
                                                    <td className="text-center">{ order.rightAstigmatismAxis  }</td>
                                                    <td className="text-center">{ order.pupilDistance  }</td>
                                                    <td className="text-center">{ order.frameAndCleadingWeight  }</td>
                                                    <td className="text-center">{ order.cleadingWeight  }</td>
                                                    <td className="text-center">{ (parseFloat(order.frameAndCleadingWeight) - parseFloat(order.cleadingWeight)) || '' }</td>
                                                    <td className="text-center">{ order.glassesWeight  }</td>
                                                    <td className="text-center">{ (parseFloat(order.glassesWeight) - parseFloat(order.frameAndCleadingWeight) + parseFloat(order.cleadingWeight)) || '' }</td>
                                                    <td className="text-center">{ order.remarks }</td>
                                                </tr>
                                            ))
                                        }
                                        </tbody>
                                    </Table>
                                }
                                {
                                    this.state.page.total <=0 && '暂无订单数据!'
                                }
                            </CardBody>
                            {
                                this.__totalPage__() > 1 &&
                                <CardFooter>
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
                                </CardFooter>
                            }
                        </Card>
                    </Col>
                    <Col md="12">
                        <Card>
                            <CardBody>
                                合计：{ this.state.totalPrice } 元
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}