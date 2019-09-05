import React, { useState } from 'react'
import { Grid, Input, Button, Radio, Dialog, Tag } from '@alifd/next'
import _ from 'lodash'

const { Row, Col } = Grid
const {Group: TagGroup, Closeable: CloseableTag} = Tag;

const TodosDialog = function(props) {
    const [footerActions, setFooterActions] = useState(['ok', 'cancel'])
    const [footerAlign, setFooterAlign] = useState('right')
    const [loading, setLoading] = useState(false)
    const [todo, setTodo] = useState('')

    const onClose = () => {
        props.setVisible(false)
    }

    const onOk = () => {
        props.editTodos()
    }

    const toggleFooterActions = footerActionsStr => {
        setFooterActions(footerActionsStr.split(','))
    }

    const toggleFooterAlign = footerAlign => {
        setFooterAlign(footerAlign)
    }

    const toggleOkLoader = loading => {
        setLoading(loading)
    }

    const onTagClose = function(value, index) {
        let _todos = Object.assign([], props.todos)
        _todos.splice(index, 1)
        props.setTodos(_todos)

        return false
    }

    const inputChanged = function(value) {
        setTodo(_.trimStart(value))
    }

    const onAdd = function() {
        if (todo !== '') {
            let _todos = Object.assign([], props.todos)
            _todos.push({
                content: todo
            })
            props.setTodos(_todos)
            setTodo('')
        }
    }

    const okProps = {
        loading
    }

    return (
        <Dialog title="编辑todos"
            visible={props.visible}
            footerActions={footerActions}
            footerAlign={footerAlign}
            onOk={onOk}
            onCancel={onClose}
            onClose={onClose}
            okProps={okProps}
            >
            <div className="content" style={{width: 600}}>
                <Row>
                    <Col span={20}>
                        <Input
                            placeholder="编辑todo内容"
                            style={{width: "100%"}}
                            onChange={inputChanged}
                            value={todo}
                        />
                    </Col>
                    <Col span={4}>
                        <div style={{textAlign: 'right'}}>
                            <Button type="primary" onClick={onAdd}>
                                添加
                            </Button>
                        </div>
                    </Col>
                </Row>
                <div style={{marginTop: 20}}>
                    <TagGroup>
                        { props.todos.map((value, index) => {
                            return (
                                <CloseableTag key={index} onClose={onTagClose.bind(this, value, index)}>{value.content}</CloseableTag>
                            )
                        }) }
                    </TagGroup>
                </div>
            </div>
        </Dialog>
    )
}

export default TodosDialog