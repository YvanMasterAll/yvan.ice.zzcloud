import React, { useState, useEffect } from 'react'
import IceContainer from '@icedesign/container'
import { Table, Input, Grid, Form, Button, Select, Message, Upload, Radio } from '@alifd/next'
import { withRouter } from 'react-router'
import styles from './index.module.scss'
import * as urls from '@/dataSourceConfig'
import request from '@/utils/request'
import {
    FormBinderWrapper as IceFormBinderWrapper,
    FormBinder as IceFormBinder,
    FormError as IceFormError
} from '@icedesign/form-binder'

const { Row, Col } = Grid
const FormItem = Form.Item
const { Group: RadioGroup } = Radio

function EditPage(props) {
    const data = props.location.state
    console.log(data)

    let formRef

    const [value, setValue] = useState({
        username: data.username,
        password: '',
        gender: 'male',
        phone: data.phone,
        signature: data.signature,
        portrait: [{
            name: '',
            state: 'done',
            size: 1024,
            downloadURL: data.portrait,
            fileURL: data.portrait,
            imgURL: data.portrait
        }]
    })

    const formChange = function(formValue) {
        setValue(formValue)
    }

    const handleSubmit = function() {
        formRef.validateAll(function(errors, values) {
            if (errors) {
                console.log(errors)
                return false
            }

            let password = undefined
            if (values.password !== '') {
                password = values.password
            }
            let _data = {
                ...values, password, userId: data.id, portrait: values.portrait[0].imgURL
            }

            async function _request(data) {
                let result = await request({
                    url: urls.userEdit.url,
                    method: urls.userEdit.method,
                    data: data
                })
                if (result.valid) {
                    Message.success('编辑用户成功')
                    // 跳转回用户列表
                    props.history.push('/users')
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

    const uploadPortrait = async function(option) {
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

    const checkPassword = (rule, values, callback) => {
        if (!values) {
            callback()
        } else if (values.length < 8) {
            callback('用户密码必须大于8位')
        } else if (values.length > 16) {
            callback('用户密码必须小于16位')
        } else {
            callback()
        }
    }

    const reCheckPassword = (rule, values, callback) => {
        if (!value.password) {
            callback()
        } else if (values !== value.password) {
            callback('两次密码不同')
        } else {
            callback()
        }
    }

    const formItemLayout = {
        labelCol: { xxs: 6, s: 3, l: 3 },
        wrapperCol: { s: 12, l: 10 }
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
                    <Form>
                        <div className={styles.formContent}>
                            <h2 className={styles.formTitle}>
                                用户详情
                            </h2>
                            <FormItem label="用户名" {...formItemLayout}>
                                <IceFormBinder
                                        name="username"
                                        required
                                        message="请填写用户名"
                                    >
                                    <Input placeholder="请填写用户名" />
                                </IceFormBinder>
                                <IceFormError name="username" />
                            </FormItem>
                            <FormItem label="手机号" {...formItemLayout}>
                                <IceFormBinder
                                        name="phone"
                                        rules={[{
                                            pattern: /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/,
                                            message: "请填写正确的手机号码"
                                        },
                                        {
                                            required: true,
                                            message: "请填写用户手机号"
                                        }]}
                                    >
                                    <Input placeholder="请填写用户手机号" />
                                </IceFormBinder>
                                <IceFormError name="phone" />
                            </FormItem>
                            <FormItem label={"性别"} {...formItemLayout}>
                                <IceFormBinder
                                        name="gender"
                                        required
                                        message="请选择性别"
                                    >
                                    <RadioGroup>
                                        <Radio value="male">
                                            "男"
                                        </Radio>
                                        <Radio value="female">
                                            "女"
                                        </Radio>
                                    </RadioGroup>
                                </IceFormBinder>
                                <IceFormError name="gender" />
                            </FormItem>
                            <FormItem label={"头像"} {...formItemLayout}>
                                <IceFormBinder
                                        name="portrait"
                                        required
                                        message="用户头像必须"
                                    >
                                    <Upload.Card
                                        listType="card"
                                        limit={1}
                                        accept="image/png, image/jpg, image/jpeg, image/gif, image/bmp"
                                        // onChange={uploadChanged}
                                        formatter={(res, file) => {
                                            return {
                                                success: res.valid,
                                                msg: res.msg,
                                                url: res.msg
                                            }
                                        }}
                                        request={uploadPortrait}
                                        defaultValue={[]}
                                    />
                                </IceFormBinder>
                                <div><IceFormError name="portrait" /></div>
                            </FormItem>
                            <FormItem label="密码" {...formItemLayout}>
                                <IceFormBinder
                                        name="password"
                                        validator={checkPassword}
                                    >
                                    <Input htmlType="password" placeholder="填写要修改的密码" />
                                </IceFormBinder>
                                <IceFormError name="password" />
                            </FormItem>
                            <FormItem label="确认密码" {...formItemLayout}>
                                <IceFormBinder
                                        name="repassword"
                                        validator={reCheckPassword}
                                    >
                                    <Input htmlType="password" placeholder="请重新确认密码" />
                                </IceFormBinder>
                                <IceFormError name="repassword" />
                            </FormItem>
                            <FormItem label="个性签名" {...formItemLayout}>
                                <IceFormBinder
                                        name="signature"
                                        required
                                        message="请填写用户的个性签名"
                                    >
                                    <Input.TextArea placeholder="请填写用户的个性签名..." />
                                </IceFormBinder>
                                <IceFormError name="signature" />
                            </FormItem>
                            <Row style={{ marginTop: 20 }}>
                                <Col offset="3">
                                    <Form.Submit
                                        type="primary"
                                        style={{ width: 100 }}
                                        validate
                                        onClick={handleSubmit}
                                    >
                                        保存
                                    </Form.Submit>
                                </Col>
                            </Row>
                        </div>
                    </Form>
                </IceContainer>
            </IceFormBinderWrapper>
        </div>
    )
}

export default withRouter(EditPage)