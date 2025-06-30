/** Атрибуты функции получения разметки деталей строки списка */
export interface getDetailsLayoutAttributes {
  /** Сокращенные данные строки */
  rowData: any;
  /** Обработчик нажатия на строку */
  onClickRowHandler: any;
  /** Перезагрузка списка */
  reloadData: () => void;
}

/** Данные сортировки */
export class SortData {
  /** Код колонки списка */
  code: string;
  /** Флажок по возрастанию */
  isAscending: boolean;

  constructor({ code, isAscending }: { code?: string; isAscending?: boolean }) {
    this.code = code ?? "";
    this.isAscending = isAscending ?? true;
  }
}

/** Данные столбца таблицы */
export class ListColumnData {
  /** Коэффициент соотношения ширины столбца */
  fr: number;
  /** Можно ли по этому столбцу сортировать */
  isSortable: boolean;
  /** Хранит ли по столбец ссылки */
  isLink: boolean;
  /** Название столбца */
  name: string;
  /** Код значения */
  code: string;
  /** Обработчик нажатия */
  onClick?: (props: ItemData) => any;
  /** Хранит ли по столбец иконку */
  isIcon?: boolean;
  /** Фиксированная ширина столбца */
  fixedWidth: string;

  constructor({
    name,
    code,
    fr,
    isSortable,
    isLink,
    onClick,
    isIcon,
    fixedWidth,
  }: {
    name: string;
    code: string;
    fr?: number;
    isSortable?: boolean;
    isLink?: boolean;
    onClick?: (props: any) => any;
    isIcon?: boolean;
    fixedWidth?: string;
  }) {
    this.fr = fr ?? 1;
    this.isSortable = isSortable ?? false;
    this.isLink = isLink ?? false;
    this.isIcon = isIcon ?? false;

    if (onClick) this.onClick = onClick;

    if (fixedWidth) this.fixedWidth = fixedWidth;
    this.name = name;
    this.code = code;
  }
}

/** Значение колонки */
export class ItemData<InfoType = string> {
  /** Значение */
  value: string;
  /** Дополнительная информация */
  info?: InfoType;

  constructor({ value, info }: { value?: string; info?: InfoType }) {
    this.value = value ?? "";
    if (info) this.info = info;
  }
}

/** Строковое значение колонки */
export class ItemDataString extends ItemData<undefined> {
  constructor(value: string) {
    super({ value: value });
  }
}

/** Значение элемента списка */
export interface FetchItem<DataType = any> {
  /** Идентификатор элемента */
  id: string;
  /** Данные элемента */
  data: DataType;
}

/** Ответ запроса данных с сервера */
export interface FetchData<DataType> {
  /** Данные */
  items: FetchItem<DataType>[];
  /** Доступны ли еще данные для подгрузки? */
  hasMore: boolean;
}
