# Internationalisation

The mietlimbo app supports adapting some formatting and language to different locales.
This directory contains JSON formatted files containing replacements for all text displayed
in mietlimbo. These files are read from `App.js` and replace any string placed through 
`react-intl`'s <FormattedMessage /> functionality.

New languages can be added by importing the respective locale file from react-intl's 
locale data and passing this as well as the JSON file containing the language's content
to the IntlProvider specified in `App.js`.