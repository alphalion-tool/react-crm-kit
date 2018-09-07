### 数据格式定义

    [
        {
            label: 'xx', 展示的内容,
            isGroup: true/false,   // 是否是group，如果是group，则展示为分组，其他字段无意义。
            required: true/false,   是否是必须填写
            dataType: 'string/int/date',   字段类型
            defaultValue: '',  默认值
            tag: 'input/radio/checkbox/textarea',   // 标签
            dataSource: '',   // 数据源
            key: 'account_id',   // 对应的数据库/对象的获取key
            tip: 'xxx',   // 提醒
            notShowWhenNew: true/false,   // 新建时是否需要隐藏 
            notShowWhenEdit: true/false,  // 编辑时是否需要隐藏
            catalog: 'xxx',      // 目录，表示需要归为某一类
            minLen: 1,     // 字符串的最小长度
            maxLen: 2,     // 字符串的最大长度
            placeholder: 'xxx', // 输入框中默认提醒
            funcs: {  // 自定义的函数
                valid: (value) => {return true/false},  // 验证函数
                render: (props) => {return x;}, // 渲染函数，props跟InputBox的props相同
            }
        },
        ...
    ]
