import ClassDTO from '../dtos/ClassDTO';

export default function generateClassCode({
  class_level,
  class_day,
  class_hour,
}: Omit<
  ClassDTO,
  | 'class_teacher'
  | 'class_duration'
  | 'teacher_id'
  | 'start_date'
  | 'weeks_duration'
>): string {
  const class_id = `${class_level.toUpperCase()}${class_day
    .substring(0, 3)
    .toUpperCase()}${
    class_hour.toString().length === 1 ? `0${class_hour}` : class_hour
  }`;

  return class_id;
}
