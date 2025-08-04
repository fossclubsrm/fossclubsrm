import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL || undefined;
const supabaseKey = process.env.SUPABASE_KEY || undefined;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase URL or key");
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export const supabaseAdmin = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

/**
 * EXAMPLE:
 * 
 * <script setup>
import { createClient } from '@supabase/supabase-js'
const config = useRuntimeConfig()
const supabase = createClient(config.public.supabaseUrl, config.public.supabaseAnonKey)
const instruments = ref([])

async function getInstruments() {
  const { data } = await supabase.from('instruments').select()
  instruments.value = data
}

onMounted(() => {
  getInstruments()
})
</script>

<template>
  <ul>
    <li v-for="instrument in instruments" :key="instrument.id">{{ instrument.name }}</li>
  </ul>
</template>
 */
