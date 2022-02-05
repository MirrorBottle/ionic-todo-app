import Resource from '@/api/resource';

class NoteResource extends Resource {
  constructor() {
    super('notes');
  }
}

export { NoteResource as default };
