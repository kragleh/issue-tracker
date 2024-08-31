import { z } from "zod";

export function validateProjectTitle(title: string) {
  const schema = z.string().min(1).max(32).regex(/^[a-zA-Z0-9\s]+$/, 'Only letters, numbers, spaces and hyphens are allowed')
  return schema.safeParse(title)
}

export function validateProjectDescription(title: string) {
  const schema = z.string().min(32).max(2048)
  return schema.safeParse(title)
}
