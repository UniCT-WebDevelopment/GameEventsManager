**GameEventsManager**
---

Questo progetto costruito con Node.js permette di gestire eventi videoludici. Offre strumenti per creare, modificare e monitorare tornei, raduni e altre attività gaming.

**🚀 Funzionalità principali**

* Creazione di eventi con dettagli personalizzati (nome, data, luogo, ecc.).
* Registrazione dei partecipanti.
* Notifiche per gli utenti.

**🛠️ Requisiti**
Prima di iniziare, assicurati di avere:
* Node.js.
* npm o yarn per la gestione dei pacchetti.
* Un database supportato (MySQL).


**📥 Installazione**
---

Il primo passo è clonare l'intero progetto.

> $ git clone https://github.com/UniCT-WebDevelopment/GameEventsManager.git

Quindi spostarsi nella cartella GameEventsManager

> $ cd GameEventsManager

e da qui avviare il server
> $ node main.js

Quest'ultimo sarà in ascolto sulla porta 8080. Quindi è possibile visualizzare il client da un browser installato nello stesso host che esegue il server, andando all'indirizzo localhost:8080, oppure da un browser di un host nella stessa rete locale del server.

**Front-End**
---
Il front-end è progettato per offrire un'interfaccia utente semplice, intuitiva e responsiva per gestire eventi videoludici. È costruito utilizzando tecnologie moderne e segue le migliori pratiche di design per garantire un'esperienza utente fluida sia su desktop che su dispositivi mobili.

**Back-end**
---

Come già accennato, il back-end è basato su nodejs

Tutta la comunicazione tra client e server avviene sfruttando Socket.IO, una libreria Javascript per applicazioni web in tempo reale. Comprende una comunicazione bidirezionale realtime tra i web client e i server. È formata da due parti: una libreria lato client che gira sul browser e una libreria lato server per Node.js.



**Tecnologie utilizzate**
---

* Node.js: Runtime JavaScript per il server.
* Express.js: Framework per la gestione delle API REST e del routing.
* Socket.IO: Per comunicazioni bidirezionali in tempo reale (es. notifiche o chat).
* Database: database SQL (es. MySQL).
* Gestione file: Multer per il caricamento di immagini o documenti relativi agli eventi.