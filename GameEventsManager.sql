-- MySQL dump 10.13  Distrib 8.2.0, for macos14.0 (arm64)
--
-- Host: localhost    Database: progetto_web
-- ------------------------------------------------------
-- Server version	8.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `evento`
--

DROP TABLE IF EXISTS `evento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `evento` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL,
  `creatore` int DEFAULT NULL,
  `descrizione` longtext,
  `img` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_utente` (`creatore`),
  CONSTRAINT `evento_ibfk_1` FOREIGN KEY (`creatore`) REFERENCES `utenti` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evento`
--

LOCK TABLES `evento` WRITE;
/*!40000 ALTER TABLE `evento` DISABLE KEYS */;
INSERT INTO `evento` VALUES (1,'Torneo \"Valorant Champions\"',3,'Il torneo \"Valorant Champions\" è dedicato agli appassionati di Valorant e offre un’intensa competizione a squadre di cinque giocatori. Il formato prevede una fase a gironi iniziale, in cui ogni squadra affronta più avversari per accumulare punti e qualificarsi ai playoff. I playoff seguono una modalità a eliminazione diretta, che aggiunge pressione e adrenalina alle sfide. L\'evento include una sezione di replay per analizzare le giocate chiave e una \"kill-cam\" esclusiva per rivivere i momenti più emozionanti. I premi in palio sono accessori esclusivi per i personaggi, riconoscimenti in-game e trofei per le squadre vincenti. Il torneo si conclude con una cerimonia di premiazione in diretta streaming.','1731771372750.jpeg'),(2,'League of Legends: Clash of Champions',3,'In \"Clash of Champions,\" i team competono in una versione rivisitata dei classici tornei di League of Legends. Ogni squadra deve essere ben coordinata per scegliere i campioni giusti e adattare la propria strategia in base agli avversari. La struttura dell’evento prevede una doppia eliminazione con un doppio tabellone, il che permette alle squadre di avere una seconda possibilità anche in caso di sconfitta. Le partite delle fasi finali vengono trasmesse in diretta e commentate da esperti, con approfondimenti sui momenti di gioco più strategici e sulle scelte tattiche. I vincitori ricevono prestigiosi trofei digitali e premi esclusivi, insieme al titolo di \"Campioni del Clash.\"','1731771494375.jpeg'),(3,'Rocket League Aerial Masters',1,'\"Aerial Masters\" è un torneo per gli appassionati di Rocket League, incentrato sulle acrobazie aeree e le giocate spettacolari. I giocatori competono in squadre da tre, sfidandosi su campi appositamente disegnati per mettere in risalto le loro abilità aeree. Il torneo include un round di qualificazione e fasi finali con eliminazione diretta. Oltre ai premi tradizionali, sono previsti riconoscimenti speciali per le migliori giocate aeree, come gol in rovesciata e colpi a effetto. Gli spettatori possono votare le giocate più incredibili, e le partite finali vengono trasmesse in diretta con effetti visivi per esaltare i momenti più esaltanti.','1731771668588.jpeg'),(4,'Fortnite: Battle Royale Showdown',1,'Il \"Battle Royale Showdown\" è un evento competitivo che celebra la modalità battle royale di Fortnite. I partecipanti si trovano su un’enorme mappa personalizzata, piena di ambientazioni uniche e risorse nascoste. Ogni partita è una sfida di sopravvivenza, con la zona sicura che si restringe progressivamente. Oltre al classico format, il torneo introduce mini-sfide creative, come \"La Corsa al Tesoro,\" dove i giocatori devono trovare un bottino nascosto mentre evitano gli attacchi degli avversari. Il vincitore finale ottiene premi esclusivi e la possibilità di apparire su una leaderboard ufficiale di Fortnite.','1731771690648.png'),(5,'Call of Duty: Warzone Iron Trials',2,'L\'evento \"Iron Trials\" di Call of Duty: Warzone è pensato per i giocatori esperti, poiché introduce una serie di regole avanzate che aumentano il livello di difficoltà. Con armature e risorse ridotte, i partecipanti devono essere attenti e precisi in ogni scontro. L’evento include anche sfide specifiche come \"Ultimo Sopravvissuto,\" che premia il miglior giocatore che riesce a resistere a un’intera squadra avversaria. Con l’aumento della difficoltà, i giocatori devono bilanciare l’uso delle risorse e fare affidamento solo sulle proprie abilità di mira. Chi vince ottiene ricompense uniche e il titolo di \"Iron Warrior.\"','1731771760918.jpg'),(7,'Super Smash Bros. Ultimate Showdown',2,'migliori giocatori si affrontano in match a eliminazione singola e doppia. Ogni round ha impostazioni uniche, come arene casuali e oggetti a tema. Gli scontri si svolgono su un palco centrale, con telecamere che riprendono ogni momento cruciale e il pubblico che vota per i migliori combattenti. Le semifinali e le finali vengono trasmesse in streaming, e i vincitori ottengono trofei speciali, riconoscimenti in-game e oggetti commemorativi per il proprio personaggio preferito.','1731771816086.png'),(8,'Minecraft Build & Battle Arena',3,'La \"Build & Battle Arena\" è un evento Minecraft in cui i giocatori si dividono in squadre e competono per costruire strutture imponenti in un tempo limitato. Dopo la fase di costruzione, inizia una battaglia PvP dove le squadre difendono le proprie costruzioni. Le strutture più creative e resistenti vengono premiate, mentre la fase di battaglia aumenta l’azione e richiede un’ottima strategia di squadra. Questo evento è pensato per unire la creatività alla competizione, e i vincitori vengono premiati con accessori esclusivi e menzioni speciali nel mondo di Minecraft.','1731771842754.jpg'),(9,'Overwatch Heroes Challenge',1,'L’evento \"Heroes Challenge\" di Overwatch è pensato per mettere alla prova la versatilità e la capacità di adattamento dei giocatori. Le squadre devono completare una serie di sfide speciali, come conquistare punti obiettivo con eroi scelti casualmente o affrontare ondate di nemici in modalità PvE. Ogni sfida richiede un uso strategico degli eroi e mette alla prova l’adattabilità dei giocatori. Le squadre che completano più sfide avanzano alle fasi finali, e il team vincente ottiene ricompense come skin esclusive e accessori in-game che celebrano la loro vittoria.','1731771899047.jpg'),(10,'Apex Legends: Trios Tournament',2,'Il \"Trios Tournament\" di Apex Legends è un evento pensato per squadre da tre che cercano la vittoria in intense partite battle royale. Le squadre affrontano una serie di round, con ogni round che introduce nuove condizioni di vittoria, come la raccolta di oggetti speciali o la difesa di una zona strategica. Ogni round permette di guadagnare punti per la classifica generale, e solo le squadre con i punteggi più alti avanzano alle fasi finali. I vincitori ricevono riconoscimenti esclusivi, come badge o skin uniche per i propri personaggi.','1731772475172.jpg');
/*!40000 ALTER TABLE `evento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifiche`
--

DROP TABLE IF EXISTS `notifiche`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifiche` (
  `id` int NOT NULL AUTO_INCREMENT,
  `contenuto` longtext,
  `id_utente` int DEFAULT NULL,
  `letta` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_utente` (`id_utente`),
  CONSTRAINT `notifiche_ibfk_1` FOREIGN KEY (`id_utente`) REFERENCES `utenti` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifiche`
--

LOCK TABLES `notifiche` WRITE;
/*!40000 ALTER TABLE `notifiche` DISABLE KEYS */;
INSERT INTO `notifiche` VALUES (2,'luca sta partecipando all\'evento Rocket League Aerial Masters',1,0),(4,'andrea sta partecipando all\'evento Minecraft Build & Battle Arena',3,0),(8,'mario sta partecipando all\'evento Torneo \"Valorant Champions\"',3,0),(14,'mario sta partecipando all\'evento Super Smash Bros. Ultimate Showdown',2,0),(15,'mario non partecipa più all\'evento Apex Legends: Trios Tournament',2,0),(16,'mario non partecipa più all\'evento Super Smash Bros. Ultimate Showdown',2,0);
/*!40000 ALTER TABLE `notifiche` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `partecipa`
--

DROP TABLE IF EXISTS `partecipa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `partecipa` (
  `id_utente` int NOT NULL,
  `id_evento` int NOT NULL,
  PRIMARY KEY (`id_utente`,`id_evento`),
  KEY `id_evento` (`id_evento`),
  CONSTRAINT `partecipa_ibfk_1` FOREIGN KEY (`id_utente`) REFERENCES `utenti` (`id`),
  CONSTRAINT `partecipa_ibfk_2` FOREIGN KEY (`id_evento`) REFERENCES `evento` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `partecipa`
--

LOCK TABLES `partecipa` WRITE;
/*!40000 ALTER TABLE `partecipa` DISABLE KEYS */;
INSERT INTO `partecipa` VALUES (1,1),(2,8);
/*!40000 ALTER TABLE `partecipa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `utenti`
--

DROP TABLE IF EXISTS `utenti`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `utenti` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(250) DEFAULT NULL,
  `password` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `utenti`
--

LOCK TABLES `utenti` WRITE;
/*!40000 ALTER TABLE `utenti` DISABLE KEYS */;
INSERT INTO `utenti` VALUES (1,'mario','rossi'),(2,'andrea','verdi'),(3,'luca','reina');
/*!40000 ALTER TABLE `utenti` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-18  8:12:50
