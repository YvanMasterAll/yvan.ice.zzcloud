import React, { useState, useEffect } from 'react'
import { Overlay } from '@alifd/next'
import { withRouter } from 'react-router'
import IceContainer from '@icedesign/container'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'

const Preview = function(props) {
    // const [editorState, setEditorState] = useState(null)

    const onClose = function() {
        props.setVisible(false)
    }

    const handleChange = (rawContent) => {
        // setEditorState(rawContent)
    }

    let editorProps = {
        defaultValue: BraftEditor.createEditorState(props.content),
        height: '100%',
        onChange: handleChange,
        readOnly: true,
        contentStyle: {
            height: 'calc(100% - 100px)'
        }
    }

    return (
        <Overlay visible={props.visible}
            // safeNode={() => btnRef}
            safeNode={props.previewNode}
            align="cc cc"
            hasMask
            disableScroll
            onRequestClose={onClose}>
            {/* <IceContainer><BraftEditor {...editorProps} /></IceContainer> */}
            <div style={{width: '80%', height: '90%', backgroundColor: 'white', borderRadius: 6}}>
                <BraftEditor {...editorProps} />
            </div>
        </Overlay>
    )
}

export default withRouter(Preview)