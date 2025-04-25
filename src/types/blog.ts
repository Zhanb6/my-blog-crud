// src/types/blog.ts
export interface Blog {
    id: string;      // уникальный идентификатор
    title: string;   // заголовок записи
    text: string;    // содержимое
    deleted: boolean;// флаг «удалено»
  }
  