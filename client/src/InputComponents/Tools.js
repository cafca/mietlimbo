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
    return "Pre1918";
  } else if (year <= 1949) {
    return "Pre1949";
  } else if (year <= 1964) {
    return "Pre1964";
  } else if (year <= 1972) {
    return "Pre1972";
  } else if (year <= 1990) {
    return "Pre1990";
  } else if (year <= 2002) {
    return "Pre2002";
  } else if (year <= 2013) {
    return "Pre2013";
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
