"use strict";

const lista = document.getElementById("lista");
const buscar = document.getElementById("buscar");
const orden = document.getElementById("orden");
const contador = document.getElementById("contador");
const totalVideos = document.getElementById("totalVideos");
const filtros = document.getElementById("filtros");
const categoryOptions = document.getElementById("categoryOptions");
const dialogo = document.getElementById("reproductor");
const videoModal = document.getElementById("videoModal");
const playerScreen = dialogo.querySelector(".player-screen");
let videos = [];

document.getElementById("anio").textContent = new Date().getFullYear();

function urlSegura(ruta) {
  if (typeof ruta !== "string" || !ruta.trim()) return null;
  try {
    const url = new URL(ruta, document.baseURI);
    return ["https:", "http:"].includes(url.protocol) ? url.href : null;
  } catch {
    return null;
  }
}

function elemento(etiqueta, contenido, clase) {
  const nodo = document.createElement(etiqueta);
  if (contenido) nodo.textContent = contenido;
  if (clase) nodo.className = clase;
  return nodo;
}

function fechaLegible(fecha) {
  if (!fecha) return "ALEPHSUB0 / VIDEO";
  const valor = new Date(`${fecha}T12:00:00`);
  return Number.isNaN(valor.getTime())
    ? fecha
    : valor.toLocaleDateString("es-EC", { day: "2-digit", month: "short", year: "numeric" }).toUpperCase();
}

function orientacionVideo(video) {
  return video.orientacion || video.formato || "horizontal";
}

function categoriasVideo(video) {
  return Array.isArray(video.categorias) ? video.categorias.filter(categoria => typeof categoria === "string") : [];
}

function duracionVideo(video) {
  const segundos = Math.round(Number(video.duracion_segundos));
  if (!Number.isFinite(segundos) || segundos <= 0) return video.duracion || "";
  const minutos = Math.floor(segundos / 60);
  return `${String(minutos).padStart(2, "0")}:${String(segundos % 60).padStart(2, "0")}`;
}

function opcionesCategoria() {
  const categorias = [...new Set(videos.flatMap(categoriasVideo))].sort((a, b) => a.localeCompare(b, "es"));
  categoryOptions.replaceChildren();
  for (const categoria of ["Todas las categorías", ...categorias]) {
    const valor = categoria === "Todas las categorías" ? "todas" : categoria;
    const etiqueta = elemento("label", "", "filter-option");
    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "categoria";
    radio.value = valor;
    radio.checked = valor === "todas";
    const nombre = elemento("span", categoria);
    const cantidad = valor === "todas" ? videos.length : videos.filter(video => categoriasVideo(video).includes(valor)).length;
    etiqueta.append(radio, nombre, elemento("small", String(cantidad)));
    categoryOptions.append(etiqueta);
  }
}

function abrir(video, indice) {
  const url = urlSegura(video.archivo);
  if (!url) return;
  document.getElementById("tituloModal").textContent = video.titulo;
  document.getElementById("playerCounter").textContent = `ALEPHSUB0 / ${String(indice + 1).padStart(3, "0")}`;
  playerScreen.classList.toggle("vertical", orientacionVideo(video) === "vertical");
  videoModal.poster = urlSegura(video.poster) || "";
  videoModal.src = url;
  dialogo.showModal();
  videoModal.play().catch(() => {});
}

function crearTarjeta(video, indice) {
  const articulo = elemento("article", "", "video-card");
  const media = elemento("div", "", "video-preview");
  const poster = urlSegura(video.poster);
  if (poster) {
    const imagen = document.createElement("img");
    imagen.src = poster;
    imagen.alt = "";
    imagen.loading = indice === 0 ? "eager" : "lazy";
    media.append(imagen);
  } else {
    media.append(elemento("span", "∑", "preview-fallback"));
  }

  const arriba = elemento("div", "", "preview-top");
  arriba.append(elemento("span", orientacionVideo(video) === "vertical" ? "VERTICAL" : "HORIZONTAL", "preview-type"));
  media.append(arriba);

  const play = elemento("button", "", "preview-play");
  play.type = "button";
  play.setAttribute("aria-label", `Reproducir ${video.titulo}`);
  play.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3.8a1 1 0 0 1 1.5-.86l12.1 8.2a1 1 0 0 1 0 1.72L8.5 21.06A1 1 0 0 1 7 20.2Z"/></svg>';
  play.addEventListener("click", () => abrir(video, indice));
  media.append(play);

  const abajo = elemento("div", "", "preview-bottom");
  abajo.append(elemento("span", `VIDEO / ${String(indice + 1).padStart(3, "0")}`, "preview-index"));
  const duracion = duracionVideo(video);
  if (duracion) abajo.append(elemento("span", duracion, "preview-duration"));
  media.append(abajo);

  const cuerpo = elemento("div", "", "card-content");
  cuerpo.append(elemento("p", indice === 0 ? "VIDEO DESTACADO" : "EXPLORA EL VIDEO", "card-overline"));
  const chips = elemento("div", "", "card-categories");
  categoriasVideo(video).forEach(categoria => chips.append(elemento("span", categoria, "category-chip")));
  if (chips.childElementCount) cuerpo.append(chips);
  cuerpo.append(elemento("h3", video.titulo), elemento("p", video.descripcion || "Una nueva perspectiva sobre ciencia y matemática.", "card-description"));
  const pie = elemento("div", "", "card-bottom");
  pie.append(elemento("span", fechaLegible(video.fecha), "card-date"));
  const accion = elemento("button", "Reproducir video", "card-action");
  accion.type = "button";
  accion.append(elemento("span", "↗"));
  accion.addEventListener("click", () => abrir(video, indice));
  pie.append(accion);
  cuerpo.append(pie);
  articulo.append(media, cuerpo);
  return articulo;
}

function render() {
  const consulta = buscar.value.trim().toLocaleLowerCase("es");
  const categoria = filtros.elements.categoria?.value || "todas";
  const orientacion = filtros.elements.orientacion.value;
  const duracion = filtros.elements.duracion.value;
  const resultados = videos.filter(video => {
    const texto = `${video.titulo} ${video.descripcion || ""} ${categoriasVideo(video).join(" ")} ${Array.isArray(video.etiquetas) ? video.etiquetas.join(" ") : ""}`.toLocaleLowerCase("es");
    const segundos = Number(video.duracion_segundos);
    const coincideDuracion = duracion === "todas"
      || (Number.isFinite(segundos) && segundos > 0 && (
        (duracion === "corta" && segundos < 180)
        || (duracion === "media" && segundos >= 180 && segundos <= 600)
        || (duracion === "larga" && segundos > 600)
      ));
    return texto.includes(consulta)
      && (categoria === "todas" || categoriasVideo(video).includes(categoria))
      && (orientacion === "todas" || orientacionVideo(video) === orientacion)
      && coincideDuracion;
  });
  resultados.sort((a, b) => {
    if (orden.value === "titulo") return a.titulo.localeCompare(b.titulo, "es");
    if (orden.value === "antiguos") return (a.fecha || "").localeCompare(b.fecha || "");
    return (b.fecha || "").localeCompare(a.fecha || "");
  });

  totalVideos.textContent = String(videos.length).padStart(2, "0");
  contador.textContent = `${String(resultados.length).padStart(2, "0")} ${resultados.length === 1 ? "VIDEO ENCONTRADO" : "VIDEOS ENCONTRADOS"}`;
  lista.replaceChildren();
  if (!resultados.length) {
    lista.append(elemento("div", videos.length
      ? "No encontramos videos con ese criterio. Prueba otra búsqueda."
      : "Próximamente encontrarás aquí los videos publicados.", "message"));
    return;
  }
  resultados.forEach((video, indice) => lista.append(crearTarjeta(video, indice)));
}

buscar.addEventListener("input", render);
orden.addEventListener("change", render);
filtros.addEventListener("change", render);
filtros.addEventListener("reset", () => {
  buscar.value = "";
  orden.value = "recientes";
  requestAnimationFrame(render);
});
if (window.matchMedia("(max-width: 620px)").matches) document.getElementById("filterDetails").open = false;
document.getElementById("cerrar").addEventListener("click", () => dialogo.close());
dialogo.addEventListener("click", evento => {
  if (evento.target === dialogo) dialogo.close();
});
dialogo.addEventListener("close", () => {
  videoModal.pause();
  videoModal.removeAttribute("src");
  videoModal.removeAttribute("poster");
  videoModal.load();
});

(async () => {
  try {
    const respuesta = await fetch("./videos.json", { cache: "no-store" });
    if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`);
    const datos = await respuesta.json();
    if (!Array.isArray(datos)) throw new Error("Se esperaba una lista de videos");
    videos = datos.filter(video => video && typeof video.titulo === "string" && urlSegura(video.archivo));
    opcionesCategoria();
    render();
  } catch (error) {
    console.error(error);
    totalVideos.textContent = "00";
    contador.textContent = "COLECCIÓN NO DISPONIBLE";
    lista.replaceChildren(elemento("div", "No se pudo cargar la galería. Revisa el archivo videos.json.", "message"));
  }
})();
