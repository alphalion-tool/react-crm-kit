/**
 * Created by lishengyong on 2017/3/15.
 *
 * <ExcelImport
 *  handleFileSelect={ this.handleFileSelect }
 *  dataSchema={{}}
 *  serverParse={true}
 * />
 *
 *
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Icon } from 'antd';
import './ExcelImport.scss';

const fixdata = function (data) {
    let o = '',
        l = 0;
    const w = 10240;
    for (; l < data.byteLength / w; ++l) {
        o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, (l * w) + w)));
    }
    o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
    return o;
};

class ImportExcel extends Component {

    static propTypes = {
        customerHandler: PropTypes.func, // 自定义处理数据回调， 如果有这个回调， 则不执行handleFileselect
        handleFileSelect: PropTypes.func.isRequired, // 数据解析完之后的回调
        dataSchema: PropTypes.object.isRequired, // 数据模型，客户端解析时需要用到
        serverParse: PropTypes.bool.isRequired, // 是否服务器解析
        serverUrl: PropTypes.string,
        size: PropTypes.string,
        tipMsg: PropTypes.func,
    };

    constructor(props) {
        super(props);
        this.state = {
            fileName: ''
        };
    }

    setFileName = event => {
        const { handleFileSelect, dataSchema, serverParse, serverUrl, size } = this.props;
        event.stopPropagation();
        const fileName = event.target.value;
        this.setState({
            fileName
        });
        this.handleUplodFile(dataSchema, handleFileSelect, serverParse, serverUrl);
        event.target.value = '';
    }

    handleServerParseFile = (formData, serverUrl) => {
        const self = this;
        const { customerHandler, handleFileSelect } = this.props;
        axios.post(serverUrl, formData, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(res => {
            if (res && res.status === 200) {
                if (customerHandler) {
                    customerHandler(res.data);
                    return;
                }
                if (res.data && res.data.code === 0 && res.data.data.length > 0) {
                    handleFileSelect(res.data.data);
                } else {
                    self.tipMsg && self.tipMsg('Import Tips', 'There is no data to bo imported!');
                }
            } else {
                self.tipMsg && self.tipMsg('Import Tips', res.statusText);
            }
        });
    }

    handleUplodFile = (dataSchema, handleFileSelect, serverParse, serverUrl) => {
        const self = this,
            rABS = true,
            target = self.uploadFile && self.uploadFile,
            fileName = target.value || '',
            files = target.files,
            templateSchema = dataSchema,
            formData = new FormData();
        let file,
            reader,
            result = [];

        if (files.length === 0) {
            self.tipMsg && self.tipMsg('Import excel File Tips', 'Choose an excel file first!')
            return;
        }

        if (!(fileName.endsWith('.xls') || fileName.endsWith('.xlsx') || fileName.endsWith('.xltx'))) {
            self.tipMsg && self.tipMsg('Import excel File Tips', 'Need excel file!')
            return;
        }
        self.setState({
            fileName,
        });

        if (serverParse) {
            // 服务端解析文件， 上传excel文件
            for (let i = 0; i !== files.length; ++i) {
                formData.append('file', files[i], files[i].name);
            }
            this.handleServerParseFile(formData, serverUrl);
            return;
        }

        if (typeof FileReader === 'undefined') {
            self.tipMsg && self.tipMsg('Import excel File Tips', 'Please update your browser to IE10+ or use the other browsers like Chrome!');
            return;
        }
        for (let i = 0; i !== files.length; ++i) {

            file = files[i];
            reader = new FileReader();
            result = [];
            reader.onload = this.handleLoadData(result, rABS, templateSchema, handleFileSelect);
            reader.readAsBinaryString(file);
        }
    };

    handleLoadData = (result, rABS, templateSchema, handleFileSelect) => {
        const self = this;
        return (e) => {
            const data = e.target.result;
            let workbook;
            return import(/* webpackChumkName: "XLSX" */'xlsx').then(({ default: XLSX }) => {
                if (rABS) {
                    // if binary string, read with type 'binary'
                    workbook = XLSX.read(data, { type: 'binary' });
                } else {
                    // if array buffer, convert to base64
                    const arr = fixdata(data);
                    workbook = XLSX.read(btoa(arr), { type: 'base64' });
                }
                const sheetNames = workbook.SheetNames;
                for (let index = 0; index < sheetNames.length; index++) {
                    const ref = workbook.Sheets[sheetNames[index]]['!ref'];
                    if (!ref) {
                        // empty file
                        self.tipMsg && self.tipMsg('Import excel File Tips', 'This is empty file, please use the specified template!')
                        return;
                    }
                    const startCell = ref.split(':')[0].split('')[0],
                        startRow = ref.split(':')[0].split('')[1],
                        endCell = ref.split(':')[1].split('')[0],
                        endRow = ref.split(':')[1].split('')[1];
                    for (let j = Number(startRow) + 1; j <= Number(endRow); j++) {
                        const tempItem = Object.assign({}, templateSchema);
                        for (let celli = startCell.codePointAt(0); celli <= endCell.codePointAt(0); celli++) {
                            const item = workbook.Sheets[sheetNames[index]][String.fromCodePoint(celli) + j];
                            if (item) {
                                const key = workbook.Sheets[sheetNames[index]][String.fromCodePoint(celli) + 1].w;
                                if (j !== 1) {
                                    tempItem[key] = item.w;
                                }
                            }
                        }
                        result.push(tempItem);
                    }
                }
                // 调用上层组件传递进来的方法接收数据
                handleFileSelect(result);
            });
        };
    }

    stopPropagation = e => {
        e.stopPropagation();
    }

    tipMsg = (title, msg, className) => {
        if (this.props.tipMsg) {
            this.props.tipMsg(title, msg, className);
        } else {
            window.alert(msg);
        }
    }

    render() {
        const { size } = this.props;
        const style = {
            height: '28px',
        };
        const textStyle = {
            height: '28px',
            lineHeight: '28px',
        };
        if (size === 'small') {
            style.height = '22px';
            textStyle.height = '22px';
            textStyle.lineHeight = '22px';
        }
        return (
            <div className="s-excel-import">
                <a style={style} href="" className="s-excel-import__selectFile" onClick={this.stopPropagation}>
                    <Icon type="import" className="s-excel-import__icon" />
                    <div className="s-excel-import__selectFile-text" style={textStyle}>Import</div>
                    <input ref={ref => { this.uploadFile = ref; }} id="uploadFile" type="file" name="file" onChange={this.setFileName} style={style} />
                </a>
                <input style={{ height: style.height, display: 'none' }} placeholder="Select a file by click the Select File button" className="s-excel-import__fileName" type="text" value={this.state.fileName} readOnly="readOnly" />
            </div>
        );
    }
}

export default ImportExcel;