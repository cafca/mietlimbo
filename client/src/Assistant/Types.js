// @flow

import type ReactIntl from 'react-intl'

// Props as supplied to assistant form input components
export type AssistantInputProps = ReactIntl.IntlProvider & {
  changed: (string, string) => mixed, 
  valid: (string, boolean) => mixed,
  value?: any
};