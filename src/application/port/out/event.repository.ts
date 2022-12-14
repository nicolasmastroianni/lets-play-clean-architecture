export interface EventRepository {
    create(object: any) : Promise<void>
    update(object: any) : Promise<void>
    delete(object: any) : Promise<void>
  }