type Operator = 'eq' | 'regex' | 'gte' | 'lte' | 'in';

export interface FilterRule {
  path: string;
  operator?: Operator;
  required?: boolean;
}

export abstract class FilterBuilder<TInput> {
  protected abstract schema: Record<keyof TInput, FilterRule>;
  protected input: TInput;

  constructor(input: TInput) {
    this.input = input;
  }

  build(): Record<string, any> {
    const filters: Record<string, any> = {};

    for (const key in this.schema) {
      const rule = this.schema[key];
      const value = this.input[key as keyof TInput];

      if (!rule) continue;

      const { path, operator = 'eq', required } = rule;

      if (value == null) {
        if (required) throw new Error(`Missing required filter: ${key}`);
        continue;
      }

      switch (operator) {
        case 'eq':
          filters[path] = value;
          break;
        case 'regex':
          filters[path] = { $regex: value, $options: 'i' };
          break;
        case 'gte':
          filters[path] = { ...(filters[path] || {}), $gte: value };
          break;
        case 'lte':
          filters[path] = { ...(filters[path] || {}), $lte: value };
          break;
        case 'in':
          filters[path] = { $in: value };
          break;
        default:
          throw new Error(`Unknown operator: ${operator}`);
      }
    }

    return filters;
  }
}
