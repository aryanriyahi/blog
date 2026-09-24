---
title: 'Was ist das Serverless-Konzept?'
description: 'Ein Überblick über das Serverless-Konzept, der Vergleich mit VPS, PaaS und Dedicated Server, seine Einsatzgebiete und kostenlose Dienste für den Einstieg.'
pubDate: '2026-08-05'
tags: ['serverless', 'cloud']
series: 'Serverless'
episodeNumber: 1
translationKey: 'serverless-1'
---

## Was ist das Serverless-Konzept?
Als ich zum ersten Mal das Wort *serverless* hörte, dachte ich, damit seien Projekte gemeint, die keinen Server brauchen und bei denen ein Client ausreicht XD aber diese Interpretation von mir war falsch.
Bei Serverless haben wir tatsächlich Server, und zwar gute, aber wir müssen uns nicht mehr um die ganze Wartung kümmern.
Diese Wartung bedeutet:
- Betriebssystem installieren
- Hardware-Skalierung
- Server-Konfiguration
- Sicherheitsupdates
- Installation und Konfiguration eines Webservers (z. B. NGINX, Apache)
- Load Balancer

Das heißt, du konzentrierst dich nur und ausschließlich auf das Schreiben deines Codes und schiebst die ernsten und schwierigen Verantwortlichkeiten jemand anderem zu XD

Ziemlich angenehm, oder?
Im Grunde ist es also nicht so, dass es keinen Server gibt – es gibt einen, aber du musst dir keine Sorgen mehr machen. Man könnte sagen, der Name dieser Architektur ist *Server's Concernless*.


## Ein Blick auf andere Server-Typen, die man mit Serverless verwechseln könnte

Da die Server-Typen immer zahlreicher werden, halte ich es für besser, statt viel zusätzlichen Text einfach mit einigen Beispielen zu vergleichen, die teilweise ähnliche Eigenschaften wie Serverless haben, um zu sehen, was Sache ist:

| Vergleichskriterium | Shared Server | Dedicated Server | VPS | PaaS | Serverless |
| --- | --- | --- | --- | --- | --- |
| **Grundlegende Definition** | Ein physischer Server und seine Ressourcen werden unter hunderten Websites geteilt | Ein vollständig dedizierter physischer Server im Rechenzentrum | Eine virtualisierte Schicht (VM) mit dedizierten Ressourcen auf einem Host-Server | Eine verwaltete Plattform zum direkten Ausführen und dem Deployment von Code | Eine ereignisgesteuerte Architektur mit sofortiger Codeausführung und automatischer Skalierung |
| **Zugriffs- und Kontrollebene** | **Null,** nur Zugriff auf das Control Panel | **100 %,** vollständiger Root/SSH- und BIOS-/Hardware-Zugriff | **Hoch,** vollständiger Root/SSH-Zugriff auf das virtuelle OS | **Begrenzt,** Zugriff nur auf Anwendungseinstellungen und Environment Variables | **Null,** kein Zugriff auf OS oder Infrastruktur |
| **Infrastruktur- und OS-Verwaltung** | Vom Anbieter übernommen | Vollständig deine Verantwortung | Vollständig deine Verantwortung | Vom Anbieter übernommen | Vom Anbieter übernommen |
| **Preismodell** | Feste monatliche/jährliche Miete (sehr günstig) | Feste monatliche/jährliche Miete (sehr teuer) | Feste monatliche/stündliche Miete basierend auf reservierten Ressourcen | Basierend auf der Anzahl der Instanzen und reserviertem RAM/CPU | **Genau basierend auf der tatsächlichen Nutzung** (Anzahl der Requests + Ausführungszeit in Millisekunden) |
| **Kosten bei null Traffic (Idle)** | Volle Kosten zahlen | Volle Kosten zahlen | Volle Kosten zahlen | Volle Kosten zahlen | **0 $ (Scale to Zero)** |
| **Skalierbarkeit (Scaling)** | **Nahezu null,** erfordert ein Upgrade auf einen höheren Hosting-Plan | **Manuell und schwierig,** erfordert die Bestellung und den Einbau physischer Hardware | **Einfach vertikal,** RAM und CPU per Reboot aufrüsten | **Automatisch horizontal,** schnell einen neuen Container hinzufügen | **Auto-scaling** von 1 auf 10.000 gleichzeitige Ausführungen in wenigen Millisekunden |
| **Cold-Start-Problem** | Keines | Keines | Keines | Keines | **Ja,** eine kurze Verzögerung beim ersten Request nach einer gewissen Leerlaufzeit |
| **Begrenzung des Execution Timeout** | Abhängig von den Web-Server-Einstellungen | **Keine Begrenzung** | **Keine Begrenzung** | **Keine Begrenzung** | **Ja,** begrenzt auf wenige Sekunden bis wenige Minuten (z. B. 15 Minuten bei AWS Lambda) |
| **Unterstützung von WebSocket und Long-running** | Sehr eingeschränkt oder deaktiviert | **Ausgezeichnet und vollständig** | **Ausgezeichnet und vollständig** | **Ausgezeichnet und vollständig** | **Schwach/komplex** |
| **Isolierung und Sicherheit** | **Niedrig,** eine Schwachstelle auf einer Website kann die anderen gefährden | **Maximal,** die Hardware ist vollständig isoliert | **Gut,** Isolierung auf Hypervisor-/VM-Ebene | **Hoch,** Isolierung auf Container-Ebene | **Sehr hoch,** jeder Request läuft in einer isolierten Micro-VM/Sandbox |
| **DevOps-Komplexität und Wartung** | **Null** | **Sehr hoch** | **Mittel bis hoch** | **Niedrig** | **Sehr niedrig** |
| **Beispiele bekannter Anbieter** | Bluehost | Hetzner | Hetzner Cloud, DigitalOcean | AWS Elastic Beanstalk, Google App Engine | AWS Lambda, Cloudflare Workers, Google Cloud Run, Vercel |
| **Welche Art von Projekt braucht das?** | Kleine Unternehmensseiten, einfache WordPress-Blogs | Bankensysteme, sehr große Datenbanken, schwere Verarbeitung | Mittelgroße Projekte, Standard-APIs, containerisierte Apps | Startups, MVPs, Projekte bei denen Entwicklungsgeschwindigkeit zählt | Ereignisgesteuerte APIs, Systeme mit plötzlichem und sinusförmigem Traffic |

Wie wir in der Tabelle gesehen haben: Wenn wir unseren Server mit einem Haus vergleichen, sähe jedes so aus:

- **Shared Server**: Studentenwohnheim
- **Dedicated Server**: Leeres privates Haus
- **VPS**: Private Mietwohnung
- **PaaS**: Hotel
- **Serverless**: Hotel mit stundenweiser Abrechnung

Ich versuche später auch über diese **as a Service**-Sachen zu schreiben (z. B.: IaaS, PaaS ...)

## Wann sollten wir Serverless nutzen?

Es gibt gute Gründe für Serverless, und ich schreibe ein paar der wichtigsten auf.
Für den ersten und zweiten Grund nehme ich ein ähnliches Beispiel wie einen Online-Shop

### Event-Driven-Architekturen

Stell dir in einem Online-Shop vor, dass du nach jeder erfolgreichen Bestellung die folgenden 4 Dinge tun musst:


1.  Eine PDF-Rechnung erzeugen und in S3/Cloud Storage speichern

2.  Den Lagerbestand in der Datenbank verringern

3. Dem Nutzer eine Bestätigungs-SMS/E-Mail senden

4.  Eine Nachricht an das Postsystem senden, um das Paket vorzubereiten

Findest du es sinnvoll, dass der Nutzer nach seinem Kauf darauf warten muss, dass wir all das auch erledigen?
Absolut nicht – für so ein Szenario lösen wir ein Event aus, das diese Dinge im Hintergrund von selbst erledigt.
Vielleicht sagst du jetzt: Was hat das überhaupt mit Serverless zu tun? Wir können RabbitMQ oder Kafka nutzen, um diese Events zu verarbeiten, und fertig! Ja, das stimmt, aber bei diesem Ansatz gibt es diese Probleme:

- Dein Server braucht genug Hardware, um den Message Broker auszuführen, und wenn nicht, musst du aufrüsten
- Du musst dich mit der Installation und Konfiguration dieses Message Brokers herumschlagen
- Er läuft 24 Stunden am Tag und du musst den Server bezahlen, auch wenn du im ganzen Monat keine einzige Bestellung hast

Der einfachere Weg ist Serverless: Du weckst es nur, wenn du es brauchst, lässt es seine Arbeit machen und es schläft wieder.


### Systeme mit sinusförmigem Traffic

Angenommen, es ist Black Friday und plötzlich steigt der Traffic der Website und du bekommst jede Menge Bestellungen
Der Server skaliert ohne jede Mühe und bricht unter der Last nicht zusammen. Wäre es ein normaler Server, würde er unter dem Druck auseinanderfallen.
In Szenarien, in denen absolut kein Traffic herrscht, wie oben gesagt: Er schläft ein und deine Kosten werden 0.

### Persönliche Projekte und MVPs

Dieser Teil ist nicht sehr technisch, sondern eher finanziell.
Viele Cloud-Giganten haben kostenlose Pläne für Serverless, was es für persönliche Projekte, Portfolios und MVPs attraktiv macht.
Weil du nichts bezahlen musst und dich nicht mit Infrastruktur herumschlagen musst, kommst du viel weiter

## Wo bekomme ich kostenloses Serverless und wie fange ich an?

Zu dem Zeitpunkt, an dem ich diesen Artikel schreibe, sehen die kostenlosen Pläne der bekanntesten so aus:

- Cloudflare:

   -  Kostenloses Limit: 100.000 Requests pro Tag (etwa 3 Millionen pro Monat).

   -  Merkmal: Sehr hohe Geschwindigkeit durch die Ausführung im Edge-Netzwerk, kürzere Ausführungszeit und kein spürbarer Cold Start.

- AWS Lambda:

   -  Kostenloses Limit: 1 Million Requests pro Monat + 400.000 GB-Sekunden Rechenzeit pro Monat.

   -  Merkmal: Der standardmäßigste und funktionsreichste Dienst der Welt.

- Google Cloud:

   -  Kostenloses Limit für Cloud Run, das eher für Dockerisierte Projekte gedacht ist: 2 Millionen Requests pro Monat + 360.000 GB-Sekunden Speicher und 180.000 vCPU-Sekunden.

   -  Kostenloses Limit für Cloud Functions, das wie Cloudflare Workers eine Art FaaS ist: 2 Millionen Aufrufe pro Monat.

   -  Merkmal: Cloud Run ist die beste Option, um Docker-Container auf Serverless-Art auszuführen.

- Vercel:

   -  Kostenloses Limit: 100 GB Bandbreite + 100.000 Ausführungen von Serverless Functions pro Monat.

   -  Merkmal: Die beliebteste Option für Front-End-Projekte und Frameworks wie Next.js.

- Netlify:

   -  Kostenloses Limit: 100 GB Bandbreite + 125.000 Funktionsausführungen pro Monat.

   -  Merkmal: Hervorragend für das Deployment statischer Projekte zusammen mit Functions.

Dieser Blog selbst läuft auf Cloudflare und ich bin sehr zufrieden damit, sowohl was die Performance angeht als auch wie einfach die Arbeit mit Cloudflare selbst ist.
Ich empfehle dir auch, mit Cloudflare anzufangen, falls dich die Liste oben verwirrt hat

## Schlussbemerkung
Dieser Teil war nur eine erste Einführung. In den nächsten Teilen gehe ich auf die verschiedenen Arten von Serverless ein und wir lernen gemeinsam mehr Details.
Bleib dran <3

