import { useRef, useState, useEffect } from "react";
import asset from "plugins/assets/asset";
import CONFIG from "web.config";
const FormData = require("form-data");

const Editor = (props) => {
    const editorRef = useRef();
    const [editorLoaded, setEditorLoaded] = useState(false);
    const { CKEditor } = editorRef.current || {};

    useEffect(function() {
        editorRef.current = {
            CKEditor: require('ckeditor4-react'),
        }
        setEditorLoaded(true);
    }, []);
    return (
        <React.Fragment>
            { editorLoaded ? (
                <CKEditor
                    ref={el => props.refRoot.current[props.refName] = el}
                    type="classic"
                    data={props.content}
                    config={{
                        width: '100%',
                        height: '500px',
                        extraPlugins: ['justify', 'font', 'colorbutton', 'iframe', 'youtube'],
                        allowedContent: true,
                        toolbar: [
                            { name: 'document', groups: [ 'mode', 'document', 'doctools' ], items: [ 'Source', '-', 'Save', 'NewPage', 'ExportPdf', 'Preview', 'Print', '-', 'Templates' ] },
                            { name: 'clipboard', groups: [ 'clipboard', 'undo' ], items: [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo' ] },
                            { name: 'editing', groups: [ 'find', 'selection', 'spellchecker' ], items: [ 'Find', 'Replace', '-', 'SelectAll', '-', 'Scayt' ] },
                            { name: 'forms', items: [ 'Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField' ] },
                            '/',
                            { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ], items: [ 'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'CopyFormatting', 'RemoveFormat' ] },
                            { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ], items: [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl', 'Language' ] },
                            { name: 'links', items: [ 'Link', 'Unlink', 'Anchor' ] },
                            { name: 'insert', items: [ 'Image', 'Flash', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak', 'Iframe', 'Youtube' ] },
                            '/',
                            { name: 'styles', items: [ 'Styles', 'Format', 'Font', 'FontSize' ] },
                            { name: 'colors', items: [ 'TextColor', 'BGColor' ] },
                            { name: 'tools', items: [ 'Maximize', 'ShowBlocks' ] },
                            { name: 'others', items: [ '-' ] },
                            { name: 'about', items: [ 'About' ] }
                        ],
                        filebrowserBrowseUrl: `${CONFIG.NEXT_PUBLIC_BASE_PATH}/admin/plugins/filemanager/browser/index.html?rs=${CONFIG.NEXT_PUBLIC_API_BASE_PATH}&rc=${CONFIG.NEXT_PUBLIC_BASE_PATH}&rdome=${props.user.token}`,
                        filebrowserUploadUrl: `${CONFIG.NEXT_PUBLIC_API_BASE_PATH}/api/v1/admin/ckeditors/single`,
                        imageUploadUrl: `${CONFIG.NEXT_PUBLIC_API_BASE_PATH}/api/v1/admin/ckeditors/single`,
                        uploadUrl: `${CONFIG.NEXT_PUBLIC_API_BASE_PATH}/api/v1/admin/ckeditors/single`,
                        on: {
                            fileUploadRequest: function(evt) {
                                var fileLoader = evt.data.fileLoader;
                                var formData = new FormData();
                                var xhr = fileLoader.xhr;
                                //
                                xhr.open('POST', fileLoader.uploadUrl, true);
                                xhr.setRequestHeader('Authorization', `Bearer ${props.user.token}`);
                                formData.append('file', fileLoader.file);
                                fileLoader.xhr.send( formData );
                                // Prevented the default behavior.
                                evt.stop();
                            },
                            fileUploadResponse: function(evt) {
                                // Prevent the default response handler.
                                evt.stop();
                                // Get XHR and response.
                                var data = evt.data;
                                var xhr = data.fileLoader.xhr;
                                var response = xhr.responseText.split( '|' );
                                if (response[1] || !response[0]) {
                                    // An error occurred during upload.
                                    data.message = JSON.parse(response[1])['message'][0] || '';
                                    evt.cancel();
                                } else {
                                    data.url = JSON.parse(response[0])['url'] || '';
                                }
                            }
                        },
                    }}
                    beforeInit={editor => {
                        console.log(123);
                    }}
                    onBeforeLoad={editor => {
                        editor.plugins.addExternal('filemanager', asset('/admin/plugins/filemanager/'), 'plugin.js');
                        editor.plugins.addExternal('youtube', asset('/admin/plugins/youtube/'), 'plugin.js');
                    }}
                    onChange={(event, editor) => {}}
                />
            ) : ''}
        </React.Fragment>
    );
};

export default Editor;