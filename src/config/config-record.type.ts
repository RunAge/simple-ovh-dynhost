type ConfigRecordType = boolean | number | string;
export type ConfigRecord = Record<string, ConfigRecordType | Record<string, ConfigRecordType>>;
