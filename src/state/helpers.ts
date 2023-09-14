type AppModel = { id: string };

type ItemUpdater<T> = (phase: T) => T;
export const createModelListUpdater =
  <T extends AppModel>() =>
  (itemId: string, itemList: T[], itemUpdater: ItemUpdater<T> | Partial<T>) =>
    itemList.map((item) =>
      item.id === itemId
        ? typeof itemUpdater === "object"
          ? { ...item, ...itemUpdater }
          : { ...itemUpdater(item) }
        : item
    );
