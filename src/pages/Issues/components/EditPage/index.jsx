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

function EditPage(props) {
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
        formRef.validateAll(function(data, errors, values) {
            if (errors) {
                console.log(errors)
                return false
            }
            
            let content = data.content
            let rawtext = data.rawtext
            if (editorState !== null) {
                content = editorState.toHTML()
                rawtext = editorState.toText()
            }

            let _data = {
                content: content,
                rawtext: rawtext,
                issueId: data.id
            }

            console.log(_data)

            async function _request(data) {
                console.log(data)
                let result = await request({
                    url: urls.issueEdit.url,
                    method: urls.issueEdit.method,
                    data: data
                })
                if (result.valid) {
                    Message.success('编辑issue成功')
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
        }.bind(this, data))
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
                    <h2 className={styles.title}>issue详情</h2>
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
                                uploadImage,
                                data
                            }} />
                        </FormItem>
                        <FormItem label="">
                            <Button type="primary" onClick={handleSubmit}>
                                保存issue
                            </Button>
                        </FormItem>
                    </Form>
                </IceContainer>
            </IceFormBinderWrapper>
        </div>
    )
}

export default withRouter(EditPage)