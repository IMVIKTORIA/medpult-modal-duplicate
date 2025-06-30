import React from "react";
import { ItemData, ListColumnData } from "../CustomListTypes";
import icons from "../../../App/shared/icons";

interface ListColumnProps extends ListColumnData {
  data: ItemData<any>;
  isShowDetails?: boolean;
}

/** Столбец одной строки таблицы */
function CustomListRowColumn(props: ListColumnProps) {
  const { fr, data, isLink, onClick, code, isIcon, fixedWidth, isShowDetails } =
    props;

  const onClickColumn =
    isLink && onClick
      ? () => {
          onClick(data);
        }
      : () => {};

  const integrationIcon =
    code === "isIntegration" && data?.info ? icons.IntegrationButton : null;

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

  function getStatusRequestColor(info: string) {
    switch (info) {
      case "vrabote":
        return "#C5CBE9";
      case "returned":
        return "#F5ECB6";
      default:
    }
  }
  const statusRequestColor =
    code === "statusRequest" ? getStatusRequestColor(data?.info) : undefined;

  function getStatusTaskIcon(code: string) {
    if (code === "atWork") {
      return icons.StatusAtWork;
    }
    if (code === "queue") {
      return icons.StatusQueue;
    }
  }
  const statusTaskIcon =
    code === "statusTask" ? getStatusTaskIcon(data?.info) : undefined;

  function getStatusApprovalIcon(code: string) {
    if (code === "finished") {
      return icons.StatusFinished;
    }
    if (code === "queue") {
      return icons.StatusQueue;
    }
  }
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
            whiteSpace: "nowrap",
          }}
        >
          {data?.value}
        </span>
      </span>
    </div>
  );
}

export default CustomListRowColumn;
