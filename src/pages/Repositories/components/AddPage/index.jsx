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
import TodosDialog from '../TodosDialog'
import Editor from '@/components/Editor'

const { Row, Col } = Grid
const FormItem = Form.Item

function AddPage(props) {
    let formRef
    let uploadRef

    const [value, setValue] = useState({
        title: '',
        bgimage: null,
        content: null
    })
    const [editorState, setEditorState] = useState(null)
    const [bgURL, setBgURL] = useState(null)
    const [visible, setVisible] = useState(false)
    const [todos, setTodos] = useState([])

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

            let title = values.title
            if (editorState === null) {
                Message.error("请勿提交空内容")
                return
            }
            let content = editorState.toHTML()
            let rawtext = editorState.toText()
            let _data = {
                title: title,
                content: content,
                rawtext: rawtext,
                todos: todos
            }

            console.log(_data)
            console.log(bgURL)

            async function _request(data) {
                console.log(data)
                let result = await request({
                    url: urls.repoAdd.url,
                    method: urls.repoAdd.method,
                    data: data
                })
                if (result.valid) {
                    Message.success('成功添加知识库')
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

    const uploadBg = async function(option) {
        let fd = new FormData()
        fd.append(option.filename, option.file)
        let result = await request({
            url: urls.uploadImage.url,
            method: urls.uploadImage.method,
            data: fd
        })
        if (result.valid) {
            option.onSuccess(result)
        } else {
            option.onError(result)
        }
    }

    const uploadChanged = function(value) {
        if (value.length > 0) {
            setBgURL(value[0].url)
        }
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

    const onOpen = () => {
        setVisible(true)
    }

    const editTodos = async function() {
        setVisible(false)
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
                <TodosDialog visible={visible} setVisible={setVisible} todos={todos} setTodos={setTodos} editTodos={editTodos} />
                <IceContainer>
                    <h2 className={styles.title}>添加知识库</h2>
                    <Form labelAlign="top" className={styles.form}>
                        <FormItem
                            label="大图"
                        >
                            <Upload.Card
                                name="bgimage"
                                listType="card"
                                limit={1}
                                // action={global.config.baseUrl + urls.uploadImage.url}
                                accept="image/png, image/jpg, image/jpeg, image/gif, image/bmp"
                                // ref={ref => { uploadRef = ref.getInstance() }} // 拿不到ref
                                // beforeUpload={beforeUpload}
                                onChange={uploadChanged}
                                // onSuccess={onUpload}
                                // onError={onError}
                                formatter={(res, file) => {
                                    return {
                                        success: res.valid,
                                        msg: res.msg,
                                        url: res.msg
                                    }
                                }}
                                request={uploadBg}
                                defaultValue={[]}
                            />
                        </FormItem>
                        <Row>
                            <Col span="11">
                                <FormItem label="标题" required>
                                    <IceFormBinder
                                        name="title"
                                        required
                                        message="标题必须"
                                    >
                                        <Input placeholder="编辑知识库标题" />
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
                            <Button onClick={onOpen} type="primary" style={{marginRight: 20}}>编辑todos</Button>
                            <Button type="primary" onClick={handleSubmit}>
                                发布知识库
                            </Button>
                        </FormItem>
                    </Form>
                </IceContainer>
            </IceFormBinderWrapper>
        </div>
    )
}

export default withRouter(AddPage)