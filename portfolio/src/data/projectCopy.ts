import type { Locale, Project } from '../types';

type Copy = Pick<Project, 'role' | 'summary' | 'status' | 'context' | 'decisions' | 'contribution' | 'evidence' | 'architecture' | 'outcomes' | 'limitations'>;
const ru: Record<string, Copy> = {
  datavac: {
    role: 'Frontend-разработка · интеграция API · продуктовые сценарии',
    summary: 'Информационный сервис о вакцинах: каталоги на реальных данных, поиск, подробные страницы, платежный сценарий и генерация PDF-инструкций.',
    status: 'Командный продукт · frontend-вклад',
    context: "Командный справочный сервис о вакцинах. Next.js frontend получает через REST каталоги, страницы вакцин, checkout-данные и материалы PDF.",
    decisions: ['Перевести каталоги с mock-данных на реальные API-запросы и явно сопоставлять UI-фильтры и сортировку с параметрами backend.', 'Использовать TypeScript-модели и mapper-функции, отделяя форму API-ответа от данных, необходимых интерфейсу.', 'Сохранять состояние поиска и фильтров в URL/search params и предусмотреть loading, empty и error states.', 'Рассматривать оплату и PDF как законченные пользовательские сценарии: валидация и ошибки платежа; QR-коды и кириллические шрифты в PDF.'],
    contribution: "Frontend-страницы и компоненты, адаптивный UI, REST, каталоги, поиск, страницы вакцин, CloudPayments и PDF. Это вклад в командный продукт, не единоличная разработка сервиса.",
    evidence: [
      "Описание вклада: projects/datavac-frontend/README.md",
      "Командный frontend: DataVac-masterskaya/data-vac-frontend",
      "Документированы vaccines API, CloudPayments и PDF/QR."
    ],
    architecture: [
      "Next.js App Router / React: страницы и UI.",
      "Типизированные модели и mapper-функции адаптируют REST-ответы.",
      "REST /api/v1 отдаёт каталоги; URL хранит фильтры.",
      "CloudPayments checkout и генерация PDF — отдельные интеграции."
    ],
    outcomes: ['Каталоги переведены с mock-данных на реальные данные backend', 'Поиск, фильтрация, сортировка и страницы вакцин связаны с API', 'Платежный интерфейс включает выбор суммы и регулярности, валидацию и состояния успеха/ошибки', 'PDF-инструкции формируются на основе данных вакцины, с QR-кодами и поддержкой кириллицы'],
    limitations: [
      "Это командный продукт: кейс описывает frontend-вклад, а не единоличное владение всем сервисом.",
      "В доступных материалах нет независимо подтверждённых метрик использования, выручки или клинических результатов."
    ]
  },
  'nomad-quiet-kyoto': {
    role: 'Архитектура продукта · структура frontend и backend',
    summary: 'Модульное travel-приложение о Киото с доменами мест, еды и поездок, клиентской маршрутизацией и отдельным API.',
    status: 'Модульное приложение · активная кодовая база',
    context: "Travel-приложение о Киото: frontend с route registry и отдельный backend со сценариями поездок и repository contracts.",
    decisions: ['Оставить рендеринг страниц и навигацию в единой оболочке приложения и реестре маршрутов.', 'Отделить frontend API transport и browser persistence adapters от компонентов страниц.', 'Сделать HTTP-маршруты backend тонкими; вынести сценарии поездок в application services, а хранение — за repository contracts.', 'Использовать JSON-file repository для локального хранения и in-memory repository для изолированных тестов.'],
    contribution: "В репозитории есть модульный frontend/backend, архитектурная документация, тесты и browser QA. Бизнес-результаты не додумываются.",
    evidence: [
      "README описывает runtime и зависимости.",
      "backend/src содержит api, application, domain и infrastructure.",
      "Описаны JSON-file/in-memory repositories и unit, backend, Playwright E2E."
    ],
    architecture: [
      "Frontend shell → route registry → pages.",
      "Place, Food и Trip отделены от UI.",
      "HTTP client и browser-storage adapter изолируют I/O.",
      "Backend transport → Trip service → repository; JSON-file и in-memory adapters."
    ],
    outcomes: ['Маршрутизация frontend, доменные сущности и shared adapters имеют явные границы', 'Логика поездок backend отделена от HTTP transport и реализации хранения', 'Хранилище можно заменить за repository boundary без изменения HTTP-контракта', 'В README описаны E2E-сценарии навигации, detail pages, add/remove и API synchronization'],
    limitations: [
      "В документации описаны JSON-file и in-memory repositories; использование управляемой production-БД не подтверждено.",
      "Метрики production-масштаба, доступности и пользовательской аудитории не заявляются."
    ]
  },
  momoha: {
    role: 'Frontend-опыт · API-сценарий · настройка поставки',
    summary: 'Сайт японского стритфуда с меню, корзиной из нескольких товаров и API для отправки заказа.',
    status: 'Frontend и лёгкий API',
    context: "Статический frontend японского стритфуда и Node API. Поток: меню → корзина → контакты → POST /api/orders → подтверждение.",
    decisions: ['Сохранить возможность статической публикации frontend и определить ясную API-границу для отправки заказа.', 'Хранить записи заказов через атомарную запись JSON-файла и ограничить хранилище 500 записями.', 'Оставить административный endpoint заказов внутренним и зафиксировать требование авторизации до публичного использования.', 'Настроить точный CORS origin и описать ограничения хранения в JSON-файле.'],
    contribution: "В репозитории есть статический UI, лёгкий API, Dockerfile, deployment blueprint, API tests и CI checks.",
    evidence: [
      "suwenku/README.md описывает экраны, API и deployment.",
      "Endpoints: GET /api/health, GET /api/menu, GET /api/orders, POST /api/orders.",
      "Документированы atomic JSON writes, лимит 500 и CI API checks."
    ],
    architecture: [
      "Static frontend: меню и корзина.",
      "Checkout отправляет заказ в Node HTTP API.",
      "API валидирует заказ и атомарно сохраняет JSON.",
      "Pages размещает frontend; Docker/Render описывают API; CORS ограничен origin."
    ],
    outcomes: ['Корзина из нескольких товаров и подтверждение заказа связаны с POST /api/orders', 'Через API доступны menu и health endpoints', 'В CI есть unit/integration tests и API smoke/E2E проверки', 'Ограничения production описаны: JSON-хранилище не заменяет PostgreSQL, auth и платежную обработку'],
    limitations: [
      "JSON-хранилище — облегчённый вариант, а не управляемая база данных; документированный лимит — 500 записей.",
      "Перед реальным запуском ресторана документация указывает на необходимость управляемой БД, авторизации, статусов заказов, уведомлений и платежей."
    ]
  },
  '50-projects-lab': {
    role: 'Интерактивный архив · общий runtime · QA',
    summary: 'Самостоятельный архив: 30 браузерных демо и 13 нативных системных проектов на C/C++.',
    status: 'Интерактивная учебная платформа',
    context: "Локальный архив: 30 браузерных демо и 13 нативных проектов C/C++. У демо отдельные URL и общий runtime.",
    decisions: ['Использовать общий локальный runtime для браузерных демо вместо удалённых iframe.', 'Сохранить отдельный публичный URL и index.html для каждой демо-страницы.', 'Разделить браузерные интерактивные проекты и нативные системные реализации C/C++.', 'Проверять архив скриптом: все browser pages должны использовать local runtime и не зависеть от удалённого site script.'],
    contribution: "В репозитории есть каталог, общий browser runtime, 30 демо, интеграция native-проектов и QA scripts.",
    evidence: [
      "README перечисляет 30 browser demos и 13 native projects.",
      "qa/audit-deep.mjs проверяет local runtime и iframe independence.",
      "Live archive: 50-projects-lab.vercel.app."
    ],
    architecture: [
      "Каталог и отдельные index.html страниц.",
      "project-runtime.js обслуживает 30 browser demos.",
      "Browser demos используют локальные ресурсы, без remote iframe.",
      "Native C/C++ находятся в projects/c-cpp; QA проверяет runtime wiring."
    ],
    outcomes: ['30 браузерных проектов используют общий локальный runtime', '13 C/C++ системных проектов организованы отдельно от браузерных демо', 'QA-аудит проверяет подключение runtime и независимость от iframe'],
    limitations: [
      "В README перечислены 30 браузерных демо и 13 нативных проектов C/C++ (всего 43), хотя сохранено название 50 Projects Lab.",
      "Общий browser runtime относится к браузерным демо; нативные проекты C/C++ остаются отдельными реализациями."
    ]
  },
  'furniture-store': {
    role: 'Продуктовый бриф · направление интерфейса · AI-assisted реализация',
    summary: 'Эксперимент с интерфейсом каталога мебели и страницей товара.',
    status: 'Самостоятельный эксперимент',
    context: 'Самостоятельный эксперимент. Требования, направление и структура продукта заданы автором; ИИ использовался как часть процесса реализации.',
    decisions: ['Организовать сценарий вокруг поиска в каталоге и страницы товара.', 'Рассматривать адаптивность как часть интерфейса, а не отдельный этап.', 'Явно обозначать AI-assisted работу и сохранять человеческую проверку результата.'],
    contribution: 'Самостоятельный продуктовый эксперимент, не клиентский заказ и не заявка на командную коммерческую разработку.',
    evidence: ['Публичный репозиторий проекта', 'Иллюстрация и описание из исходного портфолио']
  },
  'web-larek': { role: 'Frontend-практика', summary: 'Учебный e-commerce проект с практикой TypeScript и структуры приложения.', status: 'Учебная работа', context: 'Учебное задание для практики frontend-паттернов. Не представляется как оплачиваемая клиентская работа.', decisions: ['Практиковать типизированные границы приложения.', 'Сохранять классификацию проекта как учебного.'], contribution: 'Индивидуальная учебная реализация.', evidence: ['Публичный репозиторий исходного кода'] },
  'stellar-burger': { role: 'Frontend-практика', summary: 'Учебный проект на React и Redux.', status: 'Учебная работа', context: 'Учебное задание для практики компонентного UI и состояния приложения.', decisions: ['Практиковать повторно используемые React-компоненты.', 'Ограничивать заявления о state management тем, что подтверждается описанием репозитория.'], contribution: 'Индивидуальная учебная реализация.', evidence: ['Публичный репозиторий исходного кода'] },
  mesto: { role: 'Frontend-практика', summary: 'Учебный React-проект с формами и интерактивным контентом.', status: 'Учебная работа', context: 'Учебное задание, демонстрирующее практику React и сценариев работы с формами.', decisions: ['Рассматривать формы как отдельные пользовательские сценарии.', 'Отделять учебные доказательства от коммерческого опыта.'], contribution: 'Индивидуальная учебная реализация.', evidence: ['Публичный репозиторий исходного кода'] },
  'blog-customizer': { role: 'Frontend-практика', summary: 'Упражнение на React и TypeScript с настраиваемыми элементами интерфейса.', status: 'Учебная работа', context: 'Учебное задание для практики типизированного UI-состояния и пользовательских настроек отображения.', decisions: ['Моделировать пользовательский выбор как явное состояние.', 'Делать элементы управления доступными и предсказуемыми.'], contribution: 'Индивидуальная учебная реализация.', evidence: ['Публичный репозиторий исходного кода'] },
  'ono-tebe-nado': { role: 'Frontend-практика', summary: 'Учебный проект на HTML и CSS с фокусом на сетку и адаптивную композицию.', status: 'Учебная работа', context: 'Учебное задание для практики семантической разметки и визуальной сетки.', decisions: ['Использовать семантический HTML.', 'Строить макет на основе согласованной сетки и ритма отступов.'], contribution: 'Индивидуальная учебная реализация.', evidence: ['Публичный репозиторий исходного кода'] }
};
export function localizeProject(project: Project, locale: Locale): Project {
  if (locale === 'en') return project;
  const translated = ru[project.id];
  return translated ? { ...project, ...translated } : project;
}
