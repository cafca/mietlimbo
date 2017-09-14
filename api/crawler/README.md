# Mietspiegel Crawler

Dieses Modul lädt Daten des Berliner Mietspiegels von der Seite der Berliner 
Senatsverwaltung. Hierzu wird ein Verzeichnis von Straßennamen verwendet, welches
von [Berlin Open Data](1) unter CC-BY-3.0 zum Download angeboten wird.

Dieser lässt sich mithilfe von `crawler.load_street_names` in eine Liste von 
Straßennamen umwandeln. Mit `crawler.crawl_street_names` werden dann alle 
dort einmalig auftretenden Wortanfänge aus 4 Buchstaben als Anfrage an die 
API der Berliner Senatsverwaltung Mietspiegel Straßenverzichnis-Abfrage gesandt
um die jeweilige ID und alle Wohnlagenbereiche pro Straße abzurufen.

Mithilfe von `crawler.crawl_street_data` werden dann als letzter Schritt für 
alle gefundenen Straßen Einstufung in den Mietspiegel und Daten zur Lärmbelästigung
abgerufen.

[1]: https://daten.berlin.de/datensaetze/stra%C3%9Fenverzeichnis