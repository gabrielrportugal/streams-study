import fs from 'node:fs/promises';

// import.meta.url -> current way to access file path

const databasePath = new URL('../db.json', import.meta.url)

export class Database {
// The '#' means that this property is private
  #database = {};

  constructor() {
    // Read data from json or create the file if not exists
    fs.readFile(databasePath, 'utf-8')
      .then(data => {
        this.#database = JSON.parse(data);
      })
      .catch(() => {
        this.#persist();
      })
  }

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database))
  }

  select(table) {
    return this.#database[table] ?? [];
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data);
    } else {
      this.#database[table] = [data];
    }

    this.#persist();

    return data;
  }
}