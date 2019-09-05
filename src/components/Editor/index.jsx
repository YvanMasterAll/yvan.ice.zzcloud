import React, { useState, useEffect } from 'react'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'

const Editor = function(props) {
    let _editorState = props.editorState
    if (props.data && props.editorState === null) {
        _editorState = BraftEditor.createEditorState(props.data.content)
    }

    let editorProps = {
        value: _editorState,
        height: 500,
        contentFormat: 'html',
        initialContent: '<p></p>',
        onChange: props.handleChange,
        media: {
            accepts: {
                image: 'image/png, image/jpeg, image/gif, image/webp, image/apng, image/svg'
            },
            uploadFn: props.uploadImage
        }
    }

    return (
        <BraftEditor {...editorProps} />
    )
}

export default Editor