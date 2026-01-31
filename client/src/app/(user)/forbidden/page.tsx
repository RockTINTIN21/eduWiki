"use client";

import {Button} from "@/components/ui/button";

const ForbiddenPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-6">
          <span className="inline-block rounded-full bg-red-100 px-4 py-1 text-sm font-medium text-red-600">
            Ошибка 403
          </span>
        </div>

        <h1 className="text-3xl font-semibold text-foreground">
          Доступ запрещён
        </h1>

        <p className="mt-4 text-muted-foreground">
          У вас нет прав для просмотра этой страницы.
          <br />
          Если вы считаете, что это ошибка — обратитесь к администратору.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            type="button"
            onClick={() => history.back()}
            className="px-8"
          >
            Назад
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ForbiddenPage;