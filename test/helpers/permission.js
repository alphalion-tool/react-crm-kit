
import { checkPermissionWrapper, permissionContextTypes } from 'jscom/utils/decorators/connectPermission';

export const contextTypes = permissionContextTypes;

/* mock permission的数据，可用于context, props */

export function mockPermission (permission = window.__DATA__.PERMISSION) {
    return {
        permission,
        checkPermission: checkPermissionWrapper(permission)
    }
}

export default mockPermission;