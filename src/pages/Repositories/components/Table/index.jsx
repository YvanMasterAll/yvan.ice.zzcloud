import React, { useState, useEffect } from 'react'
import { Table, Pagination, Button, Dialog, Dropdown, Menu } from '@alifd/next'
import { FormattedMessage } from 'react-intl'
import { Grid } from '@alifd/next'
import IceContainer from '@icedesign/container'
import { Message } from '@alifd/next'
import styles from './index.module.scss'
import request from '@/utils/request'
import * as urls from '@/dataSourceConfig'
import { util } from '@/utils'
import { injectIntl } from 'react-intl'
import FilterForm from '../FilterForm'
import { withRouter } from 'react-router'
import ContainerTitle from '@/components/ContainerTitle'
import EditPage from '../EditPage'
import AddPage from '../AddPage'
import Preview from '../Preview'

const { Row, Col } = Grid

const ys = {}
ys.filters = {}

const ReposTable = props => {
    const [total, setTotal] = useState(0)
    const [current, setCurrent] = useState(1)
    const [isLoading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const [selected, setSelected] = useState([])
    const [visible, setVisible] = useState(false)
    const [previewNode, setPreviewNode] = useState(null)
    const [previewContent, setPreviewContent] = useState(null)
    const {
        intl: { formatMessage }
    } = props
    
    // 获取路由数据
    let _data = props.location.state
    let pathname = props.location.pathname

    useEffect(() => {
        fetchData()
    }, [])

    async function fetchData(page) {
        await setLoading(true)
        setSelected([])

        let _page = current
        if (page) {
            _page = page
        }

        let result = await request({
            method: urls.repos.method,
            url: urls.repos.url,
            data: { page: _page, total: total, ...ys.filters }
        })

        // 隐藏菊花
        setLoading(false)

        if (result.valid) {
            setData(result.dataDicts)
            setTotal(result.cursor.totalRecords)
        } else {
            Message.show({
                type: 'error',
                title: '错误',
                content: result.msg,
                hasMask: true
            })
        }
    }

    async function handlePaginationChange(currentPage) {
        await setCurrent(currentPage)
        fetchData(currentPage)
    }

    function handleFilterChange(values) {
        // 重置查询参数
        ys.filters = values
        setCurrent(1)
        fetchData(1)
    }

    function handleDeleteSelected() {
        Dialog.confirm({
            title: '提示',
            content: '确定要删除选中的知识库吗',
            onOk: async function() {
                // 删除选中知识库
                let result = await request({
                    url: urls.repoDelete.url,
                    method: urls.repoDelete.method,
                    params: { repoIds: selected }
                })
                if (result.valid) {
                    fetchData()
                } else {
                    Message.show({
                        type: 'error',
                        title: '错误',
                        content: result.msg,
                        hasMask: true
                    })
                }
            }
        })
    }

    function handleDelete(_repoId) {
        Dialog.confirm({
            title: '提示',
            content: '确定要删除吗',
            onOk: async function() {
                // 删除知识库
                let result = await request({
                    url: urls.repoDelete.url,
                    method: urls.repoDelete.method,
                    data: { repoId: _repoId }
                })
                if (result.valid) {
                    fetchData()
                } else {
                    Message.show({
                        type: 'error',
                        title: '错误',
                        content: result.msg,
                        hasMask: true
                    })
                }
            }
        })
    }

    function handleDetail(data) {
        props.history.push({pathname: '/repository/edit', state: data})
        // Dialog.confirm({
        //     title: '提示',
        //     content: '暂不支持查看详情'
        // })
    }

    function rowSelectionChanged(data) {
        setSelected(data)
    }

    function gotoAdd() {
        props.history.push('/repository/add')
    }

    const moreMenuTrigger = (
        <div style={{display: 'inline-block', marginLeft: 8}}>
            <a style={{fontSize: 12, cursor: 'pointer', color: '#5584FF'}}>更多</a>
            <div style={{display: 'inline-block', position: 'relative', bottom: 3, borderColor: '#5584FF', marginLeft: 2}} className={'chevron down'}></div>
        </div>
    )

    function gotoCommit(data) {
        props.history.push({pathname: '/commit', state: {_repoId: data.repoId}})
    }

    function gotoIssue(data) {
        props.history.push({pathname: '/issue', state: {_repoId: data.repoId}})
    }

    function renderOper(_repoId, index, data) {
        return (
            <div>
                <Button
                    type="primary"
                    size="small"
                    style={{ marginRight: '5px' }}
                    onClick={handleDetail.bind(this, data)}
                >
                    <FormattedMessage id="app.btn.detail" />
                </Button>
                <Button
                    type="normal"
                    size="small"
                    warning
                    onClick={handleDelete.bind(this, _repoId)}
                >
                    <FormattedMessage id="app.btn.delete" />
                </Button>
                <Dropdown trigger={moreMenuTrigger}  triggerType={["click"]}>
                    <Menu>
                        <Menu.Item onClick={gotoCommit.bind(this, data)}>查看commit</Menu.Item>
                        <Menu.Item onClick={gotoIssue.bind(this, data)}>查看issue</Menu.Item>
                    </Menu>
                </Dropdown>
            </div>
        )
    }

    function renderState(_state) {
        const { state, color } = util.state.toStateString(_state)
        return <div style={{ color: color }}>{state}</div>
    }

    function renderTitle(_title, index, data) {
        return <a id={'preview' + index} style={{cursor: 'pointer'}} onClick={openPreview.bind(this, data, index)}>{_title}</a>
    }

    function openPreview(data, index) {
        setPreviewNode('preview' + index)
        setPreviewContent(data.content)
        setVisible(true)
    }

    function renderTime(_time) {
        return <div>{util.toDateString(_time * 1000)}</div>
    }

    if (props.location.pathname === '/repository/edit') {
        if (_data) { //如果路由带了数据, 跳转到编辑页面
            return (
                <EditPage props={_data} />
            )
        } else {
            props.history.push('/repository')
        }
    }
    if (props.location.pathname === '/repository/add') {
        return (
            <AddPage />
        )
    }

    return (
        <div className={styles.container}>
            <IceContainer style={{ padding: '0' }}>
                <Preview visible={visible} setVisible={setVisible} content={previewContent} previewNode={previewNode} />
                <div style={{position: 'relative'}}>
                    <ContainerTitle
                        title={formatMessage({
                            id: 'app.repository.list.title'
                        })}
                    />
                    <Button
                        type="secondary"
                        size={'medium'}
                        onClick={gotoAdd}
                        style={{position: 'absolute', right: 20, top: 10}}
                    >
                        添加知识库
                    </Button>
                </div>
                <div style={{ padding: '20px' }}>
                    <FilterForm onChange={handleFilterChange} />
                    <Row style={{ marginTop: 20 }}>
                        <Col>
                            <Table
                                loading={null /*isLoading*/}
                                primaryKey={'repoId'}
                                dataSource={data}
                                hasBorder={false}
                                rowSelection={{
                                    onChange: rowSelectionChanged,
                                    selectedRowKeys: selected
                                }}
                            >
                                <Table.Column
                                    title="用户名"
                                    dataIndex="username"
                                />
                                <Table.Column
                                    title="知识库标题"
                                    dataIndex="repoTitle"
                                    cell={renderTitle}
                                />
                                <Table.Column
                                    title="浏览量"
                                    dataIndex="watchs"
                                />
                                <Table.Column title="排行" dataIndex="rank" />
                                <Table.Column
                                    title="收藏"
                                    dataIndex="collections"
                                />
                                <Table.Column
                                    title="状态"
                                    dataIndex="state"
                                    cell={renderState}
                                />
                                <Table.Column
                                    title="时间"
                                    dataIndex="createtime"
                                    cell={renderTime}
                                />
                                <Table.Column
                                    title="操作"
                                    width={200}
                                    dataIndex="repoId"
                                    cell={renderOper}
                                />
                            </Table>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: 20, alignItems: 'center' }}>
                        <Col
                            style={{ flex: 0 }}
                            hidden={selected.length > 0 ? false : true}
                        >
                            <Button
                                type="normal"
                                onClick={handleDeleteSelected}
                                size={'small'}
                            >
                                删除所选
                            </Button>
                        </Col>
                        <Col>
                            <Pagination
                                className={styles.pagination}
                                current={current}
                                total={total}
                                pageSize={global.config.pageSize}
                                onChange={handlePaginationChange}
                            />
                        </Col>
                    </Row>
                </div>
            </IceContainer>
        </div>
    )
}

export default withRouter(injectIntl(ReposTable))
