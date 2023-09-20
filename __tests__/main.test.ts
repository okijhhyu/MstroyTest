import { TreeStore } from '../src/main.js'; // Путь к вашему классу TreeStore

describe('TreeStore', () => {
  let ts;

  beforeEach(() => {
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

    ts = new TreeStore(items);
  });

  test('getAll', () => {
    const result = ts.getAll();
    expect(result.length).toBe(8);
  });

  test('getItem', () => {
    let item = ts.getItem(7);
    expect(item).toBeDefined();
    expect(item.id).toBe(7);

    item = ts.getItem(32);
    expect(item).toBeDefined();
    expect(item).toBe(null);
  });

  test('getChildren', () => {
    let children = ts.getChildren(4);
    expect(children.length).toBe(2);

    children = ts.getChildren(5);
    expect(children.length).toBe(0);

    children = ts.getChildren(2);
    expect(children.length).toBe(3);

    children = ts.getChildren(23);
    expect(children.length).toBe(0);

    children = ts.getChildren(1);
    expect(children.length).toBe(2);
  });

  test('getAllChildren', () => {
    let children = ts.getAllChildren(2);
    expect(children.length).toBe(5);

    children = ts.getAllChildren(21);
    expect(children.length).toBe(0);
  });


  test('getAllParents', () => {
    let parent = ts.getAllParents(7);
    expect(parent.length).toBe(3);

    parent = ts.getAllParents(21);
    expect(parent.length).toBe(0);
  });

});