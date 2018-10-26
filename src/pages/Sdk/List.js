import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Table, Button, Icon, Select } from 'antd';
import Link from 'umi/link';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { removeFromArray } from '@/utils/common';
import styles from './List.less';

const { Option } = Select;

const progressColumns = [
    {
        title: 'SDK',
        dataIndex: 'sdk',
        key: 'sdk',
    },
    {
        title: '更新内容',
        dataIndex: 'content',
        key: 'content',
    },
    {
        title: '文档',
        dataIndex: 'look',
        key: 'look',
        render: () => (<Link to='/'>查看</Link>),
    },
    {
        title: '更新日期',
        dataIndex: 'time',
        key: 'time',
    },
    {
        title: '大小',
        dataIndex: 'size',
        key: 'size',
    },
    {
        title: '下载',
        dataIndex: 'download',
        key: 'download',
    },
];

@connect(({ sdk, loading }) => ({
    sdk,
    loading: loading.effects['sdk/fetchBasic'],
}))
class List extends Component {
    
    
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'sdk/fetchBasic',
        });
    }

    state = {
        expandedRows: [], // 展开行的数组
    };


    // 获取所有key
    getKeys = function (array, allKeys) {
        for (let i = 0; i < array.length; i++) {
            if (allKeys.indexOf(array[i].key) < 0) {
                allKeys.push(array[i].key);
            }

            if (array[i].children && array[i].children.length > 0) {
                this.getKeys(array[i].children, allKeys);
            }
        }
    }

    // 展开
    allExpand = (sourceFile) => {
        let expandedRows = [];
        this.getKeys(sourceFile, expandedRows);
        // 更新状态
        this.setState({ expandedRows });
    }

    // 收缩
    allContract = () => {
        let expandedRows = [];
        // 更新状态
        this.setState({ expandedRows });
    }

    handleOnExpand(expanded, record) {	//修改图标点击默认执行方法  获取自己维护的 数组，判断数组中是否包含 这行key，相应添加或者删除    
        let expandedRows = this.state.expandedRows;
        if (expanded) {
            expandedRows.push(record.key);
        } else {
            removeFromArray.call(expandedRows, record.key)

        }
        this.setState({ expandedRows });

    }

    render() {
        const { sdk, loading } = this.props;
        const { SDKList } = sdk;

        const pageHeaderContent = (
            <div className={styles.pageHeaderTitle}>SDK列表</div>
        )

        const extraContent = (
            <div className={styles.extraContent}>
                <Select defaultValue="alipay" style={{ width: 100 }} >
                    <Option value="alipay">5.2.8</Option>
                    <Option value="bank">5.2.0</Option>
                    <Option value="tts">3.8</Option>
                </Select>
            </div>
        );
        
        return (
            <PageHeaderWrapper content={pageHeaderContent} extraContent={extraContent}>
                <Card bordered={false}>
                    <div className={styles.infoContent}>
                        <Icon type="exclamation-circle" style={{marginRight:3}} />灵云通用SDK仅提供Android、iOS、Windows C++和Windows Java版本，如需定制，请 <Link to='/'>联系我们</Link>
                    </div>
                    <Table
                        style={{ marginBottom: 16 }}
                        pagination={false}
                        loading={loading}
                        dataSource={SDKList}
                        columns={progressColumns}
                        expandedRowKeys={this.state.expandedRows}
                        onExpand={this.handleOnExpand.bind(this)}
                    />

                    <div style={{ marginTop: 15 }}>
                        <Button type="primary" onClick={() => this.allExpand(SDKList)}><Icon type="down-circle" />展开</Button>
                        <Button type="primary" onClick={this.allContract} style={{ marginLeft: 20 }}><Icon type="up-circle" />收缩</Button>
                    </div>
                </Card>
            </PageHeaderWrapper>
        );
    }
}

export default List;
