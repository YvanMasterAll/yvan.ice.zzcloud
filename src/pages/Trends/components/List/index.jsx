import React, { useState, useEffect } from 'react'
import IceContainer from '@icedesign/container'
import { Grid, Icon, Pagination } from '@alifd/next'
import styles from './index.module.scss'
import { injectIntl } from 'react-intl'
import FilterForm from '../FilterForm'
import { withRouter } from 'react-router'
import ContainerTitle from '@/components/ContainerTitle'
import { Message } from '@alifd/next'
import request from '@/utils/request'
import { util } from '@/utils'
import * as urls from '@/dataSourceConfig'
import Img from '@icedesign/img'
import IceEllipsis from '@icedesign/ellipsis'
import _ from 'lodash'
import Preview from '../Preview'

const { Row, Col } = Grid

const ys = {}
ys.filters = {}

const getData = () => {
    // return Array.from({ length: 10 }).map((item, index) => {
    //     return {
    //         title: `${index + 1}. 这里是试卷名称这里是试卷名称这里是试卷名称`,
    //         time: `2018-06-1${index}`,
    //         citation: index + 1,
    //         score: index + 90,
    //         subject: '自然语言',
    //         count: 20
    //     }
    // })
    return Array.from({ length: 10 }).map((item, index) => {
        return {
            createtime: 587029774.3169999,
            guestId: "242DA7A1-C506-48D9-9F06-BCF424B251F4",
            guestName: "皮皮的铲屎官",
            guestPortrait: "http://localhost:8181/upload/portrait/portrait5.jpeg",
            guestSignature: "阅读爱好者、知识收藏者、实用主义者",
            id: "A19E49F6-8D49-4D15-98FA-117BC8C0773A",
            issueContent: "issue content",
            issueId: "2C200BF9-95D3-46D0-804A-27A0715D37DF",
            issueRawtext: "issue rawtext",
            masterId: "B1C2E360-0E8B-4746-BF8F-C2057EA6C3DF",
            portrait: "http://localhost:8181/upload/portrait/portrait4.jpeg",
            repoContent: "repo content",
            repoId: "5163BDBB-19FA-4D6F-A722-E455532E9773",
            repoRawtext: "repo rawtext",
            signature: "阅读爱好者、知识收藏者、实用主义者",
            type: "HadNewIssue",
            userid: "B1C2E360-0E8B-4746-BF8F-C2057EA6C3DF",
            username: "电商狗-老李",
            repoTitle: "知识库标题"
        }
    })
}

function TrendList(props) {
    // const _data = getData()
    const [current, setCurrent] = useState(1)
    const [total, setTotal] = useState(0)
    const [data, setData] = useState([])
    const [visible, setVisible] = useState(false)
    const [previewNode, setPreviewNode] = useState(null)
    const [previewContent, setPreviewContent] = useState(null)

    useEffect(() => {
        fetchData()
    }, [])

    // 获取路由数据
    let _data = props.location.state
    let pathname = props.location.pathname

    async function fetchData(page) {
        let _page = current
        if (page) {
            _page = page
        }

        let result = await request({
            method: urls.trends.method,
            url: urls.trends.url,
            data: { userId: (_data && _data._userid) ? _data._userid:null, page: _page, total: total, ...ys.filters }
        })

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
        // 如果数据为空将它设为undefined, 避免提交伪参数
        for (var index in values) {
            if (_.trimStart(values[index]) === "") {
                values[index] = undefined
            }
        }
        // 重置查询参数
        ys.filters = values
        setCurrent(1)
        fetchData(1)
    }

    function openPreview(data, index) {
        setPreviewNode('preview' + index)
        setPreviewContent(data.repoContent)
        setVisible(true)
    }

    function renderContent(item, index) {
        let type = util.trend_type.toTypeString(item.type).type
        let type_color = util.trend_type.toTypeString(item.type).color
        let content = item.repoRawtext
        let portrait = item.portrait
        let username = item.username
        if (item.type === util.trend_type.AddCommit || item.type === util.trend_type.HadNewCommit || item.type === util.trend_type.CommitAccepted || item.type === util.trend_type.CommitDeny) {
            username = item.guestName
            content = item.commitRawtext
            portrait = item.guestPortrait
        } else if (item.type === util.trend_type.AddIssue || item.type === util.trend_type.HadNewIssue || item.type === util.trend_type.IssueAccepted || item.type === util.trend_type.IssueDeny) {
            username = item.guestName
            content = item.issueRawtext
            portrait = item.guestPortrait
        }
        return (
            <div className={styles.item} key={index}>
                <div className={styles.itemHeader}>
                    <Img className={styles.portrait} width={28} height={28} type="cover" src={portrait} style={{borderRadius: 4}} />
                    <div className={styles.name}>{username}</div>
                    <div 
                        className={styles.type} 
                        style={{marginLeft: 'auto', marginRight: '20px', color: type_color, border: '1px solid ' + type_color}}
                        >
                        {type}
                    </div>
                </div>
                <div className={styles.itemTitle}>{item.repoTitle}</div>
                <div className={styles.itemContent} id={'preview' + index} onClick={openPreview.bind(this, item, index)}>
                    <IceEllipsis style={{width: '100%', cursor: 'pointer'}} lineLimit={3} text={content} />
                </div>
            </div>
        )
    }

    const {
        intl: { formatMessage }
    } = props

    return (
        <div className={styles.container}>
            <IceContainer style={{ padding: '0' }}>
                <Preview visible={visible} setVisible={setVisible} content={previewContent} previewNode={previewNode} />
                <div style={{position: 'relative'}}>
                    <ContainerTitle
                        title={formatMessage({
                            id: 'app.trend.list.title'
                        })}
                    />
                </div>
                <div style={{ padding: '20px' }}>
                    <FilterForm onChange={handleFilterChange} />
                    <Row style={{ marginTop: 20 }}>
                        <Col span={24}>
                            <div className={styles.contentList}>
                            {data.map((item, index) => renderContent(item, index))}
                            </div>
                            <Pagination
                                className={styles.pagination}
                                current={current}
                                onChange={handlePaginationChange}
                                total={total}
                            />
                        </Col>
                    </Row>
                </div>
            </IceContainer>
        </div>
    )
}

export default injectIntl(withRouter(TrendList))