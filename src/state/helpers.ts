export type ModelEntity = { id: string };

export type ItemUpdater<T> = (item: T) => T;

export const createModelListUpdater =
  <T extends ModelEntity>() =>
  (itemId: string, itemList: T[], itemUpdater: ItemUpdater<T> | Partial<T>) =>
    itemList.map((item) =>
      item.id === itemId
        ? typeof itemUpdater === "object"
          ? { ...item, ...itemUpdater }
          : { ...itemUpdater(item) }
        : item
    );
