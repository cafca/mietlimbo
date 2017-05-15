// @flow

import React from 'react';

// Props as supplied to assistant form input components
export type AssistantInputProps = {
	changed: (string, string) => mixed, 
	valid: (string, boolean) => mixed
};

export const constructionDateRange = (year: number) => {
  console.log("Range for", year);
  if (year <= 1918) {
    return "pre1918";
  } else if (year <= 1949) {
    return "pre1949";
  } else if (year <= 1964) {
    return "pre1964";
  } else if (year <= 1972) {
    return "pre1972";
  } else if (year <= 1990) {
    return "pre1990";
  } else if (year <= 2002) {
    return "pre2002";
  } else if (year <= 2013) {
    return "pre2013";
  } else {
    return "newBuilding";
  }
}

export const ErrorList = (props: {errors: Array<string>}) => {
  const el = props.errors.map(
    (e, i) => <p key={i} className="errorDesc">{e}</p>
  );
  return <span>{el}</span>;
}
