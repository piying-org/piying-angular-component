import * as v from 'valibot';
import * as Group from './example';
console.log(Group.ButtonBase.content);

export const ButtonDefine = v.object(
  Object.entries(Group).reduce(
    (obj, item) => {
      obj[item[0]] = item[1].define;
      return obj;
    },
    {} as Record<string, v.BaseSchema<any, any, any>>,
  ),
);
