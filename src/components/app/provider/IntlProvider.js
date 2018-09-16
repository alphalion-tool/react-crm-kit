
import { connect } from 'react-redux';

import { IntlProvider } from 'react-intl';

export default connect((store) => {
    const { lang, messages, formats } = store.app.locales;
    return {
        locale: lang,
        messages,
        formats
    };
})(IntlProvider);