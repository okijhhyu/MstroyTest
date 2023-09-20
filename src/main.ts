interface Item {
    id: number
    parent: number | string
    type?: string | null
    childrens?: Item[]
}

export class TreeStore {
  private items: Record<string | number, Item> = {};

  constructor(data: Item[]) {
    data.forEach((item) => {
      const id = item.id;
      if (!this.items[id]) {
        this.items[id] = { ...item, childrens: [] };
      } else {
        this.items[id] = { ...this.items[id], ...item };
      }
      

      const parentId = item.parent;
      if (item.parent !== "root") {
        if (!this.items[parentId]) {
            this.items[parentId] = { childrens: [] } as Item;
        }
        this.items[parentId].childrens.push(this.items[id]);
      }
    });
  }
  
  private pruneFields(item: Item): Item {
    return { id: item.id, parent: item.parent, type: item.type };
  }

  getAll(): Item[] {
    return Object.values(this.items).map((item) => {
       return this.pruneFields(item)
    });
  }

  getItem(id: number): Item | null {
    return this.items[id] ? this.pruneFields(this.items[id]) : null;
  }

  getChildren(id: number): Item[] {
    return this.items[id]?.childrens?.map((child: Item) => this.pruneFields(child)) || [];
  }

  getAllChildren(id: string | number): Item[] {
    const result: Item[] = [];
    const stack: (string | number)[] = [id];
    for (let i = 0; i < stack.length; i++) {
        const currentId = stack[i];
        const children = this.items[currentId]?.childrens || [];

        for (const child of children) {
            result.push(this.pruneFields(child));
            stack.push(child.id);
        }
    }
    return result;
  }

  getAllParents(id: string | number): Item[] {
    const result: Item[] = [];
    let currentId = id;

    while (currentId !== undefined) {
      const parent = this.items[currentId]?.parent;
      if (parent && parent !== 'root') {
        result.push(this.pruneFields(this.items[parent]));
        currentId = parent;
      } else {
        break;
      }
    }

    return result;
  }
}

const items = [
  { id: 1, parent: 'root' },
  { id: 2, parent: 1, type: 'test' },
  { id: 3, parent: 1, type: 'test' },
  { id: 4, parent: 2, type: 'test' },
  { id: 5, parent: 2, type: 'test' },
  { id: 6, parent: 2, type: 'test' },
  { id: 7, parent: 4, type: null },
  { id: 8, parent: 4, type: null },
];

const ts = new TreeStore(items);

console.log(ts.getAll());
console.log(ts.getItem(7));
console.log(ts.getChildren(4));
console.log(ts.getChildren(5));
console.log(ts.getChildren(2));
console.log(ts.getAllChildren(2));
console.log(ts.getAllParents(7));
