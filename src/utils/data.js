import { v4 as uuid } from 'uuid';

export const schedules = [
  {
    id: 0,
    day: 'Senin',
    lectures: [
      {
        id: uuid(),
        time: '09.30-11.00',
        room: 'C304 (GEDUNG BARU DEKANAT TROPOCAL ENGENERING 3 LANTAI 3)',
        lecture: 'Alpro Lanjut'
      }
    ]
  },
  {
    id: 1,
    day: 'Selasa',
    lectures: [
      {
        id: uuid(),
        time: '07.30-09.00',
        room: 'C303 (GEDUNG BARU DEKANAT TROPOCAL ENGENERING 2 LANTAI 3)',
        lecture: 'Sistem Digital'
      },
      {
        id: uuid(),
        time: '11.30-13.00',
        room: 'C307 (GEDUNG BARU DEKANAT TROPOCAL ENGENERING 5 LANTAI 3)',
        lecture: 'Matematika Diskrit'
      },
    ]
  },
  {
    id: 2,
    day: 'Rabu',
    lectures: [
      {
        id: uuid(),
        time: '07.30-09.00',
        room: 'C302 (GEDUNG BARU DEKANAT TROPOCAL ENGENERING 1 LANTAI 3)',
        lecture: 'PKN'
      },
      {
        id: uuid(),
        time: '13.30-15.00',
        room: '3A3 (LANTAI 2 RUANG KELAS BELAJAR GEDUNG 3 LAMA)',
        lecture: 'Jaringan Komputer'
      },
      {
        id: uuid(),
        time: '15.30-17.00',
        room: 'C304 (GEDUNG BARU DEKANAT TROPOCAL ENGENERING 3 LANTAI 3)',
        lecture: 'Sistem Operasi'
      },
    ]
  },
  {
    id: 3,
    day: 'Kamis',
    lectures: [
      {
        time: '07.30-09.00',
        room: '2A2 (LANTAI 2 RUANG KELAS BELAJAR GEDUNG 2 LAMA)',
        lecture: 'Metode numerik'
      }
    ]
  },
  {
    id: 4,
    day: 'Jumat',
    lectures: [
      {
        time: '07.30-09.00',
        room: '3B2 (LANTAI 1 RUANG KELAS BELAJAR GEDUNG 3 LAMA)',
        lecture: 'B. Indo'
      }
    ]
  },
]