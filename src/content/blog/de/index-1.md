---
title: 'Datenbankindizes verstehen'
description: 'Ein genauer Blick auf Datenbankindizes, ihre Funktionsweise und wie wir sie optimal für maximale Performance einsetzen.'
pubDate: '2026-09-24'
tags: ['index', 'sql', 'database']
series: 'Index'
episodeNumber: 1
translationKey: 'index-1'
image: '/og/index-1-og-de.png'
---

## Worüber sprechen wir heute?

Wir alle wissen im Grunde, was Indizes sind und wofür wir sie einsetzen. Ich möchte hier keine trockenen Grundlagen wiederholen.
Stattdessen teile ich meine wichtigsten Erkenntnisse nach der Lektüre des Buchs *SQL Performance Explained: Everything Developers Need to Know about SQL Performance*. Wir schauen uns an, welche typischen Fehler dazu führen, dass Indizes nicht wie erwartet greifen, wie wir das Maximum an Performance herausholen und wie die zugrunde liegenden Datenstrukturen im Detail arbeiten.

## Inspiration: SQL Performance Explained

![SQL Performance Explained Book Image](/images/index-1.jpg)

Ein kompaktes und hervorragendes Buch, das die Funktionsweise von Indizes präzise auf den Punkt bringt – eine klare Leseempfehlung!

## Die Anatomie eines Index

Ein Index ist im Wesentlichen eine sortierte Kopie der von uns ausgewählten Spalten. Er belegt eigenständigen Speicherplatz auf dem Datenträger und berührt in den meisten Szenarien (insbesondere bei sekundären Indizes bzw. Secondary Indexes) nicht die restlichen Tabellendaten, sondern speichert lediglich einen Zeiger auf die physische Zeilenadresse in der Haupttabelle.

Um das Verhalten zu verstehen, müssen wir zwei zentrale Datenstrukturen betrachten:

1. Doppelt verkettete Liste (*Doubly Linked List*)
2. Suchbaum (*Search Tree*)

---

### 1. Die doppelt verkettete Liste

Da sich unsere Daten durch Schreiboperationen (`WRITE`) ständig verändern, wäre ein permanentes physisches Verschieben der Datenblöcke auf dem Datenträger extrem ineffizient. Datenbanksysteme setzen daher auf eine doppelt verkettete Liste: Jeder Knoten besitzt genau zwei Verweise – einen zum vorherigen und einen zum nächsten Element. Die exakte physische Speicherposition der Knoten spielt somit keine Rolle; bei Schreibzugriffen müssen lediglich die Zeiger aktualisiert werden.

Die Datenbank nutzt die doppelt verkettete Liste primär dazu, die Blattknoten (*Leaf Nodes*) horizontal miteinander zu verbinden – nicht für den initialen Zugriff von der Wurzel aus. Die vertikale Navigation nach unten übernimmt der Baum (B-Baum). Sobald wir jedoch den ersten passenden Blattknoten erreicht haben, müssen wir für nachfolgende Datensätze (wie bei `ORDER BY` oder Bereichsabfragen bzw. Range Queries) nicht erneut den gesamten Baum von oben durchlaufen. Wir navigieren stattdessen direkt und effizient horizontal über die Verkettung. Jeder Blattknoten liegt dabei in einem Datenbank-Block bzw. einer Datenbankseite (*Database Page*).

Die Sortierung erfolgt auf zwei Ebenen:

1. **Innerhalb eines Knotens:** Beispielsweise enthält die Spalte `age` im ersten Block 3 Datensätze, die sortiert als `[25, 26, 27]` gespeichert sind.
2. **Zwischen den Knoten:** Sobald ein Block voll ist, allokiert die Datenbank einen neuen Block und schreibt dort weiter.

Da diese Blöcke auf dem Datenträger nicht zwingend zusammenhängend liegen, verbindet die Datenbank die Blöcke über die doppelt verkettete Struktur:

`Page A: [10, 12, 15]` <---> `Page B: [22, 32, 35]` <---> `Page C: [40, 46, 50]`

![Doppelt verkettete Liste in Knoten und Blöcken](/images/index-2.png)

### 2. Der B-Baum (B-Tree)

Bei dieser Datenstruktur handelt es sich um einen selbst-balancierenden Mehrwegebaum (Balanced Tree – nicht zu verwechseln mit einem simplen Binärbaum / Binary Tree). Der Abstand von der Baumwurzel (*Root Node*) zu allen Blattknoten ist stets identisch, wodurch der Baum immer im Gleichgewicht bleibt.

Moderne relationale Datenbanken setzen in der Praxis auf die optimierte Variante: den **B+-Baum** (*B+Tree*). Der entscheidende Unterschied liegt darin, dass alle tatsächlichen Nutzdaten bzw. Zeiger ausschließlich in der untersten Schicht (den Blattknoten) liegen, während die inneren Knoten lediglich als Wegweiser bzw. Router dienen. Und genau diese Blattknoten sind über die zuvor beschriebene doppelt verkettete Liste miteinander verknüpft.

Bei jeder Schreiboperation hält die Datenbank diesen Baum automatisch balanciert, was einen gewissen Overhead erzeugt (darauf gehen wir in künftigen Artikeln genauer ein). Die Anordnung der Elemente erfolgt dabei intervallbasiert.

![B-Baum Beispiel](/images/index-3.png)

Wie in der Abbildung zu sehen ist, ermöglicht der Baum ein extrem schnelles Durchsuchen (*Traversing*), indem er für jedes Intervall den jeweils höchsten Schlüsselwert referenziert.

### Das Zusammenspiel beider Strukturen in einer Abfrage

Um zu sehen, wie sich beide Datenstrukturen in der Praxis ergänzen, betrachten wir folgende Beispiel-Query:

```sql
SELECT * FROM Users WHERE id BETWEEN 20 AND 29;
```

Die Datenbank führt diese Abfrage in zwei klar getrennten Phasen aus:

#### Phase 1: Vertikaler Durchlauf im Baum (Index Seek)

Die Datenbank muss zunächst den Startpunkt finden – den Wert `20`:

1. Sie startet am Wurzelknoten mit den Intervallen `[18, 27]`. Da 20 zwischen 18 und 27 liegt, folgt sie dem mittleren Zeiger zum Knoten `[21, 24]`.

2. Da 20 kleiner als 21 ist, wählt sie den linken Zeiger und landet unmittelbar auf dem Blattknoten mit `[19, 20]`.

3. Der Datensatz `20` ist gefunden. Diesen schnellen Durchlauf von oben nach unten nennen wir **Index Seek**.

#### Phase 2: Horizontaler Durchlauf auf der verketteten Liste (Range Scan)

Nun müssen die restlichen Datensätze bis zur Obergrenze `29` gelesen werden. Der entscheidende Vorteil: Die Datenbank verlässt den Baum nun vollständig.
Es ist nicht nötig, für jeden einzelnen Wert erneut zur Wurzel aufzusteigen und den Baum hinabzusteigen. Stattdessen folgt sie einfach der doppelt verketteten Liste, welche die Blätter verbindet, und liest horizontal weiter:

- Vom Block `[19, 20]` springt sie zum nächsten Block: `[22, 23]`
- Nächster Sprung: `[25, 26]`
- Und schließlich in den Block: `[28, 29]`

Bemerkenswert ist hierbei: Der Blattknoten `[28, 29]` gehört strukturell zu einem völlig anderen Teilbaum (unterhalb von `[30, 33]`). Ohne die doppelt verkettete Liste müsste die Datenbank den gesamten Weg über die Wurzel zurücklegen. Dank der horizontalen Kette greift sie mit minimalem I/O-Aufwand direkt auf die Daten zu. Diese Phase bezeichnen wir als **Range Scan**.

## Fazit

In diesem ersten Teil haben wir gesehen, dass die Anatomie eines Index auf dem durchdachten Zusammenspiel zweier elementarer Datenstrukturen basiert: dem **B-Baum** (für den vertikalen Einstieg via *Index Seek*) und der **doppelt verketteten Liste** (für den horizontalen Durchlauf via *Range Scan*). Wenn wir verstehen, wie die Datenbank Daten in Seiten/Blöcken strukturiert und Blattknoten miteinander verknüpft, wird das Ausführungsverhalten von Abfragen transparent und nachvollziehbar.

Man könnte noch etliche Seiten über diese Datenstrukturen schreiben, aber mein Rat lautet: Nutzt visuelle Werkzeuge für ein intuitives Verständnis. Eine interaktive Darstellung erklärt das Verhalten von B-Bäumen oft besser als lange Absätze. Probiert gerne das interaktive Tool auf [btree.app](https://btree.app) aus, um eigene Bäume aufzubauen, Einfüge- sowie Löschvorgänge zu beobachten und das Traversieren visuell nachzuvollziehen.

Das war der Einstieg. In den nächsten Teilen dieser Serie widmen wir uns handfesten Praxisszenarien: Welche Fehler bei der Abfrageformulierung dazu führen, dass Indizes ignoriert werden, wie wir mit zusammengesetzten Indizes (*Composite Indexes*) umgehen und wie wir Queries schreiben, die das absolute Maximum aus der Datenbank herausholen.
