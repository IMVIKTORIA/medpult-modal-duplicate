import React from "react";

const ReturnButton = (
  <svg
    width="42"
    height="42"
    viewBox="0 0 42 42"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="21" cy="21" r="21" fill="#ECEFF1"></circle>
    <line
      x1="23.5507"
      y1="28.4649"
      x2="16.0341"
      y2="20.9483"
      stroke="#9EA3A8"
      stroke-width="2"
    ></line>
    <line
      x1="23.7071"
      y1="14.7071"
      x2="16.7071"
      y2="21.7071"
      stroke="#9EA3A8"
      stroke-width="2"
    ></line>
  </svg>
);
const EditButton = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15 5.9997L18 8.9997M13 19.9997H21M5 15.9997L4 19.9997L8 18.9997L19.586 7.4137C19.9609 7.03864 20.1716 6.53003 20.1716 5.9997C20.1716 5.46937 19.9609 4.96075 19.586 4.5857L19.414 4.4137C19.0389 4.03876 18.5303 3.82812 18 3.82812C17.4697 3.82813 16.9611 4.03876 16.586 4.4137L5 15.9997Z"
      stroke="#45B0E6"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const IntegrationButton = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15 9V5C15 3.89543 14.1046 3 13 3H5C3.89543 3 3 3.89543 3 5V13C3 14.1046 3.89543 15 5 15H9M12 15H13C14.1046 15 15 14.1046 15 13V12"
      stroke="#45B0E6"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M12 9H11C9.89543 9 9 9.89543 9 11V12M15 9H19C20.1046 9 21 9.89543 21 11V19C21 20.1046 20.1046 21 19 21H11C9.89543 21 9 20.1046 9 19V18V15"
      stroke="#45B0E6"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const Triangle = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M5 8L19 8L12 16L5 8Z" fill="#45B0E6" />
  </svg>
);

const Cross = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19.0006 5L5 19.0001M19.0006 19.0001L5.00037 5"
      stroke="#45B0E6"
      stroke-width="2"
      stroke-linecap="round"
    />
  </svg>
);

//Статусы задач
const StatusQueue = (
  <svg
    width="17"
    height="16"
    viewBox="0 0 17 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="8.33398" cy="8" r="8" fill="#AFDF0A" />
  </svg>
);

const StatusAtWork = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="8" cy="8" r="8" fill="#3F51B5" />
  </svg>
);

const StatusControl = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="8" cy="8" r="8" fill="#00B862" />
  </svg>
);
const StatusPostpone = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="8" cy="8" r="8" fill="#647C8A" />
  </svg>
);
const StatusComplete = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="8" cy="8" r="8" fill="#2196F3" />
  </svg>
);

//Статусы согласований
const StatusProcessing = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M3 20C3 19.4477 3.44772 19 4 19H20C20.5523 19 21 19.4477 21 20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20Z"
      fill="#3F51B5"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M12.7087 2.90722C13.29 2.32633 14.0782 2 14.9 2C15.7222 2 16.5107 2.32662 17.0921 2.908C17.6735 3.48938 18.0001 4.27791 18.0001 5.10011C18.0001 5.92192 17.6738 6.7101 17.0929 7.2914C17.0926 7.29167 17.0924 7.29194 17.0921 7.29221L15.8287 8.56017C15.7936 8.61201 15.753 8.66129 15.7071 8.70721C15.6621 8.75226 15.6138 8.79211 15.563 8.82676L8.70837 15.7059C8.52073 15.8943 8.26584 16.0001 8 16.0001H5C4.44772 16.0001 4 15.5524 4 15.0001V12.0001C4 11.7343 4.10585 11.4794 4.29416 11.2917L11.1733 4.43708C11.208 4.38632 11.2478 4.33805 11.2929 4.293C11.3388 4.24708 11.3881 4.20655 11.4399 4.17143L12.7079 2.908C12.7082 2.90774 12.7084 2.90748 12.7087 2.90722ZM12.0112 6.42556L6 12.4154V14.0001H7.58474L13.5745 7.98887L12.0112 6.42556ZM14.9862 6.57213L13.428 5.01387L14.1221 4.32221C14.3284 4.1159 14.6082 4 14.9 4C15.1918 4 15.4716 4.1159 15.6779 4.32221C15.8842 4.52852 16.0001 4.80834 16.0001 5.10011C16.0001 5.39187 15.8842 5.67169 15.6779 5.878L14.9862 6.57213Z"
      fill="#3F51B5"
    />
  </svg>
);
const StatusFinished = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M20.4571 6.04289C20.8476 6.43342 20.8476 7.06658 20.4571 7.45711L9.70711 18.2071C9.31658 18.5976 8.68342 18.5976 8.29289 18.2071L4.29289 14.2071C3.90237 13.8166 3.90237 13.1834 4.29289 12.7929C4.68342 12.4024 5.31658 12.4024 5.70711 12.7929L9 16.0858L19.0429 6.04289C19.4334 5.65237 20.0666 5.65237 20.4571 6.04289Z"
      fill="#00B862"
    />
  </svg>
);

const StatusFinishedSend = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.8713 14.0429L17.4571 7.45711C17.8476 7.06658 17.8476 6.43342 17.4571 6.04289C17.0666 5.65237 16.4334 5.65237 16.0429 6.04289L9.45711 12.6287L10.8713 14.0429Z"
      fill="#00B862"
    />
    <path
      d="M8.04289 16.8713L6.62868 15.4571L6 16.0858L2.70711 12.7929C2.31658 12.4024 1.68342 12.4024 1.29289 12.7929C0.902369 13.1834 0.902369 13.8166 1.29289 14.2071L5.29289 18.2071C5.68342 18.5976 6.31658 18.5976 6.70711 18.2071L8.04289 16.8713Z"
      fill="#00B862"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M22.9571 6.04289C23.3476 6.43342 23.3476 7.06658 22.9571 7.45711L12.2071 18.2071C11.8166 18.5976 11.1834 18.5976 10.7929 18.2071L6.79289 14.2071C6.40237 13.8166 6.40237 13.1834 6.79289 12.7929C7.18342 12.4024 7.81658 12.4024 8.20711 12.7929L11.5 16.0858L21.5429 6.04289C21.9334 5.65237 22.5666 5.65237 22.9571 6.04289Z"
      fill="#00B862"
    />
  </svg>
);

const StatusCancelled = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M7.15079 4.75927C7.57012 4.39985 7.61868 3.76855 7.25926 3.34923C6.89984 2.9299 6.26854 2.88134 5.84921 3.24076L2.35571 6.23519C2.13818 6.41863 2 6.69318 2 7C2 7.25141 2.09278 7.48116 2.24597 7.65686C2.26098 7.67409 2.27663 7.69086 2.29289 7.70713L5.79289 11.2071C6.18342 11.5976 6.81658 11.5976 7.20711 11.2071C7.59763 10.8166 7.59763 10.1834 7.20711 9.79291L5.4142 8H14.497C17.4014 8 19.8827 10.3857 19.9958 13.2889L19.9958 13.289C20.1156 16.3554 17.5674 19 14.497 19H5.999C5.44672 19 4.999 19.4477 4.999 20C4.999 20.5523 5.44672 21 5.999 21H14.497C18.6996 21 22.1584 17.4146 21.9942 13.2111C21.8393 9.23427 18.4756 6 14.497 6H5.70328L7.15079 4.75927ZM21.9942 13.2111L21.9942 13.211L20.995 13.25L21.9942 13.2111Z"
      fill="#FF4545"
    />
  </svg>
);

export default {
  /** Кнопка назад */
  ReturnButton,
  /** Кнопка редактировать */
  EditButton,
  /**Интеграция */
  IntegrationButton,
  /** Кнопка раскрытия списка */
  Triangle,
  Cross,
  /** Статусы Задач */
  StatusAtWork,
  StatusQueue,
  StatusControl,
  StatusPostpone,
  StatusComplete,
  /** Статусы Согласований */
  StatusProcessing,
  StatusFinished,
  StatusFinishedSend,
  StatusCancelled,
};
