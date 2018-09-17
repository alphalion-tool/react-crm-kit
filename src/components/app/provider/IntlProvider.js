
import { connect } from 'react-redux';

import { IntlProvider } from 'react-intl';

export default connect((store) => {
    const { locale, messages, formats } = store.app.locales;
    return {
        locale,
        messages,
        formats
    };
})(IntlProvider);