// @flow
// This file contains configuration and constants 

// eslint-disable-next-line no-process-env
export const serverURL = process.env.NODE_ENV === 'production' 
  ? 'https://mietlimbo.de:8000' : 'http://localhost:8000'

export const stageNames = [
  'Einleitung',
  'Ausnahmen',
  'Basisdaten',
  'Mietspiegel',
  'Bad',
  'Küche',
  'Wohnung',
  'Gebäude',
  'Umfeld',
  'Auswertung',
  'Ausdrucken'
]

// Stages with feature groups
export const featureGroupNames = stageNames.slice(4, 9)

// These fields are required in order to advance to the next assistant stage
// (all previous conditions are also required, of course)
export const stageConditions = [
  ['autoSave'],
  ['leaseCreated', 'newBuilding', 'renovation', 'previousRent'],
  ['address', 'squareMeters', 'rent', 'constructionDate'],
  ['mietspiegel'],
  [],
  [],
  [],
  [],
  []
]

const testData = {
  'Bad':{'positive':[],'negative':[]},
  'Küche':{'positive':[],'negative':[]},
  'Wohnung':{'positive':[],'negative':[]},
  'Gebäude':{'positive':[],'negative':[]},
  'Umfeld':{'positive':[],'negative':[]},
  'leaseCreated':'2015-07-31T22:00:00.000Z',
  'rent':1200,
  'address':{
    'id':16086,
    'streetname':'Hochkalterweg (Tempelhof-Schöneberg)',
    'range':'alle Hausnummern'
  },
  baseFeatures: 'default',
  constructionDate: 'Pre2002',
  newBuilding: false,
  squareMeters: 90,
  renovation: 'simple',
  previousRent: -1,
  autoSave: true,
  'result': {
    'max': 9.27,
    'mid': 8,
    'min': 6.3,
    'localRentLevel': 8,
    'mietlimboLevel': 8.8,
    'mietlimbo': 792.0000000000001,
    'featureGroupBalance': 0
  }
}

// eslint-disable-next-line no-process-env
export const initialData = process.env.NODE_ENV === 'production' 
  ? {} : testData