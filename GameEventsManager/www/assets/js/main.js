
document.addEventListener('DOMContentLoaded', () => {
    function randomLightColor() {
        const r = Math.floor(Math.random() * 156) + 100;
        const g = Math.floor(Math.random() * 156) + 100;
        const b = Math.floor(Math.random() * 156) + 100;
        return `rgb(${r}, ${g}, ${b})`;
    }

    function getData() {
        const date = new Date();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }


    let numero_di_notifiche = 0;
    let id;
    let use;
    let curretRoom;

    var mioModal = new bootstrap.Modal(document.getElementById('mioModal'));

    const toastLiveExample = document.getElementById('liveToast');

    function getEvent() {
        const dataList = document.getElementById('data-list');
        axios.get('http://localhost:8080/data')
            .then(response => {
                const data = response.data;
                dataList.innerHTML = '';
                // Crea un elemento <li> per ogni dato e lo aggiunge alla lista
                data.forEach(item => {
                    const li = document.createElement('div');
                    li.classList.add('col');
                    const li2 = document.createElement('div');
                    li2.classList.add('card');
                    const li3 = document.createElement('div');
                    const img = document.createElement('img');
                    img.classList.add('card-img-top');
                    img.src = '/assets/img/' + `${item.img}`;
                    img.alt = 'immagine non disponibile'
                    li3.classList.add('card-body');
                    li3.classList.add('text-center');
                    const li4 = document.createElement('h5');
                    li4.classList.add('card-title');
                    li4.innerHTML = `${item.nome}`;
                    li3.appendChild(li4);
                    li2.appendChild(img);
                    li2.appendChild(li3);
                    li.appendChild(li2);
                    const joinEvent = document.createElement('button');
                    joinEvent.textContent = 'Saperne di più';
                    joinEvent.classList.add('btn');
                    joinEvent.classList.add('btn-primary');
                    joinEvent.addEventListener('click', () => {
                        axios.post('http://localhost:8080/det', {})
                            .then(response => {
                                curretRoom = `${item.id}`;
                                socket.emit("joinRoom", { room: curretRoom, id: id });
                                const n = document.getElementById('new');
                                n.style.display = 'none';
                            })
                            .catch(error => {
                                console.error('Errore:', error.response.data.message);
                                mioModal.show();

                            });
                    });
                    li3.appendChild(joinEvent);
                    dataList.appendChild(li);

                });

            })
            .catch(error => {
                console.error('Errore:', error.response.data.message);
                const errorData = document.getElementById('errorData');
                errorData.innerHTML = '<div class="alert alert-danger" role="alert"> Non ci sono eventi </div>';

            });
    }





    function eventoLogin() {
        const enter = document.getElementById('enter');
        enter.addEventListener('click', () => {
            const login = document.getElementById('login');
            login.style.display = 'flex';
            const b = document.getElementById('b');
            b.style.display = 'none';
            const n = document.getElementById('new');
            n.style.display = 'none';
        });
    }
    eventoLogin();

    function notifiche(le) {
        let l = le;
        const not = document.getElementById('not');
        const notify = document.getElementById('notifiche');
        axios.post('http://localhost:8080/notifiche', { id, l })
            .then(response => {
                const data = response.data;
                notify.innerHTML = '';
                if (l == 0) {
                    numero_di_notifiche = 0;
                }
                data.forEach(item => {
                    const li = document.createElement('div');
                    li.innerHTML = `${item.contenuto}`
                    li.classList.add('notifiche');
                    const li2 = document.createElement('div');

                    li2.classList.add('text-end');
                    li.appendChild(li2);
                    if (`${item.letta}` == 0) {
                        numero_di_notifiche++;
                        const joinEvent = document.createElement('button');
                        joinEvent.innerHTML = 'segna come letta';
                        joinEvent.classList.add('btn');
                        joinEvent.classList.add('btn-primary');
                        li.appendChild(joinEvent);
                        joinEvent.addEventListener('click', () => {
                            const id_notifica = `${item.id}`;
                            axios.post('http://localhost:8080/letto', { id_notifica })
                                .then(response => {
                                    numero_di_notifiche--;
                                    not.innerHTML = numero_di_notifiche;
                                    li.remove();
                                })
                                .catch(error => {
                                    console.error('Errore nella notifica:', error.response.data.message);

                                });
                        });

                    }
                    notify.appendChild(li)
                });

                not.innerHTML = numero_di_notifiche;
            })
            .catch(error => {
                console.error('Errore nelle notifiche:', error.response.data.message);
            });
    }

    const nlett = document.getElementById('btnNL');
    nlett.addEventListener('click', (event) => {
        event.preventDefault();
        notifiche(0);
    })

    const lett = document.getElementById('btnL');
    lett.addEventListener('click', (event) => {
        event.preventDefault();
        notifiche(1);
    })
    function cancellaNotifiche(id) {
        axios.post('http://localhost:8080/cancellaNotifiche', { id })
            .then(response => {

            })
            .catch(error => {
                console.error('Errore:', error.response.data.message);
            });
    }
    const login = document.getElementById('l');
    login.addEventListener('click', (event) => {
        event.preventDefault();
        const user = document.getElementById('username');
        const pass = document.getElementById('password');
        const username = user.value;
        const password = pass.value;
        user.value = '';
        pass.value = '';
        use = username;
        axios.post('http://localhost:8080/login', { username, password })
            .then(response => {
                socket = io();
                socket.on("connect", () => {
                    id = response.data.message.id;
                    cancellaNotifiche(id);
                    const l = document.getElementById('icon');
                    l.innerHTML = '<span class="NameP" id="nomeUtente"></span>\
                    <div class="btn-group dropstart">\
                        <button type="button" class="btn btn-primary dropdown-toggle " data-bs-toggle="dropdown" aria-expanded="false" >\
                            <svg id="enter" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"\
                            class="bi bi-person-circle" viewBox="0 0 16 16">\
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />\
                            <path fill-rule="evenodd"\
                                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />\
                            </svg>\
                        </button>\
                        <ul class="dropdown-menu">\
                            <li><button id="logout" class="dropdown-item" >Logout</button></li>\
                            <li><button id="eventP" class="dropdown-item" >Evento a cui partecipo</button></li>\
                            <li><button id="myEvent" class="dropdown-item" >I miei eventi</button></li>\
                        </ul>\
                      </div>\
                      <span class="position-relative"">\
                      <button class="btn btn-primary"  id="btnNotifiche" type="button" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop">\
                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bell" viewBox="0 0 16 16">\
                       <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6"/>\
                     </svg>\
                     </button>\
                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">\
                    <span class="visually-hidden">unread messages</span> <span id="not"></span></span></span>';
                    notifiche(0);
                    const btnNotifiche = document.getElementById('btnNotifiche');
                    btnNotifiche.addEventListener('click', (event) => {
                        event.preventDefault();
                        notifiche(0);
                    });
                    getEvent();
                    const login = document.getElementById('login');
                    login.style.display = 'none';
                    const b = document.getElementById('b');
                    b.style.display = 'block';
                    const er = document.getElementById('errore');
                    er.innerHTML = '';
                    const n = document.getElementById('new');
                    n.style.display = 'block';

                    const nomeUtente = document.getElementById('nomeUtente');
                    nomeUtente.textContent = "Benvenuto " + response.data.message.nome;
                    use = response.data.message.nome;
                    const logout = document.getElementById('logout');
                    logout.addEventListener('click', () => {
                        const n = document.getElementById('new');
                        n.style.display = 'none';
                        l.innerHTML = '<svg id="enter" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"\
                            class="bi bi-person-circle" viewBox="0 0 16 16">\
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />\
                            <path fill-rule="evenodd"\
                                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />\
                            </svg>';
                        socket.emit("logout");

                        eventoLogin();

                        axios.post('http://localhost:8080/logout', {})
                            .then(response => {
                                getEvent();
                            })
                            .catch(error => {
                                console.error('Errore nel login:', error.response.data.message);
                            });
                    });
                    eventP();
                    myEvent();

                });
                socket.on('enter', (id, result) => {
                    enter(id, result);
                });
                socket.on('message', (message, id, nome) => {
                    newchat(message, id, nome);
                });

                socket.on('b', () => {
                    bac();
                });
                socket.on('noti', (creatore) => {
                    notifiche(0);
                    if (creatore == id) {
                        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
                        toastBootstrap.show();
                    }

                });
                socket.on('r', () => {
                    getEvent();
                });
            })
            .catch(error => {
                console.error('Errore nel login:', error.response.data.message);
                const er = document.getElementById('errore');
                er.innerHTML = '<div class="alert alert-danger" role="alert"> errore nel login </div>';

            });

    });


    const register = document.getElementById('r');
    register.addEventListener('click', (event) => {
        event.preventDefault();
        const user = document.getElementById('username');
        const pass = document.getElementById('password');
        const username = user.value;
        const password = pass.value;
        user.value = '';
        pass.value = '';

        axios.post('http://localhost:8080/register', { username, password })
            .then(response => {
                const er = document.getElementById('errore');
                er.innerHTML = '<div class="alert alert-success" role="alert"> registrato con successo </div>';

            })
            .catch(error => {
                console.error('Errore nella registrazione:', error.response.data.message);
                const er = document.getElementById('errore');

                er.innerHTML = '<div class="alert alert-danger" role="alert"> errore nella registrazione </div>';
            });



    });


    function enter(id_utente, result) {
        const login = document.getElementById('login');
        login.style.display = 'none';
        const b = document.getElementById('b');
        b.style.display = 'none';
        const sta = document.getElementById('room');
        sta.style.display = 'block';

        if (id == id_utente) {
            const chat = document.getElementById('chat')
            chat.innerHTML = '';
            const errorRoom = document.getElementById('errorRoom');
            errorRoom.innerHTML = '';
        }
        const descrEvent = document.getElementById('descrEvent');
        descrEvent.innerHTML = result[0].descrizione;

        const imgEvent = document.getElementById('imgEvent');
        imgEvent.src = '/assets/img/' + result[0].img;



    }

    const listUsers = [];


    function newchat(message, socketID, nome) {
        let flag = 0;
        const chat = document.getElementById('chat');
        const risp = document.createElement('div');
        const data = document.createElement('div');
        if (socketID == id) {
            risp.textContent = message;
            risp.classList.add('container-fluid');
            risp.classList.add('text-end');
            risp.classList.add('textI');
            data.classList.add('message-time');
            data.textContent = getData();
            risp.appendChild(data);
            chat.appendChild(risp);
        } else {
            for (const index in listUsers) {
                if (listUsers[index].user == nome) {
                    risp.style.backgroundColor = listUsers[index].color;
                    flag = 1;
                    break;
                }
            }
            if (flag == 0) {
                let random = randomLightColor()
                risp.style.backgroundColor = random;
                const user = {
                    user: nome,
                    color: random
                };
                listUsers.push(user);
            }



            risp.textContent = nome + ":";
            const risp2 = document.createElement('div');
            risp2.textContent = message;
            risp.classList.add('textR');
            data.classList.add('message-time');
            data.textContent = getData();
            risp.appendChild(risp2);
            risp.appendChild(data);
            chat.appendChild(risp);
        }

    }
    function bac() {
        const b = document.getElementById('b');
        b.style.display = 'block';
        const sta = document.getElementById('room');
        sta.style.display = 'none';
        const n = document.getElementById('new');
        n.style.display = 'block';
    }

    const invia = document.getElementById('message');
    invia.addEventListener('click', (event) => {
        event.preventDefault();
        const no = document.getElementById('m');
        const message = no.value;
        if (message) {
            socket.emit('message', { room: curretRoom, message: message, id: id, nome: use });
            no.value = '';
        }

    });

    const back = document.getElementById('back');
    back.addEventListener('click', (event) => {
        event.preventDefault();
        socket.emit('back', { room: curretRoom });
    });


    const nw = document.getElementById('new');
    nw.addEventListener('click', () => {
        axios.post('http://localhost:8080/det', {})
            .then(response => {
                const newEvent = document.getElementById('newEvent');
                newEvent.style.display = 'flex';
                const b = document.getElementById('b');
                b.style.display = 'none';
                const n = document.getElementById('new');
                n.style.display = 'none';

            }).catch(error => {
                console.error('Errore:', error.response.data.message);

            });
    });

    const indietroNew = document.getElementById('indietroNew');
    indietroNew.addEventListener('click', (event) => {
        const b = document.getElementById('b');
        b.style.display = 'block';
        const newEvent = document.getElementById('newEvent');
        newEvent.style.display = 'none';
        const n = document.getElementById('new');
        n.style.display = 'block';
    });


    function crea(params) {
        const user = document.getElementById('nomeEvento');
        const descrizione = document.getElementById('descr');
        const descr = descrizione.value;
        const nome = user.value;
        descrizione.value = '';
        user.value = '';
        axios.post('http://localhost:8080/crea', { id, nome, descr, params })
            .then(response => {
                socket.emit("refresh");
                getEvent();
                const b = document.getElementById('b');
                b.style.display = 'block';
                const newEvent = document.getElementById('newEvent');
                newEvent.style.display = 'none';
                const n = document.getElementById('new');
                n.style.display = 'block';
            }).catch(error => {
                console.error('Errore:', error.response.data.message);

            });
    }





    const partecipa = document.getElementById('partecipa');
    partecipa.addEventListener('click', (event) => {
        event.preventDefault();
        axios.post('http://localhost:8080/partecipa', { id, curretRoom })
            .then(response => {
                socket.emit("notify", { room: curretRoom, nome: use, p: 1 });
                const errorRoom = document.getElementById('errorRoom');
                errorRoom.innerHTML = '';
                const msg = document.createElement('div');
                msg.classList.add('alert');
                msg.classList.add('alert-primary');
                msg.textContent = 'stai partecipando a questo evento';
                errorRoom.appendChild(msg);
            }).catch(error => {
                console.error('Errore nel partecipare:', error.response.data.message);
                const errorRoom = document.getElementById('errorRoom');
                errorRoom.innerHTML = '';
                const msg = document.createElement('div');
                msg.classList.add('alert');
                msg.classList.add('alert-danger');
                msg.textContent = error.response.data.message;
                errorRoom.appendChild(msg);
            });
    });


    const home = document.getElementById('home');
    home.addEventListener('click', (event) => {
        getEvent();
    });

    function eventP() {
        let deleteP;
        const eventP = document.getElementById('eventP');
        eventP.addEventListener('click', (event) => {
            const dataList = document.getElementById('data-list');
            axios.post('http://localhost:8080/eventP', { id })
                .then(response => {
                    const data = response.data;
                    dataList.innerHTML = '';
                    // Crea un elemento <li> per ogni dato e lo aggiunge alla lista
                    data.forEach(item => {
                        const li = document.createElement('div');
                        li.classList.add('col');
                        const li2 = document.createElement('div');
                        li2.classList.add('card');
                        const li3 = document.createElement('div');
                        const img = document.createElement('img');
                        img.classList.add('card-img-top');
                        img.src = '/assets/img/' + `${item.img}`;
                        img.alt = 'immagine non disponibile'
                        li3.classList.add('card-body');
                        li3.classList.add('text-center');
                        const li4 = document.createElement('h5');
                        li4.classList.add('card-title');
                        li4.innerHTML = `${item.nome}`;
                        li3.appendChild(li4);
                        li2.appendChild(img);
                        li2.appendChild(li3);
                        li.appendChild(li2); const joinEvent = document.createElement('button');
                        joinEvent.textContent = 'Non partecipare più';
                        joinEvent.classList.add('btn');
                        joinEvent.classList.add('btn-warning');
                        joinEvent.addEventListener('click', () => {
                            deleteP = `${item.id}`;
                            axios.post('http://localhost:8080/esci', { id, deleteP })
                                .then(response => {

                                    socket.emit("notify", { room: deleteP, nome: use, p: 0 });
                                    getEvent();
                                })
                                .catch(error => {
                                    console.error('Errore:', error.response.data.message);

                                });
                        });
                        li3.appendChild(joinEvent);
                        dataList.appendChild(li);
                    })
                }).catch(error => {
                    console.error('Errore:', error.response.data.message);
                });

        });
    }

    function myEvent() {
        const myEvent = document.getElementById('myEvent');
        myEvent.addEventListener('click', (event) => {
            const dataList = document.getElementById('data-list');
            axios.post('http://localhost:8080/myEvent', { id })
                .then(response => {
                    const data = response.data;
                    dataList.innerHTML = '';
                    // Crea un elemento <li> per ogni dato e lo aggiunge alla lista
                    data.forEach(item => {
                        const li = document.createElement('div');
                        li.classList.add('col');
                        const li2 = document.createElement('div');
                        li2.classList.add('card');
                        const li3 = document.createElement('div');
                        const img = document.createElement('img');
                        img.classList.add('card-img-top');
                        img.src = '/assets/img/' + `${item.img}`;
                        img.alt = 'immagine non disponibile'
                        li3.classList.add('card-body');
                        li3.classList.add('text-center');
                        const li4 = document.createElement('h5');
                        li4.classList.add('card-title');
                        li4.innerHTML = `${item.nome}`;
                        li3.appendChild(li4);
                        li2.appendChild(img);
                        li2.appendChild(li3);
                        li.appendChild(li2); const joinEvent = document.createElement('button');
                        joinEvent.textContent = 'Cancella evento';
                        joinEvent.classList.add('btn');
                        joinEvent.classList.add('btn-danger');
                        joinEvent.addEventListener('click', () => {
                            deleteP = `${item.id}`;
                            axios.post('http://localhost:8080/DeleteMyEvent', { id, deleteP })
                                .then(response => {
                                    socket.emit("refresh");
                                    getEvent();
                                })
                                .catch(error => {
                                    console.error('Errore:', error.response.data.message);

                                });
                        });
                        li3.appendChild(joinEvent);
                        dataList.appendChild(li);
                    })
                }).catch(error => {
                    console.error('Errore:', error.response.data.message);
                });
        });
    }
    const upload = document.getElementById('crea');
    upload.addEventListener('click', (event) => {
        event.preventDefault();
        uploadImage();
    });

    async function uploadImage() {

        const fileInput = document.getElementById('imageInput');
        const file = fileInput.files[0];

        if (!file) {
            alert("Per favore, seleziona un'immagine prima di caricare.");
            return;
        }

        const formData = new FormData();
        formData.append('image', file);
        fileInput.value = '';

        try {
            // Effettua la richiesta POST al server
            const response = await axios.post('http://localhost:8080/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });


            crea(response.data.filePath);
        } catch (error) {
            document.getElementById('responseMessage').innerHTML = `<p>Errore durante il caricamento: ${error.message}</p>`;
        }
    }


});
