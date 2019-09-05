import React, { useState, useEffect } from 'react'
import IceContainer from '@icedesign/container'
import { Table, Input, Grid, Form, Button, Select, Message, Upload } from '@alifd/next'
import {
    FormBinderWrapper as IceFormBinderWrapper,
    FormBinder as IceFormBinder,
    FormError as IceFormError
} from '@icedesign/form-binder'
import { FormattedMessage } from 'react-intl'
import { withRouter } from 'react-router'
import styles from './index.module.scss'
import * as urls from '@/dataSourceConfig'
import request from '@/utils/request'
import Editor from '@/components/Editor'

const { Row, Col } = Grid
const FormItem = Form.Item

function AddPage(props) {
    const data = props.location.state

    let formRef
    let uploadRef

    const [value, setValue] = useState({
        title: data.repo_title,
        content: null
    })
    const [editorState, setEditorState] = useState(null)

    const handleChange = (rawContent) => {
        setEditorState(rawContent)
    }

    const formChange = function(formValue) {
        setValue(formValue)
    }

    const handleSubmit = function() {
        formRef.validateAll(function(errors, values) {
            if (errors) {
                console.log(errors)
                return false
            }

            if (editorState === null) {
                Message.error("请勿提交空内容")
                return
            }
            let content = editorState.toHTML()
            let rawtext = editorState.toText()
            let _data = {
                repoId: data.repoId,
                content: content,
                rawtext: rawtext
            }

            console.log(_data)

            async function _request(data) {
                let result = await request({
                    url: urls.commitAdd.url,
                    method: urls.commitAdd.method,
                    data: data
                })
                if (result.valid) {
                    Message.success('成功添加commit')
                } else {
                    Message.show({
                        type: 'error',
                        title: '错误',
                        content: result.msg,
                        hasMask: false
                    })
                }
            }
            _request(_data)
        })
    }

    const uploadImage = async function(option) {
        let fd = new FormData()
        fd.append(option.file.name, option.file)
        let result = await request({
            url: urls.uploadImage.url,
            method: urls.uploadImage.method,
            data: fd
        })
        if (result.valid) {
            option.success({
                url: result.msg
            })
        } else {
            option.error({
                msg: result.msg
            })
        }
    }

    return (
        <div className="content-editor">
            <IceFormBinderWrapper
                ref={refInstance => {
                    formRef = refInstance
                }}
                value={value}
                onChange={formChange}
            >
                <IceContainer>
                    <h2 className={styles.title}>添加commit</h2>
                    <Form labelAlign="top" className={styles.form}>
                        <Row>
                            <Col span="11">
                                <FormItem label="标题" required>
                                    <IceFormBinder
                                        name="title"
                                    >
                                        <Input readOnly />
                                    </IceFormBinder>
                                    <IceFormError name="title" />
                                </FormItem>
                            </Col>
                        </Row>
                        <FormItem label="正文" required>
                            <Editor {...{
                                editorState,
                                handleChange,
                                uploadImage
                            }} />
                        </FormItem>
                        <FormItem label="">
                            <Button type="primary" onClick={handleSubmit}>
                                发布commit
                            </Button>
                        </FormItem>
                    </Form>
                </IceContainer>
            </IceFormBinderWrapper>
        </div>
    )
}

export default withRouter(AddPage)