

/*//`supabaseClient.js`

//```js


import { createClient } from 'https://esm.sh/@supabase/supabase-js'

export const supabase = createClient(
  'https://TU_URL.supabase.co',
  'TU_ANON_KEY'
);
*/
import { supabase } from './db/supabaseClient.js';

async function cargarProductos() {
  const { data } = await supabase.from('productos').select('*');
  console.log(data);
}


