# mietlimbo

Alle müssen drunter

Die Mietpreisbreme (MPB) soll in Berlin dafür sorgen, dass die Preise für Wohnraum nicht weiterhin mit atemberaubendem Tempo steigen (ca 45% in 10 Jahren!). In der Praxis wird dieses rechtliche Instrument allerdings kaum genutzt, wie auch in den Medien berichtet wird. Obwohl es Informationsangebote der Stadt Berlin gibt, kostet eine Mietminderung den Mieter weiterhin viel Zeit, Wissen und Initiative. Es fehlt eine interaktive Anleitung, die Schritt für Schritt durch den vollständigen Prozess leitet und an entsprechenden Stellen Möglichkeiten zum Austausch mit Gleichgestellten bietet. Die Mietpreisbremse braucht endlich den Eindruck von Machbarkeit.

Momentan versuche ich selbst, meine überhöhte Miete durch Durchsetzung der MPB zu verringern, und habe nun schon viele Stunden damit verbracht, die rechtliche Grundlage zu verstehen. Ich möchte nun mein neues Wissen weitergeben und eine Webapp entwickeln, die es leichter macht, selbst eine Mietminderung durchzusetzen.

Die mietlimbo-app wird Mieter dabei unterstützen, selbst eine Mietminderung auf Basis der MPB durchzusetzen, indem sie an die bestehenden Online-Angebote der Stadt Berlin anknüpft. Diese Unterstützung besteht aus einer Kombination von Informationsangeboten, sowohl im Allgemeinen, als auch zu Details des Prozesses, einem interaktiven Formular zum Erstellen eines Musterbriefs (“Rüge”), durch welchen der Prozess der Mietminderung in Gang gesetzt wird, sowie einer Frage&Antwort-Plattform auf der sich Mieter zu ihren Erfahrungen bei der Mietminderung austauschen können. 

In der Gestaltung des Angebots möchte ich einen Fokus auf Nutzerfreundlichkeit setzen, da rechtliche Angelegenheiten an sich auf viele Menschen abschreckend und einschüchternd wirken. Das Angebot wird Nutzern ein Gefühl von Machbarkeit und Ermächtigung vermitteln, ein Faktor, der einer flächendeckenden Wahrnehmung der Möglichkeiten der Mietpreisbremse bisher im Wege steht.

Gefördert vom Bundesministerium für Bildung und Forschung

## Installation

Mietlimbo ist eine mit dem React-Framework geschriebene Web App mit einem Python Backend. Hier möchte ich beschreiben, wie ihr alle Komponenten installieren und bauen könnt.

1. Falls noch nicht vorhanden, Python3, PIP, Node.js und Virtualenv mit einem Package Manager installieren. Für Homebrew auf Mac zum Beispiel:

	$ brew install python3 pip node
	$ pip install virtualenv

2. Legt ein Virtual Environment für das Backend an. Alle Quelldateien liegen später in dieser Umgebung. 

	$ virtualenv -p python3 mietlimbo-env

3. Jetzt können die Quellen in die Umgebung geklont werden.

	$ cd mietlimbo-env
	$ git clone git@github.com:ciex/mietlimbo.git src

4. Python Requirements installieren

	$ source bin/activate
	$ cd src
	$ pip install -r requirements.txt

5. Das Backend ist jetzt fertig installiert. Um es zu starten muss auch in Zukunft zunächst mit `source bin/activate` die Umgebung aktiviert werden, bevor der Entwicklungs-Server gestartet wird.

	$ cd api
	$ python main.py

Der Entwicklungs-Server ist nun über `http://localhost:8000/` erreichbar und kann im Hintergrund weiterlaufen.

6. Um jetzt auch die Web App nutzen zu können, zunächst ein neues Terminal öffnen und dort in den `client`-Ordner wechseln.

	$ cd ../client
	$ npm install

7. Jetzt kann auch der Entwicklungs-Server für das Frontend gestartet werden.

	$ npm start

Die Entwicklungs-Version von mietlimbo öffnet sich jetzt in eurem Webbrowser.