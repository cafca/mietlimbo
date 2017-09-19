# mietspiegel.json

Diese Datei enthält die Mietspiegel-Tabelle aus dem Berliner Mietspiegel von
2017 als JSON-Datei.

- Schlüssel auf oberster Ebene entsprechen den Bezeichnungen für Baudatum-Bereiche,
wie sie auch im Frontend verwendet werden
- Schlüssel auf zweitoberster Ebene entsrprechen den Grenzen für die Einordnung der Wohnungsgröße (Unter 40 Quadratmeter, unter 60 Quadratmeter, etc.).
- Mietspiegel-Bereiche werden als Liste von 3 Floats angegeben, die dem unteren,
mittleren und oberen Wert des Mietspiegels entsprechen. Als viertes Element 
findet sich optional ein oder mehrere Sternchen-Zeichen. Diese entsprechen den 
Anmerkungen, welche sich im Mietspiegel auf der Seite mit der Mietspiegel-Tabelle
finden.

# strassenverzeichnis.sqlite

Eine SQLITE-Datenbank mit Inhalten der Seite der Berliner Senatsverwaltung.

id: Identifikationsnummer eines Straßenbereichs
name: Name der Straße mit abgekürztem Stadtteil in Klammern
number_range: Hausnummerbereich des Eintrags
area_rating: Gebietseinstufung des Berliner Mietspiegels in drei Kategorien 
	'Einfach', 'Mittel' und 'Gut'
noise_impact: Optionale Einstufung der Geräuschbelastung durch Verkehrslärm am
	Standort
bezirk: Name des Bezirks
stadtgebiet: Eins aus 'Berlin Weest' und 'Berlin Ost'
