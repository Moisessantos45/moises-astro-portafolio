import { saveLikeProyect } from "../service/api";

const counterLikesCardsPost = (): void => {
  const likesContainer = document.querySelectorAll<HTMLElement>(".icon-like");
  const card_item = document.querySelector<HTMLElement>(".card__project");
  const listItem: string[] = [];

  likesContainer.forEach((like: HTMLElement) => {
    like.addEventListener("click", async (e: MouseEvent) => {
      const likeCount = like.nextElementSibling as HTMLElement | null;

      if (likeCount && likeCount.textContent) {
        const id = like.getAttribute("data-id") || "";
        let count = parseInt(likeCount.textContent);
        const url = card_item?.getAttribute("data-url") || "";

        const estadoAnterior: EstadoAnterior = {
          esLike: like.classList.contains("fa-solid"),
          countAnterior: count,
        };

        try {
          actualizarEstadoLike(like, likeCount, listItem, id);
          count = parseInt(likeCount.textContent);

          if (url) {
            const respuesta = await saveLikeProyect(id, count, url);
            if (!respuesta) {
              throw new Error("Error al guardar like en el servidor");
            }
            localStorage.setItem("likes", JSON.stringify(listItem));
          }
        } catch (error) {
          revertirCambios(like, likeCount, estadoAnterior, listItem, id);
        }
      }
    });
  });
};

interface EstadoAnterior {
  esLike: boolean;
  countAnterior: number;
}

const actualizarEstadoLike = (
  like: HTMLElement,
  likeCount: HTMLElement,
  listItem: string[],
  id: string
): void => {
  let count = parseInt(likeCount.textContent || "0");

  if (like.classList.contains("fa-regular")) {
    count++;
    like.classList.replace("fa-regular", "fa-solid");
    listItem.push(id);
  } else {
    count--;
    like.classList.replace("fa-solid", "fa-regular");
    const index = listItem.indexOf(id);
    if (index > -1) {
      listItem.splice(index, 1);
    }
  }

  likeCount.textContent = count.toString();
};

const revertirCambios = (
  like: HTMLElement,
  likeCount: HTMLElement,
  estadoAnterior: EstadoAnterior,
  listItem: string[],
  id: string
): void => {
  if (estadoAnterior.esLike) {
    like.classList.replace("fa-regular", "fa-solid");
    listItem.push(id);
  } else {
    like.classList.replace("fa-solid", "fa-regular");
    const index = listItem.indexOf(id);
    if (index > -1) {
      listItem.splice(index, 1);
    }
  }
  likeCount.textContent = estadoAnterior.countAnterior.toString();
};

const addClassIconLike = () => {
  const likesContainer = document.querySelectorAll(".icon-like");
  const listItem = JSON.parse(localStorage.getItem("likes") || "[]");
  listItem.forEach((id: string) => {
    if (id !== "") {
      likesContainer.forEach((like) => {
        if (like.getAttribute("data-id") === id) {
          like.classList.replace("fa-regular", "fa-solid");
        }
      });
    }
  });
};

const updateLikeCounter = () => {
  addClassIconLike();
  counterLikesCardsPost();
};

document.addEventListener("DOMContentLoaded", updateLikeCounter);
document.addEventListener("astro:page-load", updateLikeCounter);
