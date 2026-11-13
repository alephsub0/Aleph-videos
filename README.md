
<!-- Encabezado -->
[![Colaboradores][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Estrellas][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]

<!-- Título -->
<br />
<div align="center">

<h1 align="center">Aleph Videos</h1>

<p align="center">
    Colección de videos educativos y de divulgación matemática de Alephsub0.
    <br />
    <a href="https://github.com/alephsub0/Aleph-videos/issues">Reportar un problema</a>
    ·
    <a href="https://alephsub0.github.io/Aleph-videos/">Ver galería de videos</a>
</p>

</div>

<!-- Cuerpo -->
## Sobre el proyecto

Aleph Videos reúne videos educativos y de divulgación matemática producidos como parte del [Proyecto Alephsub0](https://www.alephsub0.org/about/).

Los videos se elaboran mediante Manimate y Manim Community, utilizando LaTeX/TikZ para las representaciones matemáticas y ElevenLabs para la narración en español latinoamericano.

El proceso comprende la planificación de escenas, la elaboración y revisión del guion, la generación de audio, la sincronización de animaciones y el renderizado final.

### Construido con

![Python Badge](https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=fff&style=for-the-badge)
![Manim Badge](https://img.shields.io/badge/Manim-343434?style=for-the-badge)
![LaTeX Badge](https://img.shields.io/badge/LaTeX-008080?logo=latex&logoColor=fff&style=for-the-badge)
![ElevenLabs Badge](https://img.shields.io/badge/ElevenLabs-000000?style=for-the-badge)
![FFmpeg Badge](https://img.shields.io/badge/FFmpeg-007808?logo=ffmpeg&logoColor=fff&style=for-the-badge)

## Descripción

Este repositorio contiene exclusivamente los videos terminados y aprobados para su publicación.

Los videos están disponibles para su visualización en una galería web pública.
La miniatura y la acción «Abrir video» abren el archivo MP4 original en una pestaña nueva.

El código fuente, los guiones de producción, los recursos de trabajo y las configuraciones se mantienen en un repositorio privado independiente.

### Contenido del repositorio

- `videos/`: archivos MP4 de los videos publicados.
- `index.html`: galería web para explorar y reproducir los videos.
- `videos.json`: datos de cada video y filtros de la galería.
- `assets/`: logotipos e imágenes de vista previa.

Cada entrada de `videos.json` incluye `titulo`, `descripcion`, `archivo`, `fecha`, `poster`, `duracion_segundos`, `orientacion` (`horizontal` o `vertical`), `categorias` y `etiquetas`. La duración visible se calcula a partir de `duracion_segundos`; las categorías alimentan automáticamente el panel lateral y las etiquetas amplían la búsqueda.

## Créditos

**Andrés Merino** (aemerinot@gmail.com)

- Docente-Investigador en la Pontificia Universidad Católica del Ecuador.
- Fundador del [Proyecto Alephsub0](https://www.alephsub0.org/about/).

[![LinkedIn][linkedin-shield]][linkedin-url-aemt]

<!-- MARKDOWN LINKS & IMAGES -->
[contributors-shield]: https://img.shields.io/github/contributors/alephsub0/Aleph-videos.svg?style=for-the-badge
[contributors-url]: https://github.com/alephsub0/Aleph-videos/graphs/contributors

[forks-shield]: https://img.shields.io/github/forks/alephsub0/Aleph-videos.svg?style=for-the-badge
[forks-url]: https://github.com/alephsub0/Aleph-videos/forks

[stars-shield]: https://img.shields.io/github/stars/alephsub0/Aleph-videos?style=for-the-badge
[stars-url]: https://github.com/alephsub0/Aleph-videos/stargazers

[issues-shield]: https://img.shields.io/github/issues/alephsub0/Aleph-videos.svg?style=for-the-badge
[issues-url]: https://github.com/alephsub0/Aleph-videos/issues
[linkedin-shield]: https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white
[linkedin-url-aemt]: https://www.linkedin.com/in/andrés-merino-010a9b12b/
