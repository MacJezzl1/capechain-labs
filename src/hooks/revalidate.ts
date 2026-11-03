import { revalidateTag } from 'next/cache'
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from 'payload'

export const revalidateCollection =
  (tag: string): CollectionAfterChangeHook =>
  ({ doc }) => {
    revalidateTag(tag, 'max')
    return doc
  }

export const revalidateCollectionDelete =
  (tag: string): CollectionAfterDeleteHook =>
  ({ doc }) => {
    revalidateTag(tag, 'max')
    return doc
  }

export const revalidateGlobal =
  (tag: string): GlobalAfterChangeHook =>
  ({ doc }) => {
    revalidateTag(tag, 'max')
    return doc
  }
