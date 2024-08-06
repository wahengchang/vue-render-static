// src/utils/LocalStorageService.js
export class LocalStorageService {
  static fetchAll(entity) {
    return JSON.parse(localStorage.getItem(entity)) || [];
  }

  static save(entity, data) {
    localStorage.setItem(entity, JSON.stringify(data));
  }

  static findById(entity, id) {
    const records = this.fetchAll(entity);
    return records.find(record => record.id === id);
  }

  static create(entity, record) {
    const records = this.fetchAll(entity);
    record.id = Date.now();
    record.createdAt = new Date().toISOString();
    records.push(record);
    this.save(entity, records);
  }

  static update(entity, id, updates) {
    const records = this.fetchAll(entity);
    const index = records.findIndex(record => record.id === id);
    if (index !== -1) {
      records[index] = {...records[index], ...updates};
      this.save(entity, records);
    }
  }

  static delete(entity, id) {
    let records = this.fetchAll(entity);
    records = records.filter(record => record.id !== id);
    this.save(entity, records);
  }
}

