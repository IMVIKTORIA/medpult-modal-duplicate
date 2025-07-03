import { useEffect, useState } from "react";
import { localStorageDraftKey } from "./constants";
import icons from "../icons";
/** Маршрутизация по SPA */
export const redirectSPA = (href: string) => {
  let element = document.createElement("a");
  element.href = href;
  element.style.display = "none";
  document.querySelector("body")?.appendChild(element);
  element.click();
  element.remove();
};

/** Запись идентификатора обращения в localStorage
 * @param id Идентификатор обращения
 */
async function setRequest(id: string) {
  localStorage.setItem("currentRequestId", id);
  localStorage.setItem("currentContractorId", "");
  localStorage.setItem("currentContractorPhone", "");
}

/** Получение данных формы из черновика */
export function getDataFromDraft() {
  // Получение данных из черновика
  const draftData = localStorage.getItem(localStorageDraftKey);
  localStorage.removeItem(localStorageDraftKey);
  if (draftData) {
    return JSON.parse(draftData);
  }
}

export function useDebounce<ValueType = any>(
  value: ValueType,
  delay: number
): ValueType {
  // Состояние и сеттер для отложенного значения
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      // Выставить debouncedValue равным value (переданное значение)
      // после заданной задержки
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // Вернуть функцию очистки, которая будет вызываться каждый раз, когда ...
      // ... useEffect вызван снова. useEffect будет вызван снова, только если ...
      // ... value будет изменено (смотри ниже массив зависимостей).
      // Так мы избегаем изменений debouncedValue, если значение value ...
      // ... поменялось в рамках интервала задержки.
      // Таймаут очищается и стартует снова.
      // Что бы сложить это воедино: если пользователь печатает что-то внутри ...
      // ... нашего приложения в поле поиска, мы не хотим, чтобы debouncedValue...
      // ... не менялось до тех пор, пока он не прекратит печатать дольше, чем 500ms.
      return () => {
        clearTimeout(handler);
      };
    },
    // Вызывается снова, только если значение изменится
    // мы так же можем добавить переменную "delay" в массива зависимостей ...
    // ... если вы собираетесь менять ее динамически.
    [value]
  );

  return debouncedValue;
}

export function saveState<ValueType>(state: ValueType) {
  let stateStr: string;

  try {
    stateStr = JSON.stringify(state);
  } catch (e) {
    throw new Error("Ошибка приведения состояния к строке: " + e);
  }

  localStorage.setItem(localStorageDraftKey, stateStr);
}

export function getStatusRequestColor(status: any) {
  switch (status) {
    case "sozdano":
      return "#E7F5B6";
    case "vrabote":
      return "#C5CBE9";
    case "utochnenie-zaprosa":
      return "#B3EAD0";
    case "v-ozhidanii":
      return "#D1D8DC";
    case "zakryto":
      return "#BCE0FB";
    case "otkryto":
      return "#BCE0FB";
    default:
      "#2d2e2f";
  }
}

export function getStatusTaskIcon(status: any) {
  switch (status) {
    case "queue":
      return icons.StatusQueue;
    case "atWork":
      return icons.StatusAtWork;
    case "control":
      return icons.StatusControl;
    case "postpone":
      return icons.StatusPostpone;
    case "complete":
      return icons.StatusComplete;
    case "returned":
      return icons.StatusComplete;
    default:
      return;
  }
}

export function getStatusApprovalIcon(status: any) {
  switch (status) {
    case "processing":
      return icons.StatusProcessing;
    case "finished":
      return icons.StatusFinished;
    case "finishedSend":
      return icons.StatusFinishedSend;
    case "cancelled":
      return icons.StatusCancelled;
    default:
      return;
  }
}

export default {
  redirectSPA,
  setRequest,
  getDataFromDraft,
  saveState,
  getStatusRequestColor,
  getStatusTaskIcon,
  getStatusApprovalIcon,
};
