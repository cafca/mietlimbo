// @flow

import React from 'react';

// Props as supplied to assistant form input components
export type AssistantInputProps = {
  changed: (string, string) => mixed, 
  valid: (string, boolean) => mixed,
  value?: any
};