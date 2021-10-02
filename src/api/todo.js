import Resource from '@/api/resource';

class TodoResource extends Resource {
  constructor() {
    super('todos');
  }
}

export { TodoResource as default };
