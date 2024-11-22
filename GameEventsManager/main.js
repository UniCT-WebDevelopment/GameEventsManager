const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
const serverHTTP = require('http').Server(app);
const serverSocketIO = require('socket.io')(serverHTTP);
const mysql = require('mysql2');
const multer = require('multer');
const path = require('path');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("./www"));


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'progetto_web'
});

// Connessione al database MySQL
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to MySQL Database');
});

app.use(session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: false
}));



app.get('/data', (req, res) => {
    const sql = 'SELECT * FROM evento';  // Modifica la query secondo le tue necessità
    db.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Errore nel recupero dei dati' });
            return;
        }

        res.json(result);

    });
});





app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).json({ message: 'Username e password sono richiesti' });
        return;
    }

    const sql = 'SELECT * FROM utenti WHERE nome = ? AND password = ?';
    db.query(sql, [username, password], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Utente non trovato' });
            return;
        }
        const user = results[0];

        if (results.length > 0) {
            // Utente trovato, crea una sessione
            req.session.loggedin = true;
            req.session.userId = user.id;
            req.session.username = username;
            res.json({ message: user });
        } else {
            res.status(401).json({ message: 'Credenziali non valide' });
        }

    });
});


app.post('/register', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).json({ message: 'Username e password sono richiesti' });
        return;
    }

    const sql = 'INSERT INTO utenti (nome, password) VALUES (?, ?)';
    db.query(sql, [username, password], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Errore nella registrazione' });
            return;
        }
        res.json({ message: 'Registrazione effettuata con successo' });
    });
});

app.post('/crea', (req, res) => {
    const { id, nome, descr, params } = req.body;
    if (!nome) {
        res.status(400).json({ message: 'nome evento non valido' });
        return;
    }
    const sql = 'INSERT INTO evento (nome, creatore,descrizione,img) VALUES (?,?,?,?)';
    db.query(sql, [nome, id, descr, params], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Errore nella creazione del evento' });
            return;
        }
        res.json({ message: 'Evento creato con successo' });
    });
});

app.post('/esci', (req, res) => {
    const { id, deleteP } = req.body;
    const sql = 'DELETE FROM partecipa WHERE id_utente = ? and id_evento=?';
    db.query(sql, [id, deleteP], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Errore nel annullare la partecipazione' });
            return;
        }
        res.json({ message: 'Sei uscito con successo' });
    });
});
app.post('/cancellaNotifiche', (req, res) => {
    const { id } = req.body;
    const sql = 'DELETE FROM notifiche WHERE id_utente = ? and letta=1';
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Errore nel cancellare le notifiche' });
            return;
        }
        res.json({ message: 'cancellato le notifiche con successo' });
    });
});




app.post('/det', (req, res) => {
    if (req.session.loggedin) {
        res.json({ message: 'ok' });
    } else {
        res.status(401).json({ message: 'Non autorizzato' });
    }
});
app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Errore durante il logout');
        }
        res.send('Logout effettuato con successo');
    });
});



app.post('/partecipa', (req, res) => {
    const { id, curretRoom } = req.body;
    const sql = 'INSERT INTO partecipa (id_utente,id_evento) VALUES (?,?)';
    db.query(sql, [id, curretRoom], (err, results) => {


        if (err) {
            if (err.sqlState == 23000) {
                res.status(500).json({ message: 'Errore stai già partecipando a questo evento' });
                return;
            }
            res.status(500).json({ message: 'Errore nella iscrizione all evento' });
            return;
        }
        res.json({ message: 'Stai partecipando con successo' });
    });
});


app.post('/eventP', (req, res) => {
    const { id } = req.body;
    const sql = 'SELECT * FROM evento e, partecipa p where e.id=p.id_evento and p.id_utente=? ';  // Modifica la query secondo le tue necessità
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Errore nel recupero dei dati' });
            return;
        }
        res.json(result);

    });
});

app.post('/myEvent', (req, res) => {
    const { id } = req.body;
    const sql = 'SELECT * FROM evento  where creatore=? ';  // Modifica la query secondo le tue necessità
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Errore nel recupero degli eventi' });
            return;
        }
        res.json(result);
    });
});

app.post('/notifiche', (req, res) => {
    const { id, l } = req.body;
    const sql = 'SELECT id,id_utente,contenuto,letta FROM notifiche where id_utente=? and letta=?';  // Modifica la query secondo le tue necessità
    db.query(sql, [id, l], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Errore nel recupero dei dati' });
            return;
        }
        res.json(result);
    });
});


app.post('/letto', (req, res) => {
    const { id_notifica } = req.body;
    const sql = 'update notifiche set letta=1 where id=?';  // Modifica la query secondo le tue necessità
    db.query(sql, [id_notifica], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Errore nel recupero dei dati' });
            return;
        }
        res.json({ message: 'notifica letta' });
    });
});

app.post('/DeleteMyEvent', (req, res) => {
    const { id, deleteP } = req.body;

    const sql3 = 'Select id_utente,nome FROM partecipa, evento e WHERE id_evento = ? and id_evento=e.id';
    db.query(sql3, [deleteP], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Errore' });
            return;
        }
        if (result.length > 0) {

            let nom = 'evento è stato cancellato ' + result[0].nome;
            for (const index in result) {
                const sql2 = 'INSERT INTO notifiche (id_utente,contenuto,letta) VALUES (?,?,0)';
                db.query(sql2, [result[index].id_utente, nom], (err, result) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                });
            }
        }

    });




    const sql1 = 'DELETE FROM partecipa WHERE id_evento = ?';
    db.query(sql1, [deleteP], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Errore nel cancellare le patecipazioni' });
            return;
        }
    });
    const sql = 'DELETE FROM evento WHERE creatore = ? and id=?';
    db.query(sql, [id, deleteP], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Errore nel cancellare l evento' });
            return;
        }
    });
    res.json({ message: 'eliminato con successo' });
});

//gestione socket
serverSocketIO.on("connection", (socketClient) => {
    console.log("Client Collegato");

    socketClient.on("disconnect", () => {
        console.log("Il client si è disconnesso");
    });

    socketClient.on('logout', () => {
        console.log('Logout utente');
        socketClient.disconnect(true);
    });

    socketClient.on('joinRoom', (data) => {
        const { room, id } = data;
        socketClient.join(room);
        const sql2 = 'select * from evento where id=?';
        db.query(sql2, [room], (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).json({ message: 'Errore nel recupero dei dati' });
                return;
            }
            serverSocketIO.to(room).emit('enter', id, result);
        });

    });

    socketClient.on('notify', (data) => {
        const { room, nome, p } = data;
        let creatore;
        let nom
        console.log(room);
        const sql1 = 'select * from evento where id=?';
        db.query(sql1, [room], (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).json({ message: 'Errore nel recupero dei dati' });
                return;
            }
            creatore = result[0].creatore;
            nomeEvento = result[0].nome;
            if (p == 1) {
                nom = nome + " sta partecipando all'evento " + nomeEvento;
            } else {
                nom = nome + " non partecipa più all'evento " + nomeEvento;
            }

            const sql2 = 'INSERT INTO notifiche (id_utente,contenuto,letta) VALUES (?,?,0)';
            db.query(sql2, [creatore, nom], (err, result) => {
                if (err) {
                    console.error(err);
                    return;
                }
                socketClient.broadcast.emit('noti', creatore);
            });

        });



    });
    socketClient.on('refresh', () => {
        socketClient.broadcast.emit('r');
    });

    socketClient.on('message', (data) => {
        const { room, message, id, nome } = data;
        serverSocketIO.to(room).emit('message', message, id, nome);
    });

    socketClient.on('back', (data) => {
        const { room } = data;
        socketClient.leave(room);
        socketClient.emit('b');
    });
});


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'www/assets/img/'); // cartella dove verranno salvate le immagini
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + path.extname(file.originalname)); // nome del file con estensione
    }
});

const upload = multer({ storage: storage });

// Assicurati che la cartella "uploads" esista
const fs = require('fs');
const uploadDir = 'www/assets/img/';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Rotta per il caricamento del file
app.post('/upload', upload.single('image'), (req, res) => {
    try {
        res.status(200).json({
            message: 'Immagine caricata con successo',
            filePath: `${req.file.filename}`
        });
    } catch (error) {
        res.status(500).json({ message: 'Errore durante il caricamento', error });
    }
});



serverHTTP.listen(8080);