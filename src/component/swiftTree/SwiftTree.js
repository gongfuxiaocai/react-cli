import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Tree } from 'antd';
const TreeNode = Tree.TreeNode;
import './SwiftTree.less';

export default class SwiftTree extends React.Component{
    static defaultProps = {
        style:{},
        treeData: [],
        checkable:true,
        expandedKeys:[],
        selectedKeys:[],
        disableCheckbox:false
    }
    static propTypes = {
        disableCheckbox:PropTypes.bool
    }

    render(){
        const {
            className,
            treeData,
            checkable,
            disableCheckbox,
            style,
            ...others
        } = this.props;

        const cls = classNames({
            'innovate_AntD_tree': true,
            'float_tree':checkable,
            'disableCheckbox':disableCheckbox,
            [className]: className
        });



        const loop = (data) => data.map((item) => {
            if (item.children) {
                return (
                    <TreeNode key={item.key} title={item.title} isLeaf={item.isLeaf} disableCheckbox={disableCheckbox}>
                        {loop(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode key={item.key} title={item.title} isLeaf={item.isLeaf} disableCheckbox={disableCheckbox}/>;

        });


        return(
            <div className={cls} style={style}>
                <Tree checkable={checkable} {...others}>
                    {loop(treeData)}
                </Tree>
            </div>
        )
    }
}
