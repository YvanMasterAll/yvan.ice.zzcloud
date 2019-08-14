/* eslint react/no-string-refs:0 */
import React, { useState } from 'react'
import { Grid, DatePicker, Select, Button, Input } from '@alifd/next'
import {
    FormBinderWrapper as IceFormBinderWrapper,
    FormBinder as IceFormBinder,
    FormError as IceFormError
} from '@icedesign/form-binder'
import { FormattedMessage } from 'react-intl'
import styles from './index.module.scss'
import { util } from '@/utils'

const { Row, Col } = Grid
const { RangePicker } = DatePicker;

export default function Filter(props) {
    const [value] = useState({})
    let form

    function formChange(formData) {
        // props.onChange(formData)
        // console.log(formData)
    }

    function onSearch() {
        form.validateAll((errors, values) => {
            if (errors) {
                console.log({ errors })
                return
            }
            // 搜索事件
            if (values.time) {
                if (values.time[0]) { values.stime = util.toDateString(values.time[0]) }
                if (values.time[1]) { values.etime = util.toDateString(values.time[1]) }
            }
            console.log(values)
            props.onChange(values)
        })
    }

    return (
        <IceFormBinderWrapper value={value} onChange={formChange} ref={formRef => (form = formRef)}>
            <Row wrap gutter="40" className={styles.formRow}>
                <Col xs="12" l="12">
                    <div className={styles.formItem}>
                        <span className={styles.formLabel}>话题标题：</span>
                            <IceFormBinder name="title">
                                <Input
                                    placeholder="搜索知识库标题"
                                    style={{ width: '70%' }}
                                />
                            </IceFormBinder>
                        <div className={styles.formError}>
                            <IceFormError name='title' />
                        </div>
                    </div>
                </Col>
                <Col xs="12" l="12">
                    <div className={styles.formItem}>
                        <span className={styles.formLabel}>创建用户：</span>
                            <IceFormBinder name="name">
                                <Input
                                    placeholder="搜索commit创建用户"
                                    style={{ width: '70%' }}
                                />
                            </IceFormBinder>
                        <div className={styles.formError}>
                            <IceFormError name='name' />
                        </div>
                    </div>
                </Col>
                <Col xs="12" l="12">
                    <div className={styles.formItem}>
                        <span className={styles.formLabel}>创建时间：</span>
                        <IceFormBinder name="time">
                            <RangePicker style={{ width: '70%' }} />
                            {/* <DatePicker
                                placeholder="知识库创建时间"
                                style={{ width: '70%' }}
                            /> */}
                        </IceFormBinder>
                        <div className={styles.formError}>
                            <IceFormError name="time" />
                        </div>
                    </div>
                </Col>
                <Col xs="12" l="12">
                    <div className={styles.formItem}>
                        <span className={styles.formLabel}>数据状态：</span>
                        <IceFormBinder name="state">
                            <Select style={{ width: '70%' }} hasClear={true}>
                                <Select.Option value={util.state.ON}>
                                    {util.state._ON}
                                </Select.Option>
                                <Select.Option value={util.state.OFF}>
                                    {util.state._OFF}
                                </Select.Option>
                                <Select.Option value={util.state.Cancel}>
                                    {util.state._Cancel}
                                </Select.Option>
                                <Select.Option value={util.state.Accept}>
                                    {util.state._Accept}
                                </Select.Option>
                                <Select.Option value={util.state.Deny}>
                                    {util.state._Deny}
                                </Select.Option>
                                <Select.Option value={util.state.Delete}>
                                    {util.state._Delete}
                                </Select.Option>
                                <Select.Option value={util.state.Complete}>
                                    {util.state._Complete}
                                </Select.Option>
                                <Select.Option value={util.state.Unread}>
                                    {util.state._Unread}
                                </Select.Option>
                                <Select.Option value={util.state.Read}>
                                    {util.state._Read}
                                </Select.Option>
                            </Select>
                        </IceFormBinder>
                        <div className={styles.formError}>
                            <IceFormError name="state" />
                        </div>
                    </div>
                </Col>
                <Col xs="24" l="24">
                    <div style={{display: "flex", height: "100%", alignItems: 'center', marginLeft: 80, marginTop: 6}}>
                        <Button type="primary" onClick={onSearch}>
                            <FormattedMessage id="app.general.table.btn.search" />
                        </Button>
                    </div>
                </Col>
            </Row>
        </IceFormBinderWrapper>
    )
}
