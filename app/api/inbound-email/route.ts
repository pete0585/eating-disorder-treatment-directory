import { createServiceClient } from '@/lib/supabase/server'
import { createInboundHandler } from '@/lib/directory-inbound'

export const POST = createInboundHandler({
  "tenant": "directories--eating-disorder-treatment",
  "directory": "eating-disorder-treatment",
  "domains": [
    "eatingdisordertreatmentfinder.com",
    "mail.eatingdisordertreatmentfinder.com"
  ]
}, { db: async () => createServiceClient() })
