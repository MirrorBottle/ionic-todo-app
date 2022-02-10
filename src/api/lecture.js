import Resource from '@/api/resource';

class LectureResource extends Resource {
  constructor() {
    super('lectures');
  }
}

export { LectureResource as default };
