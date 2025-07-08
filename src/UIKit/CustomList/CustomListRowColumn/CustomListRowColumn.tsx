import React from "react";
import { MyItemData, ListColumnData } from "../CustomListTypes";
import icons from "../../../App/shared/icons";
import {
  getStatusRequestColor,
  getStatusTaskIcon,
  getStatusApprovalIcon,
} from "../../../App/shared/utils/utils";

interface ListColumnProps extends ListColumnData {
  data: MyItemData<any>;
  isShowDetails?: boolean;
}

/** Столбец одной строки таблицы */
function CustomListRowColumn(props: ListColumnProps) {
  const { fr, data, isLink, onClick, code, isIcon, fixedWidth, isShowDetails } =
    props;

  const onClickColumn =
    isLink && onClick
      ? (ev: any) => {
          ev.stopPropagation();
          onClick(data);
        }
      : () => {};

  function getStatusContragentColor(info: string) {
    switch (info) {
      case "Gold":
        return "#DBB900";
      case "Silver":
        return "#9A9A9A";
      case "Platinum":
        return "#665A44";
      default:
    }
  }

  const statusContragentColor =
    code === "statusContragent"
      ? getStatusContragentColor(data?.info)
      : undefined;

  const integrationIcon =
    code === "isIntegration" && data?.info === true
      ? icons.IntegrationButton
      : null;

  const statusRequestColor =
    code === "statusRequest" ? getStatusRequestColor(data?.info) : undefined;

  const statusTaskIcon =
    code === "statusTask" ? getStatusTaskIcon(data?.info) : undefined;

  const statusApprovalIcon =
    code === "statusApproval" ? getStatusApprovalIcon(data?.info) : undefined;

  const openButton =
    code === "isOpen" ? (
      <span
        style={{
          display: "inline-block",
          transform: isShowDetails ? "rotate(180deg)" : "rotate(0deg)",
        }}
      >
        {icons.Triangle}
      </span>
    ) : null;

  //Функция форматирования телефона
  function formatPhone(phone: string | undefined) {
    if (!phone) return "";
    let digits = phone.replace(/\D/g, "");
    // Если номер начинается с 8
    if (digits.length === 11 && digits.startsWith("8")) {
      digits = "7" + digits.slice(1);
    }
    if (digits.length === 11 && digits.startsWith("7")) {
      return `+7 ${digits.slice(1, 4)} ${digits.slice(4, 7)} ${digits.slice(
        7,
        9
      )} ${digits.slice(9, 11)}`;
    }
    if (digits.length === 10) {
      return `+7 ${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(
        6,
        8
      )} ${digits.slice(8, 10)}`;
    }
    return phone;
  }

  const preLineFields = ["policy", "policyStartDate", "policyEndDate"];

  return (
    <div
      className={
        isLink
          ? "custom-list-row-column custom-list-row-column__link"
          : "custom-list-row-column"
      }
      style={{ ...(fixedWidth ? { width: fixedWidth } : { flex: fr }) }}
    >
      <span
        title={data?.value}
        onClick={onClickColumn}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "4px",
          maxWidth: "100%",
          color: statusContragentColor,
          ...(code === "statusRequest" && {
            backgroundColor: statusRequestColor,
            padding: "3px 16px",
            borderRadius: "12px",
          }),
        }}
      >
        {(isIcon && statusTaskIcon) ||
          (isIcon && integrationIcon) ||
          (isIcon && statusApprovalIcon) ||
          (isIcon && openButton)}
        <span
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: preLineFields.includes(code) ? "pre-line" : "nowrap",
          }}
        >
          {code === "phone" ? formatPhone(data?.value) : data?.value}
        </span>
      </span>
    </div>
  );
}

export default CustomListRowColumn;
