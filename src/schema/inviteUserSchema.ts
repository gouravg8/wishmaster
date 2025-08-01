import { z } from "zod";

const schema = z.object({
    name: z.string(),
    phone: z.string().regex(/^\d{10}$/, "Mobile number must be exactly 10 digits"),
    aadhaar_number: z.string().regex(/^\d{12}$/, "Aadhaar number must be exactly 12 digits"),
    pan_number: z.string().regex(/^[a-zA-Z]{5}[0-9]{4}[a-zA-Z]$/, "PAN number must follow the format: 5 letters, 4 digits, 1 letter"),
    model: z.enum(["trueflex", "kirana"])
})

export default schema;