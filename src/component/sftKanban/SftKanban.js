import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Utils from '../Resource/utils/Utils';
import './SftKanban.css';

class SftKanban extends React.Component{
    static defaultProps = {
        column: 6
    }

    static propTypes = {
        kanbanData: PropTypes.array.isRequired,
        column: PropTypes.number
    }

    constructor(props){
        super(props);
    }

    //<p><FormattedMessage id='tradeListText' values={{text: `${item.text}`}}/></p>
    getListData = () => {
        const tempData = this.props.kanbanData;
        const column = this.props.column;
        const num = tempData.length;
        if (num <= column) {
            var liWidth = (1 / num) * 100 + '%';
        } else {
            var liWidth = (1 / column) * 100 + '%';
        }

        const arr = tempData.map((item, index) => {
            const {url, width, height} = item.ico;
            const icoStyle = {
                width: width,
                height: height,
                background: `url(${url}) no-repeat`
            }
            const cls = classNames({
                no_border_right: index % column === column - 1
            });
            return (
                <li key={index} className={cls} style={{width: liWidth}}>
                    <div className="ico" style={icoStyle}></div>
                    <div className="con">
                        <p>{item.text}</p>
                        <p>{Utils.format(item.value)}</p>
                    </div>
                </li>
            )
        });
        return arr;
    }

    render() {
      const {className, children, column, kanbanData, ...others} = this.props;

      const cls = classNames({
          'sft_kanban': true,
          'clearfix2': true,
          [className]: className
      });

      return (
          <ul className={cls} {...others}>
              {this.getListData()}
          </ul>
      )
    }
}

export default SftKanban;
