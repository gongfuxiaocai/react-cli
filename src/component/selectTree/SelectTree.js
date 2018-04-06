import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TreeSelect } from 'antd';
const SHOW_PARENT = TreeSelect.SHOW_PARENT;

class SelectTree extends Component {
    state = {
        value: this.props.value || [],
    };

    onChange = ( value ) => {
        this.setState({ value });
    };

    render() {
        const { width, placeholder } = this.props;
        const { value, treeData } = this.state;
        const tProps = {
            treeData,
            value: value,
            onChange: this.onChange,
            treeCheckable: true,
            showCheckedStrategy: SHOW_PARENT,
            searchPlaceholder: placeholder,
            style: {
                width,
            },
        };
        return <TreeSelect {...tProps} />;
    }
}

SelectTree.propTypes = {
    value: PropTypes.array,
    treeData: PropTypes.array
};

export default SelectTree;