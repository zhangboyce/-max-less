'use strict';
import React, { Component } from 'react';
import {Input } from "reactstrap";

export default class  extends Component {
    render() {
        return (
            <div>
                <label>{ this.props.label }</label>
                <Input type="select"
                       name={ this.props.name }
                       value={ this.props.value }
                       onBlur={ this.props.onValidate || (() => {} )}
                       invalid={ (this.props.isInvalid || (() => {}) )((this.props.name)) }
                       onChange={ this.props.onChange }>
                    <option value="">--请选择--</option>
                    {
                        this.props.options &&
                        this.props.options.map(op => (
                            <option key={ op.value } value={ op.value }>{ op.name }</option>
                        ))
                    }
                </Input>
            </div>
        );
    }
}