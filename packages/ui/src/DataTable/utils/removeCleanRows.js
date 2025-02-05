import { isEntityClean } from "./isEntityClean";
import { getIdOrCodeOrIndex } from "./getIdOrCodeOrIndex";

export const removeCleanRows = (reduxFormEntities, reduxFormCellValidation) => {
  const toFilterOut = {};
  const entsToUse = (reduxFormEntities || []).filter(e => {
    if (!(e._isClean || isEntityClean(e))) return true;
    else {
      toFilterOut[getIdOrCodeOrIndex(e)] = true;
      return false;
    }
  });

  const validationToUse = {};
  Object.entries(reduxFormCellValidation || {}).forEach(([k, v]) => {
    const [rowId] = k.split(":");
    if (!toFilterOut[rowId]) {
      validationToUse[k] = v;
    }
  });
  return { entsToUse, validationToUse };
};
