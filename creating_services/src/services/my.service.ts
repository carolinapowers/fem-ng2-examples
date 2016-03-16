export class MyService {
  private items: Array<{ name: String, description: String}> = [
    { name: 'Item 1', description: 'Epic item!' },
    { name: 'Item 2', description: 'As great as the first!' },
    { name: 'Last One', description: 'A round of applause for this one' }
  ];
  
  getItems() {
    return this.items;
  }
}