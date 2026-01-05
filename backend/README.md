# EduWiki Backend

## Стек технологий

* **Nest.js** — серверная часть
* **Prisma ORM** — работа с базой данных
* **PostgreSQL** — реляционная база данных

## Установка и запуск

1. Установить зависимости:

```bash
npm install
```

2. Запустить сервер разработки:

```bash
npm run start:dev
```

## 🗄 Работа с базой данных

* Настроить подключение к PostgreSQL в `.env`
* Применить миграции:

```bash
npx prisma migrate dev
```


## 📚 Документация

* [Prisma ORM](https://www.prisma.io/docs/)
* [Nest.js](https://docs.nestjs.com/)
