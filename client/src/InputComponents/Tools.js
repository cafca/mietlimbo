import React from 'react';

// Props as supplied to assistant form input components
export type AssistantInputProps = {
	changed: (string, string) => mixed, 
	valid: (string, boolean) => mixed
};

export const ErrorList = (props: {errors: Array<string>}) => {
  const el = props.errors.map(
    (e, i) => <p key={i} className="errorDesc">{e}</p>
  );
  return <span>{el}</span>;
}