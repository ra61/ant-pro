import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Card, Badge, Table, Input  } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './List.less';

const { Search } = Input;

const progressColumns = [
    {
        title: '工单编号',
        dataIndex: 'order',
        key: 'order',
    },
    {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
    },
    {
        title: '工单状态',
        dataIndex: 'status',
        key: 'status',
        render: text =>
            text === 'pending' ? (
                <Badge status="success" text="待处理" />
            ) : (
                    <Badge status="processing" text="进行中" />
                ),
    },
    {
        title: '创建日期',
        dataIndex: 'time',
        sorter: true,
        key: 'time',
    },
    {
        title: '操作',
        render: (text, record) => (
            <Fragment>
                <a onClick={() => this.handleUpdateModalVisible(true, record)}>查看</a>
            </Fragment>
        ),
    },
];

@connect(({ feedback, loading }) => ({
    feedback,
    loading: loading.effects['feedback/fetchList'],
}))
class List extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'feedback/fetchList',
        });
    }

    render() {
        const { feedback, loading } = this.props;
        const { feedbackList } = feedback;

        const pageHeaderContent = (
            <div className={styles.pageHeaderTitle}>反馈列表</div>
        )

        const extraContent = (
            <div className={styles.extraContent}>
                <Search className={styles.extraContentSearch} placeholder="请输入" onSearch={() => ({})} />
            </div>
        );
        
        return (
            <PageHeaderWrapper content={pageHeaderContent} extraContent={extraContent}>
                <Card bordered={false}>
                    <Table
                        style={{ marginBottom: 16 }}
                        pagination={true}
                        loading={loading}
                        dataSource={feedbackList}
                        columns={progressColumns}
                    />
                </Card>
            </PageHeaderWrapper>
        );
    }
}

export default List;
