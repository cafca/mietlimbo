// @flow
// 
// This module exports translations that are used in different
// places throughout the app.

import { defineMessages } from "react-intl";

export const stageNameTranslations = defineMessages({
  "Einleitung": {
    id: "StageNames.Einleitung",
    defaultMessage: "Einleitung"
  },
  "Ausnahmen": {
    id: "StageNames.Ausnahmen",
    defaultMessage: "Ausnahmen"
  },
  "Basisdaten": {
    id: "StageNames.Basisdaten",
    defaultMessage: "Basisdaten"
  },
  "Mietspiegel": {
    id: "StageNames.Mietspiegel",
    defaultMessage: "Mietspiegel"
  },
  "Bad": {
    id: "StageNames.Bad",
    defaultMessage: "Bad"
  },
  "Küche": {
    id: "StageNames.Küche",
    defaultMessage: "Küche"
  },
  "Wohnung": {
    id: "StageNames.Wohnung",
    defaultMessage: "Wohnung"
  },
  "Gebäude": {
    id: "StageNames.Gebäude",
    defaultMessage: "Gebäude"
  },
  "Umfeld": {
    id: "StageNames.Umfeld",
    defaultMessage: "Umfeld"
  },
  "Auswertung": {
    id: "StageNames.Auswertung",
    defaultMessage: "Auswertung"
  },
  "Ausdrucken": {
    id: "StageNames.Ausdrucken",
    defaultMessage: "Ausdrucken"
  }
});

// Long names for the stages, which are used for each
// stage's page header
export const featureGroupLongTranslations = defineMessages({
  "Bad": {
    id: "StageHeaders.Bad",
    defaultMessage: "Badezimmer und WC"
  },
  "Küche": {
    id: "StageHeaders.Küche",
    defaultMessage: "Küche"
  },
  "Wohnung": {
    id: "StageHeaders.Wohnung",
    defaultMessage: "Wohnung"
  },
  "Gebäude": {
    id: "StageHeaders.Gebäude",
    defaultMessage: "Gebäude"
  },
  "Umfeld": {
    id: "StageHeaders.Umfeld",
    defaultMessage: "Wohnumfeld"
  },
});

// Names of input fields that are not part of 
// a feature group
export const genericInputTranslations = defineMessages({
  "autoSave": {
    id: "GenericInputName.autoSave",
    defaultMessage: "automatisches Speichern"
  },
  "leaseCreated": {
    id: "GenericInputName.leaseCreated",
    defaultMessage: "Vertragsdatum"
  },
  "newBuilding" : {
    id: "GenericInputName.newBuilding",
    defaultMessage: "Neubau"
  },
  "renovation" : {
    id: "GenericInputName.renovation",
    defaultMessage: "Renovierung"
  },
  "previousRent": {
    id: "GenericInputName.previousRent",
    defaultMessage: "Vormiete"
  },
  "address" : {
    id: "GenericInputName.address",
    defaultMessage: "Adresse"
  },
  "rent" : {
    id: "GenericInputName.rent",
    defaultMessage: "Nettokaltmiete"
  },
  "squareMeters" : {
    id: "GenericInputName.squareMeters",
    defaultMessage: "Größe der Wohnung"
  },
  "constructionDate": {
    id: "GenericInputName.constructionDate",
    defaultMessage: "Datum der Bezugsfertigkeit"
  },
  "mietspiegel": {
    id: "GenericInputName.mietspiegel",
    defaultMessage: "Mietspiegelabfrage"
  },
  baseFeatures: {
    id: "GenericInputName.baseFeatures",
    defaultMessage: "besondere Ausstattung"
  }
});

export const constructionDateOptionsTranslations = defineMessages({
  Pre1918: {
    id: "Spanneneinordnung.constructionDateGuessedPre1918",
    defaultMessage: "bezugsfertig bis 1918 (Altbau)"
  },
  Pre1949: {
    id: "Spanneneinordnung.constructionDateGuessedPre1949",
    defaultMessage: "1919 - 1949 (Altbau)"
  }, 
  Pre1964: {
    id: "Spanneneinordnung.constructionDateGuessedPre1964",
    defaultMessage: "1950 - 1964"
  }, 
  Pre1972: {
    id: "Spanneneinordnung.constructionDateGuessedPre1972",
    defaultMessage: "1965 - 1972"
  }, 
  Pre1990: {
    id: "Spanneneinordnung.constructionDateGuessedPre1990",
    defaultMessage: "1973 - 1990"
  }, 
  Pre2002: {
    id: "Spanneneinordnung.constructionDateGuessedPre2002",
    defaultMessage: "1991 - 2002"
  }, 
  Pre2015: {
    id: "Spanneneinordnung.constructionDateGuessedPre2015",
    defaultMessage: "2003 - 31.12.2015"
  } 
});