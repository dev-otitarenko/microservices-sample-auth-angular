import {SelectItem} from "primeng/api";

export interface LoaderState {
  show: boolean;
}

export class ApiError {
  status: string;
  message: string;
  errors: string[];
}

export class UIUtils {
  static getFilterStr(filters: any) {
    /*
        EQ(":"), NE("<>"), GT(">"), LT("<"), GTE(">:"), LTE("<:"), EMPTY("!:"), CONTAINS("~:"), STARTS("^:"), ENDS("$:");
     */
    let ret: string = "";

    for (let nm in filters) {
      const value = filters[nm].value;
      const matchMode = filters[nm].matchMode;
      let oper: string = "?";

      if (matchMode === "eq" || matchMode === "equals") {
        oper = ":";
      } else if (matchMode === "ne") {
        oper = "<>";
      } else if (matchMode === "gt") {
        oper = ">";
      } else if (matchMode === "ge") {
        oper = ">:";
      } else if (matchMode === "lt") {
        oper = "<";
      } else if (matchMode === "le") {
        oper = "<:";
      } else if (matchMode === "empty") {
        oper = "!:";
      } else if (matchMode === "contains") {
        oper = "~:";
      } else if (matchMode === "startsWith") {
        oper = "^:";
      } else if (matchMode === "endsWith") {
        oper = "$:";
      }
      if (oper !== "?")
        ret += (ret.length > 0 ? ',' : '') + `${nm}${oper}${value}`;
    }
    return this.URLEencode(ret);
  }

  static URLEencode(str): string {
    str = (str + '').toString();
    // Tilde should be allowed unescaped in future versions of PHP (as reflected below), but if you want to reflect current
    // HTML behavior, you would need to add ".replace(/~/g, '%7E');" to the following.
    return encodeURIComponent(str)
      ;
  }

  static sortSelectItems(items: SelectItem[], field?: string): SelectItem[] {
    if (typeof(field) === 'undefined') field = "label";
    // Sort array
    items = items.sort((n1,n2) => {
      // @ts-ignore
      if (n1[field] > n2[field]) { return 1; }
      // @ts-ignore
      if (n1[field] < n2[field]) { return -1; }

      return 0;
    });
    return items;
  }
}
