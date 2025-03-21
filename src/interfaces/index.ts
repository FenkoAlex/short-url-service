import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { urlsSchema } from 'src/db/schema/urls';

export type ShortUrlDTO = InferInsertModel<typeof urlsSchema>;
export type ShortUrlRecord = InferSelectModel<typeof urlsSchema>;
