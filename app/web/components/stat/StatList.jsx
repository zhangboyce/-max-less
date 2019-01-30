'use strict';
import React, { Component } from 'react';
import { Card, CardFooter, Pagination, PaginationItem, PaginationLink, CardBody, Row, Col, Table, Button } from "reactstrap"
import $ from 'jquery';
import moment from 'moment';

const dayOfWeek = {
    0: '星期天',
    1: '星期一',
    2: '星期二',
    3: '星期三',
    4: '星期四',
    5: '星期五',
    6: '星期六',
};

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: {
                index: 1,
                size: 31,
                total: 0
            },
            stats: []
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.shop._id !== this.props.shop._id) {
            this.query(nextProps.shop._id);
        }
    }

    componentDidMount() {
        this.query();
    }

    handleChangePage = (index) => {
        return () => {
            this.setState({ page: Object.assign({}, this.state.page, { index }) }, this.query);
        };
    };

    handleUpdate = stat => {
        return () => {
            this.props.onUpdate(stat);
        }
    };

    query = (shopId) => {
        $.get('/api/stat/list', {
            shopId: shopId || this.props.shop._id,
            index: this.state.page.index,
            size: this.state.page.size,
        }, json => {
            if (json.status) {
                this.setState({
                    page: Object.assign({}, this.state.page, { total: json.result.total }),
                    stats: json.result.list
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
                                        onClick={ this.handleUpdate({ date: moment().format('YYYY-MM-DD') }) }
                                        color="info">今日统计</Button>
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
                                            <th className="text-center">周时间</th>
                                            <th className="text-center">销售额</th>
                                            <th className="text-center">配镜数量</th>
                                            <th className="text-center">首单时间</th>
                                            <th className="text-center">尾单时间</th>
                                            <th className="text-center">天气-最高气温</th>
                                            <th className="text-center">天气-最低气温</th>
                                            <th className="text-center">天气-天气状况</th>
                                            <th className="text-center">天气-风向</th>
                                            <th className="text-center">天气-风力</th>
                                            <th className="text-center">备注</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            this.state.stats.map((stat, index) => (
                                                <tr key={ index }>
                                                    <td className="text-center">{ index + 1 }</td>
                                                    <td className="text-center">
                                                        <a className="operator" onClick={ this.handleUpdate(stat)}>重新统计</a>
                                                    </td>
                                                    <td className="text-center">{ stat.date }</td>
                                                    <td className="text-center">{ dayOfWeek[moment(stat.date).day()] }</td>
                                                    <td className="text-center">{ stat.salesVolume }</td>
                                                    <td className="text-center">{ stat.salesNumber }</td>
                                                    <td className="text-center">{ stat.firstOrderTime }</td>
                                                    <td className="text-center">{ stat.lastOrderTime }</td>
                                                    <td className="text-center">{ stat.weather_highestTemperature }</td>
                                                    <td className="text-center">{ stat.weather_minimumTemperature }</td>
                                                    <td className="text-center">{ stat.weather_weather }</td>
                                                    <td className="text-center">{ stat.weather_windDirection }</td>
                                                    <td className="text-center">{ stat.weather_windPower }</td>
                                                    <td className="text-center">{ stat.remarks }</td>
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
                            {/*<CardFooter>*/}
                                {/*{*/}
                                    {/*this.__totalPage__() > 1 &&*/}
                                    {/*<Pagination size="sm" aria-label="Page navigation example">*/}
                                        {/*<PaginationItem disabled={ this.state.page.index === 1 }>*/}
                                            {/*<PaginationLink previous onClick={ this.handleChangePage(this.state.page.index - 1) } />*/}
                                        {/*</PaginationItem>*/}
                                        {/*{*/}
                                            {/*Array(this.__totalPage__()).fill().map((_, i) => (*/}
                                                {/*<PaginationItem active={ i+1 === this.state.page.index } key={i}>*/}
                                                    {/*<PaginationLink onClick={ this.handleChangePage(i+1) } >*/}
                                                        {/*{ i + 1 }*/}
                                                    {/*</PaginationLink>*/}
                                                {/*</PaginationItem>*/}
                                            {/*))*/}
                                        {/*}*/}
                                        {/*<PaginationItem disabled={ this.state.page.index === this.__totalPage__() }>*/}
                                            {/*<PaginationLink next onClick={ this.handleChangePage(this.state.page.index + 1) }  />*/}
                                        {/*</PaginationItem>*/}
                                    {/*</Pagination>*/}
                                {/*}*/}
                            {/*</CardFooter>*/}
                        </Card>
                    </Col>
                    <Col md="12">
                        <Card>
                            <CardBody>
                                <div>
                                    总销售额：{ this.state.stats.map( it => it.salesVolume ).reduce((a, b) => a + b, 0) }  元
                                </div>
                                <div>
                                    总配镜数量：{ this.state.stats.map( it => it.salesNumber ).reduce((a, b) => a + b, 0) }  副
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}