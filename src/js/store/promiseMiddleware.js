
import timeoutPromise, { defaultTime } from 'jscom/utils/timeoutPromise';
import { message } from 'antd';

export default ({ dispatch, getState }) => (next) => (action) => {
    const { payload, type } = action;
    if (!payload.promise) {
        return next(action);
    }
    const { promise, SHOW_ERR_TIP = true, ...rest } = payload;
    next({ payload: { ...rest }, type });
    return promise.then(
        (response) => {
            // BLog.log(result);
            if (response) {
                // 针对有真实response的
                const newPayload = { ...rest };
                if (response.data) {
                    newPayload.body = response.data;
                } else {
                    newPayload.response = response;
                }
                next({ type: `${type}-success`, payload: newPayload });
            } else {
                // 自己构造的promise
                next({ type: `${type}-success`, payload: { ...rest } });
            }
        },
        (error) => {
            // BLog.log(error);
            next({ type: `${type}-failure`, payload: { ...rest, error, response: error.response } });
            // 如果关闭了SHOW_ERR_TIP则不提示
            if (SHOW_ERR_TIP === false) return;
            if (error.response && error.response.data && error.response.data.code === 1) return;
            if (error && error.message) message.error(error.message);
        }
    );
};
