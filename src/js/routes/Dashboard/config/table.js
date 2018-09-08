
import { formatNumber } from 'jscom/utils/formatter';

export const withdrawColumns = [
    {
        title: 'Currency',
        dataIndex: 'currency',
    }, {
        title: 'Volume',
        dataIndex: 'volumeStr',
        className: 'u-text-right'
    }
];

export function processWithdrawList (list = []) {
    return list.map((item) => ({ ...item, volumeStr: formatNumber(item.volume) }));
}



