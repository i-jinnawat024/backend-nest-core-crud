import { Repository, FindOptionsWhere, ObjectLiteral } from "typeorm";
import { IBaseRepository } from "../../domain/interfaces/repositories/base-repository.interface";

export abstract class BaseTypeOrmRepository<
  T extends ObjectLiteral,
  ID = string,
> implements IBaseRepository<T, ID>
{
  constructor(protected readonly repository: Repository<T>) {}

  async findAll(): Promise<T[]> {
    return this.repository.find();
  }

  async findById(id: ID): Promise<T | null> {
    const entity = await this.repository.findOne({
      where: { id } as FindOptionsWhere<T>,
    });
    return entity || null;
  }

  async create(
    entityData: Omit<T, "id" | "createdAt" | "updatedAt">
  ): Promise<T> {
    const entity = this.repository.create(entityData as T);
    return this.repository.save(entity);
  }

  async update(id: ID, entityData: Partial<T>): Promise<T | null> {
    const updateResult = await this.repository.update(
      { id } as FindOptionsWhere<T>,
      entityData as any
    );

    if (updateResult.affected === 0) {
      return null;
    }

    return this.findById(id);
  }

  async delete(id: ID): Promise<boolean> {
    const deleteResult = await this.repository.delete({
      id,
    } as FindOptionsWhere<T>);
    return (
      deleteResult.affected !== null &&
      deleteResult.affected !== undefined &&
      deleteResult.affected > 0
    );
  }

  async exists(id: ID): Promise<boolean> {
    const count = await this.repository.count({
      where: { id } as FindOptionsWhere<T>,
    });
    return count > 0;
  }

  async count(): Promise<number> {
    return this.repository.count();
  }
}

export default BaseTypeOrmRepository;