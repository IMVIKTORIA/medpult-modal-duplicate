import React, { useEffect, useRef, useState } from "react";
import CustomListColumn from "./CustomListHeaderColumn/CustomListHeaderColumn";
import Loader from "../Loader/Loader";
import CustomListRow from "./CustomListRow/CustomListRow";
import {
  FetchData,
  FetchItem,
  ListColumnData,
  SortData,
  getDetailsLayoutAttributes,
} from "./CustomListTypes";
import CustomListSelector from "./CustomListSelector/CustomListSelector";

type ListProps<SearchDataType = any, ItemType = any> = {
  /** Основные настройки */
  /** Настройки отображения колонок */
  columnsSettings: ListColumnData[];
  /** Получение данных */
  getDataHandler: (
    page: number,
    sortData?: SortData,
    searchData?: SearchDataType
  ) => Promise<FetchData<ItemType>>;
  /** Есть прокрутка? */
  isScrollable?: boolean;
  /** Высота */
  height?: string;
  /** Ширина списка в пикселях */
  listWidth?: number;

  /** Настройки поиска */
  /** Данные поиска */
  searchData?: SearchDataType;
  /** Установка обработчика нажатия на поиск */
  setSearchHandler?: (callback: () => void) => void;

  /** Получение формы детальной информации по вкладке */
  getDetailsLayout?: ({
    rowData,
    onClickRowHandler,
  }: getDetailsLayoutAttributes) => any;

  /** Возможность выбора строки */
  isSelectable?: boolean;
  /** Множественный выбор строк */
  isMultipleSelect?: boolean;
  /** Присвоить выбранные строки */
  selectedItems?: string[];
  /** Присвоить выбранные строки */
  setSelectedItems?: (ids: string[]) => void;
};

/** Список данных в виде таблицы */
function CustomList<SearchDataType = any, ItemType = any>(
  props: ListProps<SearchDataType, ItemType>
) {
  const {
    height = "100%",
    listWidth,
    columnsSettings,
    getDataHandler,
    searchData,
    setSearchHandler,
    isScrollable = true,
    getDetailsLayout,
    isMultipleSelect,
    isSelectable,
    selectedItems = [],
    setSelectedItems,
  } = props;

  // Страница
  const [page, setPage] = useState<number>(0);
  // Показать лоадер
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // Параметр остановки подгрузки элементов
  const [hasMore, setHasMore] = useState<boolean>(true);
  // Данные сортировки
  const [sortData, setSortData] = useState<SortData>();
  // Элементы списка
  const [items, setItems] = useState<FetchItem<ItemType>[]>([]);
  // Индекс раскрытой строки
  const [openRowIndex, setOpenRowIndex] = useState<string>();
  // Ссылка на тело списка
  const bodyRef = useRef<HTMLDivElement>(null);
  // Ссылка на шапку списка
  const headerRef = useRef<HTMLDivElement>(null);

  const reloadData = () => {
    setIsLoading(false);
    setItems([]);
    setPage(0);
    setHasMore(true);
    loadData([], 0, true);
  };

  /** Обработка скролла по горизонтали */
  useEffect(() => {
    // Обработка скролла
    const handleScroll = () => {
      if (!bodyRef.current) return;
      if (!headerRef.current) return;

      // Синхронизация скролла шапки и тела
      headerRef.current.scrollLeft = bodyRef.current.scrollLeft;
    };

    bodyRef.current?.addEventListener("scroll", handleScroll);

    return () => bodyRef.current?.removeEventListener("scroll", handleScroll);
  }, []);

  /** Загрузка данных списка */
  const loadData = async (
    existingItems: FetchItem<ItemType>[] = [],
    pageNum: number = 0,
    more: boolean = true
  ) => {
    if (isLoading || !more) return;
    setIsLoading(true);

    const fetched = await getDataHandler(pageNum, sortData);
    const query = (searchData as string)?.toLowerCase().trim();

    const filteredItems = query
      ? fetched.items.filter((item) => {
          const data = item.data as any;
          const values = [
            data.fullname?.value,
            data.phone?.value,
            data.email?.value,
          ]
            .filter(Boolean)
            .map((s: string) => s.toLowerCase());

          // Разбиваем запрос на отдельные слова
          const queryParts = query.split(" ").filter(Boolean);

          // Проверяем, что для каждого слова есть совпадение хотя бы в одном из полей
          return queryParts.every((part) =>
            values.some((v) => v.includes(part))
          );
        })
      : fetched.items;

    setHasMore(filteredItems.length > 0);
    setItems([...existingItems, ...filteredItems]);
    setPage(pageNum + 1);
    setIsLoading(false);
  };

  useEffect(() => {
    reloadData();
  }, [searchData]);

  /** Обработчик скролла по вертикали */
  const onScroll = () => {
    const body = bodyRef.current!;
    const height = body.scrollHeight - body.offsetHeight;
    const scrollPosition = body.scrollTop;

    if ((height - scrollPosition) / height < 0.05 && !isLoading) {
      loadData(items, page, hasMore);
    }
  };

  /** Установить обработчик нажатия на кнопку поиск */
  useEffect(() => {
    if (!setSearchHandler) return;
    setSearchHandler(() => {
      reloadData();
    });
  }, [searchData, sortData]);

  /** Обновление оглавления при изменении сортировки */
  useEffect(() => {
    reloadData();
  }, [sortData]);

  /** Нажатие на сортировку */
  const handleSortClick = (sortDataNew: SortData | undefined) => {
    setSortData(sortDataNew);
  };

  /** Получение ширины скроллбара */
  const getScrollbarWidth = (ref: React.RefObject<HTMLDivElement>) => {
    const element = ref.current;
    if (!element) return 0;

    return element.offsetWidth - element.clientWidth;
  };

  const setCheckedRowsIds = (ids: string[]) => {
    if (setSelectedItems) setSelectedItems(ids);
  };

  /** Добавление/удаление выбранной строки */
  const toggleCheckedRow = (id: string) => {
    const findId = selectedItems.find((checkedId) => checkedId === id);

    // Удаление
    if (findId) {
      setCheckedRowsIds(selectedItems.filter((checkedId) => checkedId != id));
      return;
    }

    // Добавление
    if (isMultipleSelect) {
      setCheckedRowsIds([...selectedItems, id]);
    } else {
      setCheckedRowsIds([id]);
    }
  };

  const headerStyles: React.CSSProperties = {};
  if (listWidth)
    headerStyles.width = `${listWidth - getScrollbarWidth(headerRef)}px`;
  if (!isSelectable) headerStyles.paddingLeft = `20px`;

  return (
    <div className="custom-list">
      <div
        className={
          isScrollable
            ? "custom-list__header custom-list__header_scrollable"
            : "custom-list__header"
        }
        ref={headerRef}
      >
        <div style={headerStyles}>
          {/* TODO: Выбор всех */}
          {isSelectable && (
            <div
              style={
                !isMultipleSelect
                  ? { visibility: "hidden" }
                  : { visibility: "hidden" }
              }
            >
              <CustomListSelector
                onClickSelector={() => {}}
                isChecked={false}
              />
            </div>
          )}
          {columnsSettings.map((columnSettings) => (
            <CustomListColumn
              sortData={sortData}
              handleSortClick={handleSortClick}
              {...columnSettings}
            />
          ))}
        </div>
      </div>
      <div
        className={
          isScrollable ? "custom-list__body_scrollable" : "custom-list__body"
        }
        style={{ height: height }}
        ref={bodyRef}
        onScroll={onScroll}
      >
        <div
          className="custom-list__body-wrapper"
          style={
            listWidth
              ? { width: `${listWidth - getScrollbarWidth(bodyRef)}px` }
              : {}
          }
        >
          {items.map((item) => {
            /** Обработчик нажатия на строку */
            const toggleShowDetails = () => {
              if (item.id === undefined) return;

              if (item.id === openRowIndex) {
                setOpenRowIndex(undefined);
                return;
              }

              setOpenRowIndex(item.id);
            };

            return (
              <CustomListRow<ItemType>
                {...props}
                key={item.id}
                data={item.data}
                isShowDetails={getDetailsLayout && item.id === openRowIndex}
                setOpenRowIndex={toggleShowDetails}
                reloadData={reloadData}
                toggleChecked={() => toggleCheckedRow(item.id)}
                isChecked={Boolean(
                  selectedItems.find((checkedId) => checkedId === item.id)
                )}
              />
            );
          })}
          {isLoading && <Loader />}
        </div>
      </div>
    </div>
  );
}

export default CustomList;
