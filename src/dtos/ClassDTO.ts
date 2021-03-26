export default interface ClassDTO {
  teacher_id: string;
  class_day: 'sunday | monday | tuesday | wednesday | thursday | friday | saturday';
  class_duration?: number;
  weeks_duration: number;
  start_date: string;
  class_id?: string;
  class_level: 'A1 | A2 | B1 | B2 | C1';
  class_hour:
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 17
    | 18
    | 19
    | 20
    | 21
    | 22
    | 23;
}
