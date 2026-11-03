import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

export const auditChange =
  (collection: string): CollectionAfterChangeHook =>
  async ({ doc, operation, req }) => {
    if (!req.user || req.context.skipAudit) return doc

    await req.payload.create({
      collection: 'audit-logs',
      overrideAccess: true,
      req,
      context: { skipAudit: true },
      data: {
        action: operation,
        collection,
        documentId: String(doc.id),
        actor: req.user.id,
      },
    })
    return doc
  }

export const auditDelete =
  (collection: string): CollectionAfterDeleteHook =>
  async ({ doc, req }) => {
    if (!req.user || req.context.skipAudit) return doc

    await req.payload.create({
      collection: 'audit-logs',
      overrideAccess: true,
      req,
      context: { skipAudit: true },
      data: {
        action: 'delete',
        collection,
        documentId: String(doc.id),
        actor: req.user.id,
      },
    })
    return doc
  }
