import { createDb } from '@okdoenjang/database';

export { type Reservation, type BlogPost } from '@okdoenjang/database';
export const supabase = createDb();
