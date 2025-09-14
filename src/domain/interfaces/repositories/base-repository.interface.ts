export interface IBaseRepository<T, ID = string> {
  findAll(): Promise<T[]>;
  findById(id: ID): Promise<T | null>;
  create(entity: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<T>;
  update(id: ID, entity: Partial<T>): Promise<T | null>;
  delete(id: ID): Promise<boolean>;
  exists(id: ID): Promise<boolean>;
  count(): Promise<number>;
}