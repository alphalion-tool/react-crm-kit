/* eslint-disable import/prefer-default-export, prefer-template */


// 通用的suggest focus
export function inputSuggestTestFocus(wrapper, input) {
    wrapper.simulate('click');
}

// 通用的suggest输入
export function inputSuggestTestInput(wrapper, input) {
    expect(wrapper.find('.c-select-dropdown-menu-item').length).toEqual(1);
    // expect(wrapper.find('.c-select-dropdown-menu-item').first().text()).toEqual('Please Input');
    wrapper.find('input').simulate('change', { target: { value: input || '1' } });
}

// 通用的suggest click
export function inputSuggestTestChose(wrapper, index) {
    // expect(wrapper.find('.c-select-dropdown-menu-item').length).toEqual(getAccountSuggest().length);
    wrapper.find('.c-select-dropdown-menu-item').at(index).simulate('click');
}


// symbolsuggest focus
export function productSuggestTestFocus(wrapper, input) {
    wrapper.simulate('click');
}

// query block collapse
export function queryBlockTestCollapseClick(wrapper) {
    wrapper.find('QueryBlockCollapseBtn').simulate('click');
}

// datepicker focus
export function datePickerFocus(wrapper) {
    wrapper.find('input').simulate('focus');
}

// datepicker select day
export function datePickerChose(wrapper, dayIndex, root) {
    if (root) root.update();
    wrapper.find('Day').at(dayIndex).find('div').simulate('click');
}


// table 处理

/**
 * 获取table中所有的行.
 * @param  {Object} table  table节点，可通过find('BlueaseTable')获取
 * @return {Array}         table所有的行，注意此结果会包括表头的行
 */
export function tableRows(table) {
    return table.find('FixedDataTableRow');
}

/**
 * 获取table中的单元格
 * @param  {Object} table table节点，可通过find('BlueaseTable')获取
 * @return {Array}       table中所有的单元格，不包括表头的列
 */
export function tableCells(table) {
    return table.find('CellHelper');
}

/**
 * 获取某一行
 * @param  {Object} table table节点
 * @param  {Number} index 第几行，该计数不包括表头，如果需要获取表头，则该参数为-1
 * @return {Object}       当前需要的行
 */
export function tableRowWithIndex(table, index) {
    return tableRows(table).at(index + 1);
}

/**
 * 获取某一行中的某一列
 * @param  {Object} row   row节点
 * @param  {Number} index 列的index，即需要获取的列的index
 * @return {Object}       获取的列节点
 */
export function tableRowCellWithIndex(row, index) {
    return row.find('CellHelper').at(index);
}

//
/**
 * 直接获取table的某一个cell元素
 * @param  {Object} table table节点
 * @param  {Number} row   行号index
 * @param  {Number} col   列号index
 * @return {Object}       cell节点
 */
export function tableCellWithRowCol(table, row, col) {
    return tableRowCellWithIndex(tableRowWithIndex(table, row), col);
}

// 获取表头
/**
 * 获取所有的表头
 * @param  {Object} table table节点
 * @return {Object}       所有的表头节点
 */
export function tableColumnsHeader(table) {
    return table.find('ColumnHeader');
}

/**
 *
 */
export function paginationPreBtn(wrapper, notDisabled) {
    const btn = wrapper.find('Pagination').find('.c-pagination__prev');
    if (notDisabled !== undefined) {
        expect(btn.hasClass('c-pagination--disabled')).toEqual(!notDisabled);
    }
    return btn;
}

export function paginationJumpPreBtn(wrapper, notDisabled) {
    const btn = wrapper.find('Pagination').find('.c-pagination__jump-prev');
    if (notDisabled !== undefined) {
        expect(btn.hasClass('c-pagination--disabled')).toEqual(!notDisabled);
    }
    return btn;
}

export function paginationNextBtn(wrapper, notDisabled) {
    const btn = wrapper.find('Pagination').find('.c-pagination__next');
    if (notDisabled !== undefined) {
        expect(btn.hasClass('c-pagination--disabled')).toEqual(!notDisabled);
    }
    return btn;
}

export function paginationJumpNextBtn(wrapper, notDisabled) {
    const btn = wrapper.find('Pagination').find('.c-pagination__jump-next');
    if (notDisabled !== undefined) {
        expect(btn.hasClass('c-pagination--disabled')).toEqual(!notDisabled);
    }
    return btn;
}

export function testInputComponent(wrapper, input) {
    wrapper.find('input').simulate('change', { target: { value: input } });
}

export function testTextareaComponent (wrapper, input) {
    wrapper.find('textarea').simulate('change', { target: { value: input } });
}

/**
 * 重置组件的大小
 * @param  {Object} wrapper 需要操作的实例
 * @param  {Number} width   重置的宽度
 * @param  {Number} height  重置的高度
 */
export function resetCompSize(wrapper, width, height) {
    const node = wrapper.getDOMNode();
    node.style.width = width + 'px';
    node.style.height = height + 'px';
}

/**
 * 获取组件的size
 * @param  {Object} wrapper 需要操作的实例
 * @return {Object}         { width: xxx, height: xxx }
 */
export function getCompSize(wrapper) {
    const node = wrapper.getDOMNode();
    return {
        width: node.offsetWidth,
        height: node.offsetHeight,
    }
}

/**
 * 获取TimePicker 的小时，分钟，秒 的li 。 可以触发点击。
 * @param {*} wrapper     root 实例
 * @param {*} hourIndex   需要模拟的小时索引。传1就表示01  01:00:00
 * @param {*} minuteIndex 需要模拟的分钟索引。传1就表示01  00:01:00
 * @param {*} secIndex    需要模拟的秒小时索引。传1就表示01 00:00:01
 */
export function getTimePickerTime(wrapper, hourIndex, minuteIndex, secIndex) {
    const pickerCombobox = wrapper.find('.c-time-picker-panel-combobox');
    const hour = pickerCombobox.find('Select[type="hour"]').find('ul').find('li').at(hourIndex);
    const minute = pickerCombobox.find('Select[type="minute"]').find('ul').find('li').at(minuteIndex);
    const sec = pickerCombobox.find('Select[type="second"]').find('ul').find('li').at(secIndex);
    return {
        hour,
        minute,
        sec
    };
}

export function dateRangeFocus(dateRange, index) {
    dateRange.find('Input').at(index).find('input').simulate('focus');
}

export function dateRangeValue(dateRange, index) {
    return dateRange.find('Input').at(index).find('input').render();
}

export function getDateStrFromDatePicker(datePicker, index) {
    const day = datePicker.find('Day').at(index);
    const dayLabel = day.render().attr('aria-label');
    let dayValue = dayLabel.substr(dayLabel.length - 2, dayLabel.length);
    const year = datePicker.find('YearDropdown').prop('year');
    let month = day.prop('month');
    month = `${month}`.length === 1 ? `0${month}` : month;
    dayValue = `${dayValue}`.length === 1 ? `0${dayValue}` : dayValue;
    const dayStr = `${month}/${dayValue}/${year}`;
    return {
        day,
        dayStr,
    };
}
