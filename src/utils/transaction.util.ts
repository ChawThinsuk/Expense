import { QueryParams } from "../dto/transaction.dto";

export const queryParamsCheckCondition = (queryParams:QueryParams,query:string,params:any[],user_id:number) => {
    if (user_id) {
        query += ` AND t.user_id = $${params.length + 1}`;
        params.push(user_id);
    }
    if (queryParams.month) {
        query += ` AND EXTRACT(MONTH FROM t.date) = $${params.length + 1}`;
        params.push(queryParams.month);
      }
      if (queryParams.year) {
        query += ` AND EXTRACT(YEAR FROM t.date) = $${params.length + 1}`;
        params.push(queryParams.year);
      }
      if (queryParams.category_name) {
        query += ` AND c.category_name = $${params.length + 1}`;
        params.push(queryParams.category_name);
      }
      if (queryParams.category_name) {
        query += ` AND a.account_name = $${params.length + 1}`;
        params.push(queryParams.category_name);
      }
      if (queryParams.transaction_type) {
        query += ` AND t.transaction_type = $${params.length + 1}`;
        params.push(queryParams.transaction_type);
      }
      return query
}