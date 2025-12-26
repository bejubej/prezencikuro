// /data/filesystemData.js

export const FILESYSTEM = {
  type: "folder",
  name: "ROOT",
  children: [
    /* ===== DESKTOP ===== */
    {
      type: "desktop",
      name: "Pulpit",
      children: [
        {
          type: "txt",
          name: "Akta_sprawy.txt",
          readOnly: true,
          content: `OFICJALNY RAPORT

Brak śladów włamania.
Sprawa zamknięta decyzją prokuratury.

[fragmenty zaczernione]`
        },

        {
          type: "app",
          app: "mail",
          name: "Poczta"
        },

        {
          type: "app",
          app: "browser",
          name: "Internet"
        },

        {
          type: "app",
          app: "snake",
          name: "Snake.exe"
        },

        {
          type: "folder",
          name: "Nagrania",
          children: [
            {
              type: "mp3",
              name: "nagranie_01.mp3",
              youtube: "https://www.youtube.com/watch?v=noAGH7a8UtE"
            },
            {
              type: "mp3",
              name: "nagranie_02.mp3",
              youtube: "https://www.youtube.com/watch?v=YYYYYYYY"
            }
          ]
        },

        {
          type: "folder",
          name: "Zdjęcia",
          children: [
            {
              type: "image",
              name: "parking_1998.jpg",
              src: "assets/images/parking_1998.jpg"
            },
            {
              type: "image",
              name: "magazyn_noc.jpg",
              src: "assets/images/magazyn_noc.jpg"
            }
          ]
        },

        {
          type: "folder",
          name: "Dokumenty",
          children: [
            {
              type: "txt",
              name: "Notatka_1.txt",
              readOnly: true,
              content: `Nie ufaj aktom.
Ktoś pilnuje, żeby prawda nie wyszła.`
            },
            {
              type: "txt",
              name: "Notatka_2.txt",
              readOnly: true,
              content: `Jeśli to czytasz, znaczy że on nie żyje.`
            }
          ]
        },

        {
          type: "folder",
          name: "Archiwum",
          children: [
            {
              type: "txt",
              name: "stary_raport.txt",
              readOnly: true,
              content: `Raport wewnętrzny.
Sprawa nigdy nie powinna ujrzeć światła dziennego.`
            }
          ]
        },

        {
          type: "trash",
          name: "Kosz",
          items: []
        }
      ]
    }
  ]
};
