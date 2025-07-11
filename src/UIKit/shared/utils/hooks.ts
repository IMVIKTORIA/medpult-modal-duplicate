import { useEffect, useState } from 'react'

export default function useDebounce<ValueType = any>(value: ValueType, delay: number): ValueType {
	// Состояние и сеттер для отложенного значения
	const [debouncedValue, setDebouncedValue] = useState(value)

	useEffect(
		() => {
			// Выставить debouncedValue равным value (переданное значение)
			// после заданной задержки
			const handler = setTimeout(() => {
				setDebouncedValue(value)
			}, delay)

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
				clearTimeout(handler)
			}
		},
		// Вызывается снова, только если значение изменится
		// мы так же можем добавить переменную "delay" в массива зависимостей ...
		// ... если вы собираетесь менять ее динамически.
		[value]
	)

	return debouncedValue
}

export function useWindowSizeAndZoom() {
  const [windowInfo, setWindowInfo] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    zoom: window.innerWidth / window.outerWidth,
  });

  useEffect(() => {
    const updateWindowInfo = () => {
      setWindowInfo({
        width: window.innerWidth,
        height: window.innerHeight,
        zoom: window.innerWidth / window.outerWidth,
      });
    };

    // Обработчик изменения размера окна
    window.addEventListener('resize', updateWindowInfo);

    // Таймер для отслеживания масштабирования (например, Ctrl + колесо)
    let previousWidth = window.innerWidth;
    const intervalId = setInterval(() => {
      if (window.innerWidth !== previousWidth) {
        previousWidth = window.innerWidth;
        updateWindowInfo();
      }
    }, 300);

    // Очистка при размонтировании
    return () => {
      window.removeEventListener('resize', updateWindowInfo);
      clearInterval(intervalId);
    };
  }, []);

  return windowInfo;
}