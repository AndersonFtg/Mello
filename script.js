  var firebaseConfig = {
    apiKey: "AIzaSyAKv4AIxWWaKP6HwWye9hH7peWn0bYQlNk",
    authDomain: "armazenamento-dados-web.firebaseapp.com",
    databaseURL: "https://armazenamento-dados-web.firebaseio.com",
    projectId: "armazenamento-dados-web",
    storageBucket: "armazenamento-dados-web.appspot.com",
    messagingSenderId: "759893822700",
    appId: "1:759893822700:web:0ddec2399c4f4a51"
  };

  firebase.initializeApp(firebaseConfig);
  console.log(firebase);
  var db = firebase.firestore();   


  function cadastrar(){
    event.preventDefault();

    let nome = document.getElementById("nome").value;
    let lat = document.getElementById("lat").value;
    let long = document.getElementById("long").value;

    db.collection("local").add({
      nome: nome,
      latitude: lat,
      longitude: long
    })

    .then(function(docRef) {
      document.getElementById("nome").value = "";
      document.getElementById("lat").value = "";
      document.getElementById("long").value = "";
      document.getElementById("id").value = "";
      document.getElementById("nome").focus();
      document.getElementById("mensagem").setAttribute("class", "alert alert-success");
      document.getElementById("mensagem").innerHTML = "<strong> Sucesso! </strong> Local Salvo com Sucesso!";
    })
    
    .catch(function(error) {
      document.getElementById("mensagem").setAttribute("class", "alert alert-danger");
      document.getElementById("mensagem").innerHTML = "<strong> Erro! </strong> " + error;
    });
  }


  function excluir(){
    event.preventDefault();

    let idLocal = document.getElementById("id").value;

    if(idLocal == ""){
      document.getElementById("mensagem").setAttribute("class", "alert alert-danger");
      document.getElementById("mensagem").innerHTML = "<strong> Erro! </strong> Informe um ID para excluir!";
    }

    db.collection("local").doc(idLocal).delete()
    
    .then(function(){
      document.getElementById("id").value = "";
      document.getElementById("mensagem").setAttribute("class", "alert alert-success");
      document.getElementById("mensagem").innerHTML = "<strong> Sucesso! </strong> Local Excluído com Sucesso!";
    })
    
    .catch(function(error){
      document.getElementById("mensagem").setAttribute("class", "alert alert-danger");
      document.getElementById("mensagem").innerHTML = "<strong> Erro! </strong> " + error;
    });
  }


  function consultar(){
    document.getElementById("nomeColunas").setAttribute("class", "thead-dark");
    document.getElementById("colID").innerText = "ID";
    document.getElementById("colNome").innerText = "Nome";
    document.getElementById("colLat").innerText = "Latitude";
    document.getElementById("colLong").innerText = "Longitude";

    db.collection("local").get()
    
    .then((querySnapshot) => { 
      querySnapshot.forEach((doc) => {

        let tabela = document.getElementById("locais");
        let linha = document.createElement("tr");

        tabela.appendChild(linha);

        let colunaID = document.createElement("td");
        let ID = document.createTextNode(doc.id);

        colunaID.appendChild(ID);
        linha.appendChild(colunaID);

        let colunaNome = document.createElement("td");
        let nome = document.createTextNode(doc.data().nome);

        colunaNome.appendChild(nome);
        linha.appendChild(colunaNome);

        let colunaLat = document.createElement("td");
        let latitude = document.createTextNode(doc.data().latitude);

        colunaLat.appendChild(latitude);
        linha.appendChild(colunaLat);

        let colunaLong = document.createElement("td");
        let longitude = document.createTextNode(doc.data().longitude);

        colunaLong.appendChild(longitude);
        linha.appendChild(colunaLong);
      });
    })

    .catch(function(error){
      document.getElementById("mensagem").setAttribute("class", "alert alert-danger");
      document.getElementById("mensagem").innerHTML = "<strong> Erro! </strong> " + error;
    });
  }


  function alterar(){
    event.preventDefault();

    let idLocal = document.getElementById("id").value;

    if(idLocal == ""){
      document.getElementById("mensagem").setAttribute("class", "alert alert-danger");
      document.getElementById("mensagem").innerHTML = "<strong> Erro! </strong> Informe um ID para atualizar!";
    }

    db.collection("local").doc(idLocal).update({
      nome: document.getElementById("nome").value,
      latitude: document.getElementById("lat").value,
      longitude: document.getElementById("long").value
    })
    
    .then(function(){
      document.getElementById("nome").value = "";
      document.getElementById("lat").value = "";
      document.getElementById("long").value = "";
      document.getElementById("id").value = "";
      document.getElementById("nome").focus();
      document.getElementById("mensagem").setAttribute("class", "alert alert-success");
      document.getElementById("mensagem").innerHTML = "<strong> Sucesso! </strong> Local Atualizado com Sucesso!";
    })
    
    .catch(function(error){
      document.getElementById("mensagem").setAttribute("class", "alert alert-danger");
      document.getElementById("mensagem").innerHTML = "<strong> Erro! </strong> " + error;
    });
  }
