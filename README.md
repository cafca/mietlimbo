# mietlimbo

Alle müssen drunter

Die Mietpreisbreme (MPB) soll in Berlin dafür sorgen, dass die Preise für Wohnraum nicht weiterhin mit atemberaubendem Tempo steigen (ca 45% in 10 Jahren!). In der Praxis wird dieses rechtliche Instrument allerdings kaum genutzt, wie auch in den Medien berichtet wird. Obwohl es Informationsangebote der Stadt Berlin gibt, kostet eine Mietminderung den Mieter weiterhin viel Zeit, Wissen und Initiative. Es fehlt eine interaktive Anleitung, die Schritt für Schritt durch den vollständigen Prozess leitet und an entsprechenden Stellen Möglichkeiten zum Austausch mit Gleichgestellten bietet. Die Mietpreisbremse braucht endlich den Eindruck von Machbarkeit.

Momentan versuche ich selbst, meine überhöhte Miete durch Durchsetzung der MPB zu verringern, und habe nun schon viele Stunden damit verbracht, die rechtliche Grundlage zu verstehen. Ich möchte nun mein neues Wissen weitergeben und eine Webapp entwickeln, die es leichter macht, selbst eine Mietminderung durchzusetzen.

Die mietlimbo-app wird Mieter dabei unterstützen, selbst eine Mietminderung auf Basis der MPB durchzusetzen, indem sie an die bestehenden Online-Angebote der Stadt Berlin anknüpft. Diese Unterstützung besteht aus einer Kombination von Informationsangeboten, sowohl im Allgemeinen, als auch zu Details des Prozesses, einem interaktiven Formular zum Erstellen eines Musterbriefs (“Rüge”), durch welchen der Prozess der Mietminderung in Gang gesetzt wird, sowie einer Frage&Antwort-Plattform auf der sich Mieter zu ihren Erfahrungen bei der Mietminderung austauschen können. 

In der Gestaltung des Angebots möchte ich einen Fokus auf Nutzerfreundlichkeit setzen, da rechtliche Angelegenheiten an sich auf viele Menschen abschreckend und einschüchternd wirken. Das Angebot wird Nutzern ein Gefühl von Machbarkeit und Ermächtigung vermitteln, ein Faktor, der einer flächendeckenden Wahrnehmung der Möglichkeiten der Mietpreisbremse bisher im Wege steht.

## Installation

Mietlimbo ist eine mit dem React-Framework geschriebene Web App mit einem Python Backend. Hier möchte ich beschreiben, wie ihr alle Komponenten installieren und bauen könnt.

1. Falls noch nicht vorhanden, Python3, PIP, Node.js und Virtualenv mit einem Package Manager installieren. Für Homebrew auf Mac zum Beispiel:

    `$ brew install python3 pip node`
    
    `$ pip install virtualenv`

2. Legt ein Virtual Environment für das Backend an. Alle Quelldateien liegen später in dieser Umgebung. 

	`$ virtualenv -p python3 mietlimbo-env`

3. Jetzt können die Quellen in die Umgebung geklont werden.

	`$ cd mietlimbo-env`
	
	`$ git clone git@github.com:ciex/mietlimbo.git src`

4. Python Requirements installieren

	`$ source bin/activate`
	
	`$ cd src`
	
	`$ pip install -r requirements.txt`

5. Das Backend ist jetzt fertig installiert. Um es zu starten muss auch in Zukunft zunächst mit `source bin/activate` die Umgebung aktiviert werden, bevor der Entwicklungs-Server gestartet wird.

	`$ cd api`
	
	`$ python main.py`

Der Entwicklungs-Server ist nun über `http://localhost:8000/` erreichbar und kann im Hintergrund weiterlaufen.

6. Um jetzt auch die Web App nutzen zu können, zunächst ein neues Terminal öffnen und dort in den `client`-Ordner wechseln.

	`$ cd ../client`
	
	`$ npm install`

7. Jetzt kann auch der Entwicklungs-Server für das Frontend gestartet werden.

	`$ npm start`

Die Entwicklungs-Version von mietlimbo öffnet sich jetzt in eurem Webbrowser.

### Installation auf einem Server

Es gibt verschiedene Möglichkeiten, mietlimbo über einen Server laufen zu lassen. Je nachdem, was auf eurem Server schon installiert ist werden sich die Schritte zur Einrichtung unterscheiden. Vor allem braucht ihr einen Webserver wie Nginx, der statische Ressourcen zur Verfügung stellt und über WSGI auch den Backend-Server verfügbar macht. Im Weiteren empfehle ich ein SSL-Zertifikat von einem Anbieter wie LetsEncrypt, da über mietlimbo auch persönliche Daten übertragen werden.

Außerdem sollten für den Server-Betrieb zwei Umgebungs-Variablen gesetzt sein:
`MIETSPIEGEL_SECRET` sollte einen zufälligen Wert enhtalten und `MIETSPIEGEL_CONFIG`
den absoluten Pfad der Datei `src/api/production_config.py`.

Für beides kann ich die Anleitungen von DigitalOcean empfehlen:

- [How To Secure Nginx with Let's Encrypt on Ubuntu 16.04](https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-16-04)
- [How To Serve Flask Applications with uWSGI and Nginx on Ubuntu 16.04](https://www.digitalocean.com/community/tutorials/how-to-serve-flask-applications-with-uwsgi-and-nginx-on-ubuntu-16-04)

Mit dem Script `scripts/deploy.sh` lässt sich, falls mietlimbo aus dem Ordner `/var/www/mietlimbo/` vom Webserver geladen wird, die neuste Version installieren und dabei die alte überschreiben.

## Mitmachen

mietlimbo ist offen für Verbesserungen, Vorschläge, Pull Requests. Kontaktiert mich auch gerne unter [hallo@mietlimbo.de](mailto:hallo@mietlimbo.de), wenn ihr Fragen oder Anmerkungen habt.

### Struktur des Projekts

Wie auch in der Installations-Anleitung oben zu sehen ist das Projekt in Client und Server aufgeteilt. 

#### Client

In den Dateien [`src/App.js`](https://github.com/ciex/mietlimbo/blob/master/client/src/App.js) und [`src/index.js`](https://github.com/ciex/mietlimbo/blob/master/client/src/index.js) findet ihr das Setup, mit dem sich der Client später im Browser-DOM installiert. 

Das zentrale Modul für mietlimbo ist [`src/Assistant/Assistant.js`](https://github.com/ciex/mietlimbo/blob/master/client/src/Assistant/Assistant.js). Hierin findet ihr den Wrapper, der den Zustand des Assistent auf höchster Ebene verwaltet:

- Dateninitialisierung und Datenspeicherung in Local Storage
- Aktuelle Stage (Seite des Assistenten-Formulars)
- Übergang zwischen Stages
- Neue Eingaben speichern
- Overflächliche Datenvalidierung (existiert ein benötigter Wert?)
- Update des Endergebnisses

In diesen Wrapper werden je nach aktueller Stage weitere Eingabe- oder Präsentationskomponenten gerendert. Diese finden sich in den drei Unter-Verzeichnissen von `src/Assistant/`.

	├── build					Statische Build-Dateien, die 
	│   └── static 					auf dem Webserver öffentlich gemacht
	│       ├── css 				werden können => `npm run build`
	│       ├── js
	│       └── media
	├── public 					Statische Dateien für Entwicklung
	├── src
	│   ├── Assistant 				Hauptkomponente Online-Assistent
	│   │   ├── ApartmentFeatureInputs 		Zur Abfrage von Wohnungs-Merkmalen
	│   │   ├── GenericInputs 			Zur Abfrage von allgemeinen Fragen
	│   │   └── Presentation 			Zur Ergebnis-Darstellung
	│   ├── Graphics 				Illustrationen, etc.
	│   ├── I18n 					Übersetzungen als JSON-Datei
	│   └── Pages 					Inhalte, die nicht direkt Teil des
	│						Assistenten sind.
	└── translations 				Hilfs-Ordner zur Erstellung der
	    └── messages 				Übersetzungs-Dateien
	        └── src

### API-Backend

Das API-Backend ist als Flask-Server in [`main.py`](https://github.com/ciex/mietlimbo/blob/master/api/main.py) implementiert, der JSON-codierte Daten über HTTP-Endpunkte anbietet. Die Datei [`model.py`](https://github.com/ciex/mietlimbo/blob/master/api/model.py)  lädt entsprechende Daten aus `data/mietspiegel.json` und `data/strassenverzeichnis.sqlite`. Diese wurden mit den Skripten im Verzeichnis `Crawler` erstellt. 

Kann eine Anfrage an den Server nicht mit den genannten Daten aus dem Model beantwortet werden, geht der Server in ein Fallback über und versucht, über den Crawler ein aktuelles Ergebnis von der Seite der Senatsverwaltung einzuholen.

	├── crawler 			Strassenverzeichnis von Senatsverwaltung laden
	│   ├── README.md
	│   ├── crawler.py
	│   └── parser.py
	├── data 							
	│   ├── README.md
	│   ├── mietspiegel.json 	Mietspiegeltabelle, per Hand erstellt
	│   └── strassenverzeichnis.sqlite 	Automatisch erstelltes Strassenverzeichnis
	├── development_config.py
	├── logger.py
	├── main.py 			Backend-Server
	├── model.py 			Datenmodell für Mietspiegel und Strassen
	├── production_config.py
	├── tests
	│   ├── test_flask.py
	│   └── test_parser.py
	├── uwsgi.ini 			Konfiguration für uWSGI-Server. Pfade anpassen!
	└── wsgi.py 			WSGI entry script

# Anmerkungen

Zum Erstellen des Straßenverzeichnis-Datensatzes wurde der Datensatz 
["Straßenverzeichnis"](https://daten.berlin.de/datensaetze/stra%C3%9Fenverzeichnis) 
verwendet, welcher von Berlin Open Data unter Creative Commons-Lizenz mit 
Namensnennung angeboten wird.


Gefördert vom Bundesministerium für Bildung und Forschung

![](https://raw.githubusercontent.com/ciex/mietlimbo/master/client/src/Graphics/logo-bmbf.svg?sanitize=true)
![](https://raw.githubusercontent.com/ciex/mietlimbo/master/client/src/Graphics/logo-okfn.svg?sanitize=true)

