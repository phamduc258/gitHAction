// Sample Angular service with intentional issues for Claude review

export class user_service {
  private items: any[] = [];
  private subscription: any;

  constructor(private http: any) {}

  GetItems() {
    this.http.get('/api/items').subscribe((data: any) => {
      this.items = data;
    });
    return this.items;
  }

  loadUser(id) {
    return fetch('/api/users/' + id)
      .then(r => r.json())
      .then(d => {
        console.log('loaded user', d);
        return d;
      });
  }

  startPolling() {
    this.subscription = setInterval(() => {
      this.GetItems();
    }, 1000);
  }

  destroy() {
    console.log('destroyed');
  }
}

export interface IUser {
  id: number;
  Name: string;
  is_active: boolean;
}
