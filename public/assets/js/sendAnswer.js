let loading = false;
let ipAddress = {};

function spinner() {
  if (loading == true) {
    spinnerCss.style.display = "block";
    content.style.display = "none";
  }
}

async function getIp() {
  await fetch("https://ipapi.co/json/", {
    method: "GET",
    mode: "cors"
  }).then(res => {
    res.text().then(result => {
      ipAddress = JSON.parse(result);
    });
  });
}

async function sendFeed() {
  window.event.preventDefault();
  // if (
  //   apresentacao.value < 1 ||
  //   conteudo.value < 1 ||
  //   didatica.value < 1 ||
  //   dominio.value < 1
  // ) {
  //   alert("err");
  //   return;
  // }
  let { ip } = ipAddress;
  console.log(ip);
  loading = true;
  spinner();
  await fetch(
    "https://us-central1-excellent-guide-253904.cloudfunctions.net/api/feed",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "PUT,PATCH,DELETE"
      },
      body: JSON.stringify({
        apresentacao: Number(apresentacao.value),
        comentario: comentario.value,
        conteudo: Number(conteudo.value),
        didatica: Number(didatica.value),
        dominio: Number(dominio.value),
        ip: ip
      })
    }
  ).then(res => {
    res.status == 201
      ? (window.location.href = "./pages/obrigado.html")
      : (window.location.href = "./pages/failed.html");
  });
}
